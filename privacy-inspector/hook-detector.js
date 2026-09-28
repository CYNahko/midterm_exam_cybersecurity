// Executado no contexto da página (world: MAIN) em document_start, antes dos
// scripts do site. Guarda referências às funções nativas mais usadas por
// scripts de hook (ex.: BeEF) e verifica depois se alguma foi substituída.
(() => {
  function report(data) {
    window.postMessage(
      {
        source: "privacy-inspector-hook",
        type: "HOOK_INDICATOR",
        ...data
      },
      "*"
    );
  }

  // window.open é envolvido pelo próprio plugin para registrar abas abertas
  // pela página (pop-ups e pop-unders).
  const nativeOpen = window.open;

  function monitoredOpen(...args) {
    try {
      const url = new URL(String(args[0] ?? ""), location.href).href;
      report({ kind: "window-open", url });
    } catch {
      // URL inválida: a chamada segue normalmente sem registro.
    }

    return Reflect.apply(nativeOpen, this, args);
  }

  window.open = monitoredOpen;

  const XHRProto = globalThis.XMLHttpRequest?.prototype;
  const DocumentProto = globalThis.Document?.prototype;
  const EventTargetProto = globalThis.EventTarget?.prototype;

  // Cada entrada: nome exibido, como ler o valor atual e o valor esperado.
  const watched = [
    ["window.fetch", () => window.fetch],
    ["XMLHttpRequest.prototype.open", () => XHRProto?.open],
    ["XMLHttpRequest.prototype.send", () => XHRProto?.send],
    ["window.WebSocket", () => window.WebSocket],
    ["navigator.sendBeacon", () => Navigator.prototype.sendBeacon],
    ["document.write", () => DocumentProto?.write],
    ["EventTarget.prototype.addEventListener", () => EventTargetProto?.addEventListener],
    ["window.open", () => window.open]
  ].map(([name, read]) => ({ name, read, expected: read() }));

  const alreadyReported = new Set();

  function checkGlobals() {
    for (const entry of watched) {
      if (alreadyReported.has(entry.name)) {
        continue;
      }

      let current;

      try {
        current = entry.read();
      } catch {
        continue;
      }

      if (current !== entry.expected) {
        alreadyReported.add(entry.name);
        report({ kind: "global-override", name: entry.name });
      }
    }
  }

  // Verifica algumas vezes após o carregamento, pois scripts de hook
  // costumam ser injetados de forma tardia.
  window.addEventListener("load", () => {
    for (const delay of [1000, 5000, 15000, 30000]) {
      setTimeout(checkGlobals, delay);
    }
  });
})();
