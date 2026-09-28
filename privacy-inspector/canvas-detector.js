(() => {
  const wrappedMethods = new WeakSet();

  function report(api) {
    window.postMessage(
      {
        source: "privacy-inspector-canvas",
        type: "CANVAS_API_CALL",
        api
      },
      "*"
    );
  }

  function wrapMethod(prototype, methodName, apiName) {
    if (!prototype) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);
    const original = descriptor?.value;

    if (typeof original !== "function" || wrappedMethods.has(original)) {
      return;
    }

    function monitoredCanvasMethod(...args) {
      report(apiName);
      return Reflect.apply(original, this, args);
    }

    wrappedMethods.add(monitoredCanvasMethod);

    Object.defineProperty(prototype, methodName, {
      ...descriptor,
      value: monitoredCanvasMethod
    });
  }

  wrapMethod(
    globalThis.HTMLCanvasElement?.prototype,
    "toDataURL",
    "HTMLCanvasElement.toDataURL"
  );
  wrapMethod(
    globalThis.HTMLCanvasElement?.prototype,
    "toBlob",
    "HTMLCanvasElement.toBlob"
  );
  wrapMethod(
    globalThis.CanvasRenderingContext2D?.prototype,
    "getImageData",
    "CanvasRenderingContext2D.getImageData"
  );
  wrapMethod(
    globalThis.OffscreenCanvas?.prototype,
    "convertToBlob",
    "OffscreenCanvas.convertToBlob"
  );
  wrapMethod(
    globalThis.OffscreenCanvas?.prototype,
    "transferToImageBitmap",
    "OffscreenCanvas.transferToImageBitmap"
  );
})();
