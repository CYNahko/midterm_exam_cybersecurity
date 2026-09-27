async function detectStorage() {
  const report = {
    localStorage: {
      available: false,
      itemCount: 0
    },
    sessionStorage: {
      available: false,
      itemCount: 0
    },
    indexedDB: {
      available: false,
      databaseCount: 0,
      databases: []
    }
  };

  try {
    report.localStorage.available = true;
    report.localStorage.itemCount = localStorage.length;
  } catch (error) {
    console.warn("Não foi possível acessar localStorage:", error);
  }

  try {
    report.sessionStorage.available = true;
    report.sessionStorage.itemCount = sessionStorage.length;
  } catch (error) {
    console.warn("Não foi possível acessar sessionStorage:", error);
  }

  try {
    if (typeof indexedDB.databases === "function") {
      const databases = await indexedDB.databases();

      report.indexedDB.available = true;
      report.indexedDB.databaseCount = databases.length;
      report.indexedDB.databases = databases.map((database) => ({
        name: database.name ?? "Sem nome",
        version: database.version ?? null
      }));
    }
  } catch (error) {
    console.warn("Não foi possível consultar IndexedDB:", error);
  }

  browser.runtime.sendMessage({
    type: "STORAGE_REPORT",
    storage: report
  });
}

setTimeout(detectStorage, 1000);