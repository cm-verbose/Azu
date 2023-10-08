import Storage from "./storage.js";
export default class Editor {
  constructor() {
    this.editor = document.querySelector("#editor");
    this.wordCountContainer = document.querySelector("#word-count");
    this.formatFontSizeInput = document.querySelector("#format-font-size");
    this.zoomRangeInput = document.querySelector("#zoom-range");
    this.zoomInput = document.querySelector("#zoom-control-input");
    this.Storage = new Storage();
    /*
          localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated within
          the Storage class.
        */
    this.zoomAmount = parseInt(localStorage.getItem("zoomLevel"), 10) / 100;
    this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
    this.ini();
  }
  /** @description initializes the editor */
  ini() {
    this.setEvents();
  }
  /** @description Configures editor functions */
  setEvents() {
    this.configureEditorZoom();
    this.configureEditorFunctions();
    this.configureWordCount();
  }
  /**
   *
   * @description Configures events relative to the editor only (typing, inserting text...)
   *
   **/
  configureEditorFunctions() {
    this.editor.addEventListener("blur", () => this.handleEmptyEditor());
    this.editor.addEventListener("paste", (e) => this.handlePaste(e));
    this.editor.addEventListener("beforeinput", (e) => this.handleEditorInput(e));
    this.formatFontSizeInput.addEventListener("keydown", (e) => this.enforeDigitOnly(e));
    this.formatFontSizeInput.addEventListener("click", () => this.handleInputFocus(this.formatFontSizeInput));
  }
  /** @description Clears the editor when empty (remaining <div>, <br> elements) */
  handleEmptyEditor() {
    if (this.editor.innerText.replace(/\s+/g, "").length !== 0) return;
    this.editor.innerHTML = "";
  }
  /** @description Handles the paste event, to only keep text */
  handlePaste(e) {
    e.preventDefault();
    const clipboardData = e.clipboardData ? e.clipboardData.getData("text") : null;
    if (!clipboardData) return;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const textContentNode = document.createTextNode(clipboardData);
    range.insertNode(textContentNode);
    range.setStartAfter(textContentNode);
    range.setEndAfter(textContentNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  handleEditorInput(e) {
    switch (e.inputType) {
      case "insertParagraph":
        {
          this.handleParagraphInsertion();
        }
        break;
    }
  }
  /** @description Overrides the default keydown event for a contenteditable <div> element */
  handleParagraphInsertion() {
    const firstChild = this.editor.firstChild;
    if (!firstChild || firstChild.nodeType !== 3) return; // nodeType === 3 is a text node
    const firstChildContent = firstChild.textContent;
    const firstDivElement = document.createElement("div");
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
  configureWordCount() {
    const INTERVAL = 5000;
    let timer = setTimeout(() => {});
    this.editor.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const textContent = this.editor.innerText;
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
  configureEditorZoom() {
    document.addEventListener("wheel", (e) => this.handleWheelZoom(e), { passive: false });
    document.addEventListener("keydown", (e) => this.handleKeyZoom(e));
    this.zoomRangeInput.addEventListener("input", (e) => this.handleRangeZoom(e));
    this.zoomInput.addEventListener("blur", () => this.handleInputZoom());
    this.zoomInput.addEventListener("click", () => this.handleInputFocus(this.zoomInput));
    this.zoomInput.addEventListener("keydown", (e) => this.enforeDigitOnly(e));
  }
  /** @description Zooms only the inner document portion onwheel */
  handleWheelZoom(e) {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const addedZoom = -1 * (e.deltaY / 600);
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
  handleKeyZoom(e) {
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
  handleRangeZoom(e) {
    const target = e.target;
    const zoomValue = parseFloat(target.value);
    this.zoomInput.value = `${zoomValue * 100}`;
    this.editor.style.scale = `${zoomValue}`;
  }
  /** @description Handles the zoom through input */
  handleInputZoom() {
    let previousZoom = this.zoomAmount;
    const zoomAmount = parseInt(this.zoomInput.value, 10) / 100;
    this.zoomAmount = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;
    const minZoom = parseFloat(this.zoomRangeInput.min);
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
  handleInputFocus(inputElement) {
    inputElement.focus();
    inputElement.select();
  }
  /** @description Enforces digit only input */
  enforeDigitOnly(e) {
    if (!/Backspace|\d/g.test(e.key)) e.preventDefault();
  }
}
