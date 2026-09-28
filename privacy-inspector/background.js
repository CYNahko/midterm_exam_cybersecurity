const tabs = new Map();

function getStorageKey(tabId) {
  return `tab-${tabId}`;
}

function getDomain(url) {
  try {
    const hostname = new URL(url).hostname;

    return (
      browser.publicSuffix.getDomain(hostname, {
        allowIPAddress: true,
        allowUnknownSuffix: true
      }) ?? hostname
    );
  } catch {
    return null;
  }
}

async function getTabData(tabId) {
  if (tabs.has(tabId)) {
    return tabs.get(tabId);
  }

  const key = getStorageKey(tabId);
  const stored = await browser.storage.session.get(key);
  const tabData = stored[key];

  if (tabData) {
    tabs.set(tabId, tabData);
  }

  return tabData;
}

async function saveTabData(tabId, tabData) {
  tabs.set(tabId, tabData);

  await browser.storage.session.set({
    [getStorageKey(tabId)]: tabData
  });
}

function createTabData(pageDomain) {
  return {
    pageDomain,
    startedAt: Date.now(),
    thirdPartyDomains: [],
    cookieStats: {
      total: 0,
      firstParty: 0,
      thirdParty: 0,
      session: 0,
      persistent: 0
    },
    canvasFingerprint: {
      detected: false,
      totalCalls: 0,
      methods: {}
    },
    hijackIndicators: [],
    pollingCounts: {}
  };
}

// Indicadores de hijacking/hook. Cada combinação tipo + detalhe é registrada
// uma única vez por página.
function addHijackIndicator(tabData, type, detail) {
  if (!tabData.hijackIndicators) {
    tabData.hijackIndicators = [];
  }

  const exists = tabData.hijackIndicators.some(
    (indicator) => indicator.type === type && indicator.detail === detail
  );

  if (exists) {
    return false;
  }

  tabData.hijackIndicators.push({ type, detail });
  return true;
}

// Requisições XHR/fetch repetidas ao mesmo terceiro depois do carregamento
// inicial indicam polling persistente (canal de comando e controle, como no BeEF).
const POLLING_GRACE_PERIOD_MS = 10000;
const POLLING_THRESHOLD = 5;

function checkPolling(tabData, request, requestDomain) {
  if (request.type !== "xmlhttprequest") {
    return false;
  }

  const elapsed = Date.now() - (tabData.startedAt ?? Date.now());

  if (elapsed < POLLING_GRACE_PERIOD_MS) {
    return false;
  }

  if (!tabData.pollingCounts) {
    tabData.pollingCounts = {};
  }

  const count = (tabData.pollingCounts[requestDomain] ?? 0) + 1;
  tabData.pollingCounts[requestDomain] = count;

  if (count === POLLING_THRESHOLD) {
    addHijackIndicator(
      tabData,
      "Polling persistente para terceiro",
      `${requestDomain} (${count}+ requisições após ${POLLING_GRACE_PERIOD_MS / 1000}s)`
    );
  }

  return true;
}

async function handleRequest(request, blocked = false) {
  if (request.tabId < 0) {
    return;
  }

  const requestDomain = getDomain(request.url);

  if (!requestDomain) {
    return;
  }

  if (request.type === "main_frame") {
    const previousData = await getTabData(request.tabId);
    const tabData = createTabData(requestDomain);

    // Guardado para detectar redirecionamentos automáticos (webNavigation).
    tabData.previousPageDomain = previousData?.pageDomain ?? null;

    await saveTabData(request.tabId, tabData);
    return;
  }

  const tabData = await getTabData(request.tabId);

  if (!tabData) {
    return;
  }

  let changed = false;

  const isThirdParty = requestDomain !== tabData.pageDomain;
  const isNewDomain = !tabData.thirdPartyDomains.includes(requestDomain);

  if (isThirdParty && isNewDomain) {
    tabData.thirdPartyDomains.push(requestDomain);
    tabData.thirdPartyDomains.sort();
    changed = true;
  }

  if (isThirdParty && request.type === "websocket") {
    addHijackIndicator(tabData, "WebSocket para terceiro", requestDomain);
    changed = true;
  }

  if (isThirdParty && checkPolling(tabData, request, requestDomain)) {
    changed = true;
  }

  if (blocked) {
    if (!tabData.blockedRequests) {
      tabData.blockedRequests = {};
    }

    tabData.blockedRequests[requestDomain] =
      (tabData.blockedRequests[requestDomain] ?? 0) + 1;
    changed = true;
  }

  if (changed) {
    await saveTabData(request.tabId, tabData);
  }
}

// Lista de bloqueio personalizada, mantida em storage.local e editada pelo popup.
let blocklist = [];

async function loadBlocklist() {
  const stored = await browser.storage.local.get("blocklist");
  blocklist = Array.isArray(stored.blocklist) ? stored.blocklist : [];
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.blocklist) {
    blocklist = changes.blocklist.newValue ?? [];
  }
});

loadBlocklist();

