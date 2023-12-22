import Editor from "./modules/editor";

class Main {
  constructor() {
    this.ini();
  }

  /** @description Initializes the App */
  private ini() {
    this.instantiateServiceWorker();
    new Editor();
  }

  /** @description instantiates a Service worker */
  private async instantiateServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      console.error("[Service worker] : Service worker not available, please upgrade your browser.");
      return;
    }
    await navigator.serviceWorker.register("./sw.js", {
      scope: "./src/",
    });
  }
}

new Main();
