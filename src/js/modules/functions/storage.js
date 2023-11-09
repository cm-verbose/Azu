/**
 *
 * @description Manages the storage, stores some values such as previous session zoom
 *
 **/
export default class Storage {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.zoomRangeInput = document.querySelector("#zoom-range");
        this.zoomInput = document.querySelector("#zoom-control-input");
        this.zoomAmount = 1;
        this.instantiateStorage();
    }
    /** @description Instatiates all storage methods */
    instantiateStorage() {
        this.instantiateLocalStorage();
    }
    /** @description Instantiates localStorage */
    instantiateLocalStorage() {
        window.addEventListener("beforeunload", () => {
            const currentSettings = {
                theme: document.body.getAttribute("class"),
            };
            localStorage.setItem("zoomLevel", this.zoomInput.value);
            localStorage.setItem("Settings", JSON.stringify(currentSettings));
        });
        window.addEventListener("load", () => {
            const zoomLevel = localStorage.getItem("zoomLevel");
            if (zoomLevel !== null) {
                this.zoomAmount = parseInt(zoomLevel, 10);
                this.zoomRangeInput.value = `${this.zoomAmount / 100}`;
                this.zoomInput.value = `${this.zoomAmount}`;
                this.editor.style.scale = `${this.zoomAmount / 100}`;
            }
            const fetchedSettings = localStorage.getItem("Settings");
            if (fetchedSettings === null)
                return;
            const settings = JSON.parse(fetchedSettings);
            for (const [key, value] of Object.entries(settings)) {
                switch (key) {
                    case "theme":
                        {
                            if (value === null)
                                return;
                            document.body.setAttribute("class", `${value}`);
                        }
                        break;
                }
            }
        });
    }
}