// Um domínio da lista bloqueia também todos os seus subdomínios.
function isBlocked(url) {
  let hostname;

  try {
    hostname = new URL(url).hostname;
  } catch {
    return false;
  }

  return blocklist.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

browser.webRequest.onBeforeRequest.addListener(
  (request) => {
    // O documento principal nunca é bloqueado, para não impedir a navegação.
    const blocked = request.type !== "main_frame" && isBlocked(request.url);

    handleRequest(request, blocked);

    return { cancel: blocked };
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
);

browser.tabs.onRemoved.addListener((tabId) => {
  tabs.delete(tabId);
  browser.storage.session.remove(getStorageKey(tabId));
});

browser.runtime.onMessage.addListener(async (message, sender) => {
  const tabId = sender.tab?.id;

  if (tabId === undefined) {
    return;
  }

  let tabData = await getTabData(tabId);

  if (!tabData) {
    tabData = createTabData(getDomain(sender.url));
  }

  if (message.type === "STORAGE_REPORT") {
    tabData.storage = message.storage;
  } else if (message.type === "CANVAS_API_CALL") {
    if (!tabData.canvasFingerprint) {
      tabData.canvasFingerprint = {
        detected: false,
        totalCalls: 0,
        methods: {}
      };
    }

    const api = message.api;

    if (typeof api !== "string" || api.length > 100) {
      return;
    }

    tabData.canvasFingerprint.detected = true;
    tabData.canvasFingerprint.totalCalls += 1;
    tabData.canvasFingerprint.methods[api] =
      (tabData.canvasFingerprint.methods[api] ?? 0) + 1;
  } else if (message.type === "HOOK_INDICATOR") {
    if (!handleHookIndicator(tabData, message)) {
      return;
    }
  } else {
    return;
  }

  await saveTabData(tabId, tabData);
});

async function handleResponseHeaders(details) {
  if (details.tabId < 0) {
    return;
  }

  const setCookieHeaders = (details.responseHeaders ?? []).filter(
    (header) => header.name.toLowerCase() === "set-cookie"
  );

  if (setCookieHeaders.length === 0) {
    return;
  }

  const tabData = await getTabData(details.tabId);

  if (!tabData) {
    return;
  }

  if (!tabData.cookieStats) {
    tabData.cookieStats = {
      total: 0,
      firstParty: 0,
      thirdParty: 0,
      session: 0,
      persistent: 0
    };
  }

  const responseDomain = getDomain(details.url);
  const isFirstParty = responseDomain === tabData.pageDomain;

  for (const header of setCookieHeaders) {
    const value = header.value ?? "";

    const isPersistent =
      /(?:^|;\s*)(expires|max-age)=/i.test(value);

    tabData.cookieStats.total += 1;

    if (isFirstParty) {
      tabData.cookieStats.firstParty += 1;
    } else {
      tabData.cookieStats.thirdParty += 1;
    }

    if (isPersistent) {
      tabData.cookieStats.persistent += 1;
    } else {
      tabData.cookieStats.session += 1;
    }
  }

  await saveTabData(details.tabId, tabData);
}

browser.webRequest.onHeadersReceived.addListener(
  (details) => {
    handleResponseHeaders(details);
  },
  {
    urls: ["<all_urls>"]
  },
  ["responseHeaders"]
);

// Mensagens do hook-detector.js (contexto da página, repassadas pelo content script).
function handleHookIndicator(tabData, message) {
  if (message.kind === "global-override") {
    const name = message.name;

    if (typeof name !== "string" || name.length > 100) {
      return false;
    }

    return addHijackIndicator(tabData, "Objeto global sobrescrito", name);
  }

  if (message.kind === "window-open") {
    const targetDomain = getDomain(message.url);

    // Abrir uma página do próprio site (ex.: about:blank ou mesmo domínio) não conta.
    if (!targetDomain || targetDomain === tabData.pageDomain) {
      return false;
    }

    return addHijackIndicator(
      tabData,
      "Nova aba/janela aberta pela página",
      targetDomain
    );
  }

  return false;
}

// Abas ou janelas criadas a partir de uma página (window.open, target=_blank,
// pop-unders). O plugin não distingue um clique legítimo de um abuso, apenas
// sinaliza quando o destino é outro domínio.
browser.webNavigation.onCreatedNavigationTarget.addListener(async (details) => {
  const tabData = await getTabData(details.sourceTabId);
  const targetDomain = getDomain(details.url);

  if (!tabData || !targetDomain || targetDomain === tabData.pageDomain) {
    return;
  }

  const added = addHijackIndicator(
    tabData,
    "Nova aba/janela aberta pela página",
    targetDomain
  );

  if (added) {
    await saveTabData(details.sourceTabId, tabData);
  }
});

// Redirecionamentos feitos pelo cliente (JavaScript ou meta refresh) para outro
// domínio. Redirecionamentos HTTP (3xx) não são contados, pois são comuns em
// casos legítimos como http -> https.
browser.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId !== 0) {
    return;
  }

  const qualifiers = details.transitionQualifiers ?? [];

  if (!qualifiers.includes("client_redirect")) {
    return;
  }

  const tabData = await getTabData(details.tabId);
  const newDomain = getDomain(details.url);

  if (
    !tabData ||
    !tabData.previousPageDomain ||
    tabData.previousPageDomain === newDomain
  ) {
    return;
  }

  const added = addHijackIndicator(
    tabData,
    "Redirecionamento automático",
    `${tabData.previousPageDomain} -> ${newDomain}`
  );

  if (added) {
    await saveTabData(details.tabId, tabData);
  }
});
