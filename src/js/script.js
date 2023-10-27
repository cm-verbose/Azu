var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Editor from "./modules/editor.js";
class Main {
    constructor() {
        this.ini();
    }
    /** @description Initializes the App */
    ini() {
        this.instantiateServiceWorker();
        new Editor();
    }
    /** @description instantiates a Service worker */
    instantiateServiceWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!("serviceWorker" in navigator)) {
                console.error("[Service worker] : Unavailable");
                return;
            }
            yield navigator.serviceWorker.register("./sw.js", {
                scope: "./src/",
            });
        });
    }
}
new Main();
