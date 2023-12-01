class ServiceWorker {
  constructor() {
    this.cacheName = "v1";
    this.cachedAsssets = [
      "./index.html",
      "./css/print.css",
      "./css/style.css",
      "./font/Source_Han_Sans_VF.ttf",
      "./font/Work_Sans_VF.ttf",
      "./icons/icon-144x144.png",
      "./js/script.js",
      "./js/modules/editor.js",
      "./js/modules/functions/editor_functions.js",
      "./js/modules/functions/text_correction.js",
      "./js/modules/functions/interface.js",
      "./js/modules/functions/storage.js",
      "./js/modules/functions/settings.js",
      "./js/modules/functions/statistics.js",
      "./json/french.json",
    ];
    this.initializeWorker();
  }

  /** @description Instantiates service worker events */
  initializeWorker() {
    this.handleInstall();
    this.handleActivate();
    this.handleFetch();
  }

  /** @description Handles service worker installation */
  handleInstall() {
    console.log("[Service Worker] Installing...");
    self.addEventListener("install", (e) => {
      e.waitUntil(
        (async () => {
          const cache = await caches.open(this.cacheName);
          console.log("[Service Worker] Caching all content");
          await cache.addAll(this.cachedAsssets);
        })()
      );

      self.skipWaiting();
    });
  }

  /** @description Activates client */
  handleActivate() {
    self.addEventListener("activate", (e) => {
      console.log("[Service Worker] reclaiming control");
      e.waitUntil(clients.claim());
    });
  }

  /** @description Handles service worker fetch event */
  handleFetch() {
    self.addEventListener("fetch", (e) => {
      console.log(e);
      if (!(e.request.url.startsWith("http:") || e.request.url.startsWith("https:"))) {
        return;
      }
      e.respondWith(
        (async () => {
          const r = await caches.match(e.request);
          console.log(`[Service Worker] Fetching resource: ${e.request.url}`);

          if (r) return r;
          const response = await fetch(e.request);
          const cache = await caches.open(this.cacheName);
          console.log("[Service Worker] Caching new ressource");
          cache.put(e.request, response.clone());
          return response;
        })()
      );
    });
  }
}

new ServiceWorker();
