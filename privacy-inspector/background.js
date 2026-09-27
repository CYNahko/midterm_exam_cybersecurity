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

async function handleRequest(request) {
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
      thirdPartyDomains: []
    };

    await saveTabData(request.tabId, tabData);
    return;
  }

  const tabData = await getTabData(request.tabId);

  if (!tabData) {
    return;
  }

  const isThirdParty = requestDomain !== tabData.pageDomain;
  const isNewDomain = !tabData.thirdPartyDomains.includes(requestDomain);

  if (isThirdParty && isNewDomain) {
    tabData.thirdPartyDomains.push(requestDomain);
    tabData.thirdPartyDomains.sort();

    await saveTabData(request.tabId, tabData);
  }
}

browser.webRequest.onBeforeRequest.addListener(
  (request) => {
    handleRequest(request);
  },
  {
    urls: ["<all_urls>"]
  }
);

browser.tabs.onRemoved.addListener((tabId) => {
  tabs.delete(tabId);
  browser.storage.session.remove(getStorageKey(tabId));
});