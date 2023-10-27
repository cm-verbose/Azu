/**
 * @description Instantiates User Interface events and functionality
 */

export default class UserInterface {
  editor: HTMLDivElement;
  titleInput: HTMLInputElement;
  zoomRangeInput: HTMLInputElement;
  zoomInput: HTMLInputElement;
  zoomAmount: number;
  MAX_ALLOWED_ZOOM: number;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.zoomRangeInput = document.querySelector("#zoom-range") as HTMLInputElement;
    this.zoomInput = document.querySelector("#zoom-control-input") as HTMLInputElement;
    /* 
      localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated 
      within the Storage class.
    */
    this.titleInput = document.querySelector("#title-input") as HTMLInputElement;
    this.zoomAmount = parseInt(localStorage.getItem("zoomLevel") as string, 10) / 100;
    this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
    this.instantiateUIEvents();
  }

  /** @description instanciates a group of unrelated UIEvents */
  private instantiateUIEvents() {
    document.title = "Azu - Document 1";
    this.titleInput.addEventListener("input", () => this.handleTitleInput());
    this.titleInput.addEventListener("blur", () => this.handleTitleBlur());
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
      this.zoomAmount + addedZoom > this.MAX_ALLOWED_ZOOM ||
      this.zoomAmount + addedZoom < parseFloat(this.zoomRangeInput.min)
    )
      return;

    console.log(Math.floor(parseFloat((this.zoomAmount * 100).toFixed(2))));

    this.zoomAmount += addedZoom;
    this.editor.style.scale = `${this.zoomAmount}`;
    this.zoomRangeInput.value = `${this.zoomAmount}`;
    this.zoomInput.value = `${Math.floor(parseFloat((this.zoomAmount * 100).toFixed(2)))}`;
  }

  /** @description Zooms only the inner document portion on `CTRL` + `+`, `CTRL` + `-` */
  private handleKeyZoom(e: KeyboardEvent) {
    if (!e.ctrlKey) return;

    const isZoomingIn: boolean = e.key === "+" || e.key === "=";
    const isZoomingOut: boolean = e.key === "-" || e.key === "_";

    if (isZoomingIn || isZoomingOut) {
      e.preventDefault();

      const addedZoom = isZoomingIn ? 0.25 : -0.25;
      if (this.zoomAmount + addedZoom <= 0 || this.zoomAmount + addedZoom > this.MAX_ALLOWED_ZOOM) return;
      this.zoomAmount += addedZoom;
      this.editor.style.scale = `${this.zoomAmount}`;
      this.zoomRangeInput.value = `${this.zoomAmount}`;
      this.zoomInput.value = `${this.zoomAmount * 100}`;
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
    let previousZoom = this.zoomAmount;
    const zoomAmount: number = parseInt(this.zoomInput.value, 10) / 100;
    const minZoom: number = parseFloat(this.zoomRangeInput.min);
    this.zoomAmount = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;

    if (this.zoomAmount < minZoom) {
      if (previousZoom < minZoom) previousZoom = 1;
      this.zoomInput.value = `${previousZoom * 100}`;
      this.editor.style.scale = `${previousZoom}`;
      return;
    }
    this.zoomInput.value = `${this.zoomAmount * 100}`;
    this.editor.style.scale = `${this.zoomAmount}`;
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
      const MAX_TITLE_LENGTH = 50;
      const ellidedString: string =
        title.length >= MAX_TITLE_LENGTH ? `${title.substring(0, MAX_TITLE_LENGTH - 3)}...` : title;
      document.title = `Azu - ${ellidedString}`;
    }
  }
}
