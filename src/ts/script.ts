import Editor from "./modules/editor.js";

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
      console.error("[Service worker] : Unavailable");
      return;
    }
    await navigator.serviceWorker.register("./sw.js", {
      scope: "./src/",
    });
  }
}

new Main();
