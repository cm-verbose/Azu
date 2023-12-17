/**
 *
 * @description Instantiates User Interface events and functionality
 *
 */

export default class UserInterface {
  editor: HTMLDivElement;
  mainView: HTMLDivElement;
  settingsButton: HTMLButtonElement;
  settingsCloseButton: HTMLButtonElement;
  settingsView: HTMLDivElement;
  titleInput: HTMLInputElement;
  zoomRangeInput: HTMLInputElement;
  zoomInput: HTMLInputElement;
  zoomCurr: number;
  readonly MAX_ALLOWED_ZOOM: number;
  readonly MAX_TITLE_LENGTH: number;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.mainView = document.querySelector("#app") as HTMLDivElement;
    this.settingsButton = document.querySelector("#setting-button") as HTMLButtonElement;
    this.settingsCloseButton = document.querySelector("#close-settings") as HTMLButtonElement;
    this.settingsView = document.querySelector("#settings-view") as HTMLDivElement;
    this.titleInput = document.querySelector("#title-input") as HTMLInputElement;
    this.zoomRangeInput = document.querySelector("#zoom-range") as HTMLInputElement;
    this.zoomInput = document.querySelector("#zoom-control-input") as HTMLInputElement;
    /* 
      localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated 
      within the Storage class.
    */
    this.zoomCurr = parseInt(localStorage.getItem("zoomLevel") as string, 10) / 100;
    this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
    this.MAX_TITLE_LENGTH = 50;
    this.instantiateUIEvents();
  }

  /** @description instanciates a group of unrelated UIEvents */
  private instantiateUIEvents() {
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
  private instantiateZoom() {
    document.addEventListener("wheel", (e: WheelEvent) => this.handleWheelZoom(e), { passive: false });
    document.addEventListener("keydown", (e: KeyboardEvent) => this.handleKeyZoom(e));
    this.zoomRangeInput.addEventListener("input", (e: Event) => this.handleRangeZoom(e));
    this.zoomInput.addEventListener("blur", () => this.handleInputZoom());
    this.zoomInput.addEventListener("click", () => this.handleInputFocus(this.zoomInput));
    this.zoomInput.addEventListener("keydown", (e: KeyboardEvent) => this.enforeDigitOnly(e));
  }

  /** @description Zooms only the inner document portion onwheel */
  private handleWheelZoom(e: WheelEvent) {
    if (!e.ctrlKey) return;
    e.preventDefault();

    /* Different browsers usually have a different increment on zoom */
    const addedZoom: number = (e.deltaY * -1 < 0 ? -1 : 1) * 0.25;
    if (
      this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM ||
      this.zoomCurr + addedZoom < parseFloat(this.zoomRangeInput.min)
    )
      return;

    this.zoomCurr += addedZoom;
    this.editor.style.scale = `${this.zoomCurr}`;
    this.zoomRangeInput.value = `${this.zoomCurr}`;
    this.zoomInput.value = `${Math.floor(parseFloat((this.zoomCurr * 100).toFixed(2)))}`;
  }

  /** @description Zooms only the inner document portion on `CTRL` + `+`, `CTRL` + `-` */
  private handleKeyZoom(e: KeyboardEvent) {
    if (!e.ctrlKey) return;

    const isZoomingIn: boolean = e.key === "+" || e.key === "=";
    const isZoomingOut: boolean = e.key === "-" || e.key === "_";

    if (isZoomingIn || isZoomingOut) {
      e.preventDefault();

      const addedZoom = isZoomingIn ? 0.25 : -0.25;
      if (this.zoomCurr + addedZoom <= 0 || this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM) return;
      this.zoomCurr += addedZoom;
      this.editor.style.scale = `${this.zoomCurr}`;
      this.zoomRangeInput.value = `${this.zoomCurr}`;
      this.zoomInput.value = `${this.zoomCurr * 100}`;
    }
  }

  /** @description Handles the zoom with a slider (range input) */
  private handleRangeZoom(e: Event) {
    const target = e.target as HTMLInputElement;
    const zoomValue: number = parseFloat(target.value);
    this.zoomInput.value = `${zoomValue * 100}`;
    this.editor.style.scale = `${zoomValue}`;
  }

  /** @description Handles the zoom through input */
  private handleInputZoom() {
    let previousZoom = this.zoomCurr;
    const zoomAmount: number = parseInt(this.zoomInput.value, 10) / 100;
    const minZoom: number = parseFloat(this.zoomRangeInput.min);
    this.zoomCurr = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;

    if (this.zoomCurr < minZoom) {
      if (previousZoom < minZoom) previousZoom = 1;
      this.zoomInput.value = `${previousZoom * 100}`;
      this.editor.style.scale = `${previousZoom}`;
      return;
    }
    this.zoomInput.value = `${this.zoomCurr * 100}`;
    this.editor.style.scale = `${this.zoomCurr}`;
  }

  /** @description Selects entire input content onfocus */
  private handleInputFocus(inputElement: HTMLInputElement) {
    inputElement.focus();
    inputElement.select();
  }

  /** @description Enforces digit only input */
  private enforeDigitOnly(e: KeyboardEvent) {
    if (!/Backspace|\d/g.test(e.key)) e.preventDefault();
  }

  /**
   *
   * @description Handles document title change
   *
   */

  /** @description If the title value is invalid, set the document title to "Unnamed" */
  private handleTitleBlur() {
    const content: string = this.titleInput.value;
    if (content.replace(/\s*/g, "") !== "") return;
    this.titleInput.value = "Unnamed";
  }

  /** @description On title change, set document.title */
  private handleTitleInput() {
    const title: string = this.titleInput.value;
    if (title.replace(/\s*/g, "") === "") {
      document.title = "Azu - Unnamed";
    } else {
      const ellidedString: string =
        title.length >= this.MAX_TITLE_LENGTH ? `${title.substring(0, this.MAX_TITLE_LENGTH - 3)}...` : title;
      document.title = `Azu - ${ellidedString}`;
    }
  }

  /**
   *
   * @description Handles events related to setting configuration
   *
   */

  private instantiateSettingsUI() {
    this.settingsButton.addEventListener("click", () => this.openSettings());
    this.settingsCloseButton.addEventListener("click", () => this.closeSettings());
  }

  /** @description Opens the settings view, while closing the main view */
  private openSettings() {
    this.mainView.style.display = "none";
    this.settingsView.style.display = "block";
    document.body.style.overflowY = "scroll";
  }

  /** @description Opens the main view, while closing the settings view */
  private closeSettings() {
    this.settingsView.style.display = "none";
    this.mainView.style.display = "block";
    document.body.style.overflowY = "hidden";
  }
}
