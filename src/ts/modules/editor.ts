import Storage from "./storage.js";

export default class Editor {
  editor: HTMLDivElement;
  formatFontSizeInput: HTMLInputElement;
  wordCountContainer: HTMLSpanElement;
  zoomRangeInput: HTMLInputElement;
  zoomInput: HTMLInputElement;

  /* Internal State */
  Storage: Storage;
  zoomAmount: number;
  MAX_ALLOWED_ZOOM: number;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.wordCountContainer = document.querySelector("#word-count") as HTMLDivElement;
    this.formatFontSizeInput = document.querySelector("#format-font-size") as HTMLInputElement;
    this.zoomRangeInput = document.querySelector("#zoom-range") as HTMLInputElement;
    this.zoomInput = document.querySelector("#zoom-control-input") as HTMLInputElement;
    this.Storage = new Storage();

    /* 
      localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated within 
      the Storage class. 
    */
    this.zoomAmount = parseInt(localStorage.getItem("zoomLevel") as string, 10) / 100;
    this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
    this.ini();
  }

  /** @description initializes the editor */
  public ini() {
    this.setEvents();
  }

  /** @description Configures editor functions */
  private setEvents() {
    this.configureEditorZoom();
    this.configureEditorFunctions();
    this.configureWordCount();
  }

  /**
   *
   * @description Configures events relative to the editor only (typing, inserting text...)
   *
   **/

  private configureEditorFunctions() {
    this.editor.addEventListener("blur", () => this.handleEmptyEditor());
    this.editor.addEventListener("paste", (e) => this.handlePaste(e));
    this.editor.addEventListener("beforeinput", (e: Event) => this.handleEditorInput(e as InputEvent));
    this.formatFontSizeInput.addEventListener("keydown", (e: KeyboardEvent) => this.enforeDigitOnly(e));
    this.formatFontSizeInput.addEventListener("click", () => this.handleInputFocus(this.formatFontSizeInput));
  }

  /** @description Clears the editor when empty (remaining <div>, <br> elements) */
  private handleEmptyEditor() {
    if (this.editor.innerText.replace(/\s+/g, "").length !== 0) return;
    this.editor.innerHTML = "";
  }

  /** @description Handles the paste event, to only keep text */
  private handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const clipboardData: string | null = e.clipboardData ? e.clipboardData.getData("text") : null;
    if (!clipboardData) return;
    const selection = window.getSelection() as Selection;
    const range: Range = selection.getRangeAt(0);

    const textContentNode = document.createTextNode(clipboardData);
    range.insertNode(textContentNode);
    range.setStartAfter(textContentNode);
    range.setEndAfter(textContentNode);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  private handleEditorInput(e: InputEvent) {
    switch (e.inputType) {
      case "insertParagraph":
        {
          this.handleParagraphInsertion();
        }
        break;
    }
  }
  /** @description Overrides the default keydown event for a contenteditable <div> element */
  private handleParagraphInsertion() {
    const firstChild = this.editor.firstChild;
    if (!firstChild || firstChild.nodeType !== 3) return; // nodeType === 3 is a text node
    const firstChildContent: string = firstChild.textContent as string;

    const firstDivElement: HTMLDivElement = document.createElement("div");
    firstDivElement.innerText = firstChildContent;

    /* prevents formating too soon */
    setTimeout(() => {
      firstChild.replaceWith(firstDivElement);
    });
  }

  /**
   *
   * @description Configures statistics
   *
   **/

  /** @description Set events to count words inside contenteditable div at an interval */
  private configureWordCount() {
    const INTERVAL: number = 5000;
    let timer = setTimeout(() => {});
    this.editor.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const textContent: string = this.editor.innerText;
        const textlength = textContent.trim().split(/\s+/g).length;
        this.wordCountContainer.innerText = `${textlength === 0 ? "no" : textlength} word${
          textlength === 1 ? "" : "s"
        }`;
      }, INTERVAL);
    });
  }

  /**
   *
   * @description Configures zoom events
   *
   **/

  private configureEditorZoom() {
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
    const addedZoom: number = -1 * (e.deltaY / 600);
    if (
      this.zoomAmount + addedZoom > this.MAX_ALLOWED_ZOOM ||
      this.zoomAmount + addedZoom < parseFloat(this.zoomRangeInput.min)
    )
      return;

    this.zoomAmount += addedZoom;
    this.editor.style.scale = `${this.zoomAmount}`;
    this.zoomRangeInput.value = `${this.zoomAmount}`;
    this.zoomInput.value = `${Math.floor(this.zoomAmount * 100)}`;
  }

  /** @description Zooms only the inner document portion on `CTRL` + `+`, `CTRL` + `-` */
  private handleKeyZoom(e: KeyboardEvent) {
    if (!e.ctrlKey) return;

    const isZoomingIn = e.key === "+" || e.key === "=";
    const isZoomingOut = e.key === "-" || e.key === "_";

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
    this.zoomAmount = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;
    const minZoom: number = parseFloat(this.zoomRangeInput.min);

    if (this.zoomAmount < minZoom) {
      if (previousZoom < minZoom) {
        previousZoom = 1;
      }
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
}
