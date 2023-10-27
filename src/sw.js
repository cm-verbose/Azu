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
      "./js/modules/storage.js",
      "./json/french.json",
    ];
    this.initializeWorker();
  }

  /** @description Instantiates service worker events */
  initializeWorker() {
    this.handleInstall();
    this.handleFetch();
  }

  /** @description Handles service worker installation */
  handleInstall() {
    self.addEventListener("install", (e) => {
      const addResourcesToCache = async (resources) => {
        const cache = await caches.open(this.cacheName);
        await cache.addAll(resources);
      };
      e.waitUntil(
        addResourcesToCache(this.cachedAsssets)
      )
    });
  }

  /** @description Handles service worker fetch event */
  handleFetch() {
    self.addEventListener("fetch", (e) => {
      e.respondWith(caches.match(e.request));
    });
  }
}

new ServiceWorker();
