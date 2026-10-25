
export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not supported.");
  }

  if (!window.isSecureContext) {
    throw new Error("FineTask must run in a secure context.");
  }

  return navigator.serviceWorker.register("/sw.js");
}
