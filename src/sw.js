class ServiceWorker {
  constructor() {
    this.instantiateServiceWorker();
  }

  /** @description instantiates service worker */
  instantiateServiceWorker() {
    this.ressourcesToCache = [
      "./index.html",
      "./css/print.css",
      "./css/style.css",
      "./font/Source_Han_Sans_VF.ttf",
      "./font/Work_Sans_VF.ttf",
      "./icons/icon-144x144.png",
      "./js/script.js",
      "./json/french.json",
      "./json/translations.json",
      "./svg/close.svg",
      "./svg/format_align_center.svg",
      "./svg/format_align_justify.svg",
      "./svg/format_align_left.svg",
      "./svg/format_align_right.svg",
      "./svg/settings.svg",
    ];
    this.handleStateInstall();
    this.handleStateFetch();
  }

  /** @description Handles the installation phase of the service worker */
  handleStateInstall() {
    self.addEventListener("install", (e) => {
      e.waitUntil(
        caches.open("assets").then((cache) => {
          console.log(cache);
          return cache.addAll(this.ressourcesToCache);
        })
      );
    });
  }

  /** @description Handles the fetching phase of the service worker */
  handleStateFetch() {
    self.addEventListener("fetch", (e) => {
      e.respondWith(
        caches.match(e.request).then(req => {
          if(req) return req; 
          return fetch(e.request); 
        })
      )
    });
  }
}

new ServiceWorker();
