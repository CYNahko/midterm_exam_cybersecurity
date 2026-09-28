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

async function handleRequest(request, blocked = false) {
  if (request.tabId < 0) {
    return;
  }

  const requestDomain = getDomain(request.url);

  if (!requestDomain) {
    return;
  }

  if (request.type === "main_frame") {
    const tabData = {
      pageDomain: requestDomain,
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
      }
    };

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
    tabData = {
      pageDomain: getDomain(sender.url),
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
      }
    };
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
