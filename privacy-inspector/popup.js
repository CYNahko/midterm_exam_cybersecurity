async function showReport() {
  const status = document.getElementById("status");
  const report = document.getElementById("report");
  const pageDomain = document.getElementById("page-domain");
  const domainCount = document.getElementById("domain-count");
  const domainList = document.getElementById("domain-list");
  const localStorageCount = document.getElementById("local-storage-count");
  const sessionStorageCount = document.getElementById("session-storage-count");
  const indexedDbCount = document.getElementById("indexed-db-count");
  const canvasDetected = document.getElementById("canvas-detected");
  const canvasTotal = document.getElementById("canvas-total");
  const canvasMethodList = document.getElementById("canvas-method-list");
  const cookieTotal = document.getElementById("cookie-total");
  const cookieFirstParty = document.getElementById("cookie-first-party");
  const cookieThirdParty = document.getElementById("cookie-third-party");
  const cookieSession = document.getElementById("cookie-session");
  const cookiePersistent = document.getElementById("cookie-persistent");

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

  const canvasFingerprint = tabData.canvasFingerprint;

  if (canvasFingerprint) {
    canvasDetected.textContent = canvasFingerprint.detected ? "sim" : "não";
    canvasTotal.textContent = canvasFingerprint.totalCalls;

    for (const [method, count] of Object.entries(
      canvasFingerprint.methods ?? {}
    ).sort(([first], [second]) => first.localeCompare(second))) {
      const item = document.createElement("li");
      item.textContent = `${method}: ${count}`;
      canvasMethodList.appendChild(item);
    }
  }

  const cookieStats = tabData.cookieStats;

  if (cookieStats) {
    cookieTotal.textContent = cookieStats.total;
    cookieFirstParty.textContent = cookieStats.firstParty;
    cookieThirdParty.textContent = cookieStats.thirdParty;
    cookieSession.textContent = cookieStats.session;
    cookiePersistent.textContent = cookieStats.persistent;
  }

  renderScore(tabData);

  status.hidden = true;
  report.hidden = false;
}

function renderScore(tabData) {
  const result = calculatePrivacyScore(tabData);
  const breakdownBody = document.getElementById("score-breakdown");

  document.getElementById("score-value").textContent = result.score;
  document.getElementById("score-grade").textContent = result.grade;

  for (const item of result.breakdown) {
    const row = document.createElement("tr");

    const label = document.createElement("td");
    label.textContent = `${item.label} (peso ${item.weight})`;

    const value = document.createElement("td");
    value.textContent = `${item.value} / ${item.limit}`;

    const penalty = document.createElement("td");
    penalty.textContent = `-${item.penalty}`;

    row.append(label, value, penalty);
    breakdownBody.appendChild(row);
  }
}

showReport();
