/**
 *
 * @description Instantiates User Interface events and functionality
 *
 */
export default class UserInterface {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.mainView = document.querySelector("#app");
        this.settingsButton = document.querySelector("#setting-button");
        this.settingsCloseButton = document.querySelector("#close-settings");
        this.settingsView = document.querySelector("#settings-view");
        this.titleInput = document.querySelector("#title-input");
        this.zoomRangeInput = document.querySelector("#zoom-range");
        this.zoomInput = document.querySelector("#zoom-control-input");
        /*
          localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated
          within the Storage class.
        */
        this.zoomCurr = parseInt(localStorage.getItem("zoomLevel"), 10) / 100;
        this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
        this.instantiateUIEvents();
    }
    /** @description instanciates a group of unrelated UIEvents */
    instantiateUIEvents() {
        document.title = "Azu - Document 1";
        this.titleInput.addEventListener("input", () => this.handleTitleInput());
        this.titleInput.addEventListener("blur", () => this.handleTitleBlur());
        this.instantiateSettingsUI();
        this.instantiateZoom();
    }
    /**
     *
     * @description Handles window zoom through document scaling
     *
     **/
    /** @description instantiates the zoom function */
    instantiateZoom() {
        document.addEventListener("wheel", (e) => this.handleWheelZoom(e), { passive: false });
        document.addEventListener("keydown", (e) => this.handleKeyZoom(e));
        this.zoomRangeInput.addEventListener("input", (e) => this.handleRangeZoom(e));
        this.zoomInput.addEventListener("blur", () => this.handleInputZoom());
        this.zoomInput.addEventListener("click", () => this.handleInputFocus(this.zoomInput));
        this.zoomInput.addEventListener("keydown", (e) => this.enforeDigitOnly(e));
    }
    /** @description Zooms only the inner document portion onwheel */
    handleWheelZoom(e) {
        if (!e.ctrlKey)
            return;
        e.preventDefault();
        /* Different browsers usually have a different increment on zoom */
        const addedZoom = (e.deltaY * -1 < 0 ? -1 : 1) * 0.25;
        if (this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM ||
            this.zoomCurr + addedZoom < parseFloat(this.zoomRangeInput.min))
            return;
        this.zoomCurr += addedZoom;
        this.editor.style.scale = `${this.zoomCurr}`;
        this.zoomRangeInput.value = `${this.zoomCurr}`;
        this.zoomInput.value = `${Math.floor(parseFloat((this.zoomCurr * 100).toFixed(2)))}`;
    }
    /** @description Zooms only the inner document portion on `CTRL` + `+`, `CTRL` + `-` */
    handleKeyZoom(e) {
        if (!e.ctrlKey)
            return;
        const isZoomingIn = e.key === "+" || e.key === "=";
        const isZoomingOut = e.key === "-" || e.key === "_";
        if (isZoomingIn || isZoomingOut) {
            e.preventDefault();
            const addedZoom = isZoomingIn ? 0.25 : -0.25;
            if (this.zoomCurr + addedZoom <= 0 || this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM)
                return;
            this.zoomCurr += addedZoom;
            this.editor.style.scale = `${this.zoomCurr}`;
            this.zoomRangeInput.value = `${this.zoomCurr}`;
            this.zoomInput.value = `${this.zoomCurr * 100}`;
        }
    }
    /** @description Handles the zoom with a slider (range input) */
    handleRangeZoom(e) {
        const target = e.target;
        const zoomValue = parseFloat(target.value);
        this.zoomInput.value = `${zoomValue * 100}`;
        this.editor.style.scale = `${zoomValue}`;
    }
    /** @description Handles the zoom through input */
    handleInputZoom() {
        let previousZoom = this.zoomCurr;
        const zoomAmount = parseInt(this.zoomInput.value, 10) / 100;
        const minZoom = parseFloat(this.zoomRangeInput.min);
        this.zoomCurr = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;
        if (this.zoomCurr < minZoom) {
            if (previousZoom < minZoom)
                previousZoom = 1;
            this.zoomInput.value = `${previousZoom * 100}`;
            this.editor.style.scale = `${previousZoom}`;
            return;
        }
        this.zoomInput.value = `${this.zoomCurr * 100}`;
        this.editor.style.scale = `${this.zoomCurr}`;
    }
    /** @description Selects entire input content onfocus */
    handleInputFocus(inputElement) {
        inputElement.focus();
        inputElement.select();
    }
    /** @description Enforces digit only input */
    enforeDigitOnly(e) {
        if (!/Backspace|\d/g.test(e.key))
            e.preventDefault();
    }
    /**
     *
     * @description Handles document title change
     *
     */
    /** @description If the title value is invalid, set the document title to "Unnamed" */
    handleTitleBlur() {
        const content = this.titleInput.value;
        if (content.replace(/\s*/g, "") !== "")
            return;
        this.titleInput.value = "Unnamed";
    }
    /** @description On title change, set document.title */
    handleTitleInput() {
        const title = this.titleInput.value;
        if (title.replace(/\s*/g, "") === "") {
            document.title = "Azu - Unnamed";
        }
        else {
            const MAX_TITLE_LENGTH = 50;
            const ellidedString = title.length >= MAX_TITLE_LENGTH ? `${title.substring(0, MAX_TITLE_LENGTH - 3)}...` : title;
            document.title = `Azu - ${ellidedString}`;
        }
    }
    /**
     *
     * @description Handles events related to setting configuration
     *
     */
    instantiateSettingsUI() {
        this.settingsButton.addEventListener("click", () => this.openSettings());
        this.settingsCloseButton.addEventListener("click", () => this.closeSettings());
    }
    /** @description Opens the settings view, while closing the main view */
    openSettings() {
        this.mainView.style.display = "none";
        this.settingsView.style.display = "block";
        document.body.style.overflowY = "scroll";
    }
    /** @description Opens the main view, while closing the settings view */
    closeSettings() {
        this.settingsView.style.display = "none";
        this.mainView.style.display = "block";
        document.body.style.overflowY = "hidden";
    }
}
