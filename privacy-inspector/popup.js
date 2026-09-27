async function showReport() {
  const status = document.getElementById("status");
  const report = document.getElementById("report");
  const pageDomain = document.getElementById("page-domain");
  const domainCount = document.getElementById("domain-count");
  const domainList = document.getElementById("domain-list");
  const localStorageCount =
    document.getElementById("local-storage-count");

  const sessionStorageCount =
    document.getElementById("session-storage-count");

  const indexedDbCount =
    document.getElementById("indexed-db-count");

  const [activeTab] = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  if (!activeTab?.id) {
    status.textContent = "Não foi possível identificar a aba.";
    return;
  }

  const key = `tab-${activeTab.id}`;
  const stored = await browser.storage.session.get(key);
  const tabData = stored[key];

  if (!tabData) {
    status.textContent =
      "Nenhuma análise disponível. Atualize a página e tente novamente.";
    return;
  }

  pageDomain.textContent = tabData.pageDomain;
  domainCount.textContent = tabData.thirdPartyDomains.length;

  for (const domain of tabData.thirdPartyDomains) {
    const item = document.createElement("li");
    item.textContent = domain;
    domainList.appendChild(item);
  }
  const storage = tabData.storage;

  if (storage) {
    localStorageCount.textContent =
      storage.localStorage.available
        ? storage.localStorage.itemCount
        : "indisponível";

    sessionStorageCount.textContent =
      storage.sessionStorage.available
        ? storage.sessionStorage.itemCount
        : "indisponível";

    indexedDbCount.textContent =
      storage.indexedDB.available
        ? storage.indexedDB.databaseCount
        : "indisponível";
  }

  status.hidden = true;
  report.hidden = false;
}

showReport();