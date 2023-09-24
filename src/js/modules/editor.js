export default class Editor {
  constructor() {
    this.editor = document.querySelector("#editor");
    this.wordCountContainer = document.querySelector("#word-count");
    this.formatFontSizeInput = document.querySelector("#format-font-size");
    this.zoomAmount = 1;
    this.MAX_ALLOWED_ZOOM = 25;
    this.ini();
  }
  /** @description initializes the editor */
  ini() {
    this.setEvents();
  }
  /** @description Sets basic events*/
  setEvents() {
    document.addEventListener("wheel", (e) => this.handleWheelZoom(e), { passive: false });
    document.addEventListener("keydown", (e) => this.handleKeyZoom(e));
    this.editor.addEventListener("keydown", (e) => this.handleEditorKeydown(e));
    this.editor.addEventListener("blur", () => this.handleEmptyEditor());
    this.editor.addEventListener("paste", (e) => this.handlePaste(e));
    this.editor.addEventListener("keydown", (e) => this.handleUndoRedo(e));
    this.formatFontSizeInput.addEventListener("keydown", (e) => {
      if (e.key.match(/\D/)) return;
    });
    this.setWordCount();
  }
  /** @description overrides the default keydown event for a contenteditable <div> element */
  handleEditorKeydown(e) {
    /* Correct the first node type to be a div */
    if (e.key === "Enter") {
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
  }
  /** @description Clears the editor when empty (remaining <div>, <br> elements)*/
  handleEmptyEditor() {
    if (this.editor.innerText.replace(/\s+/g, "").length !== 0) return;
    this.editor.innerHTML = "";
  }
  /** @description Set events to count words inside contenteditable div  */
  setWordCount() {
    const INTERVAL = 5000;
    let timer = 0;
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
  /** @description Handles the paste event, to only keep text  */
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
  /**
   * @description Handles the CTRL + Z, CTRL + Y events within the editor ,
   * as using the Selection API doesn't register in the event history
   **/
  handleUndoRedo(e) {
    // TODO:
    if (!e.ctrlKey) return;
    if (e.key === "z") {
      e.preventDefault();
    }
    if (e.key === "y") {
      e.preventDefault();
    }
  }
  /** @description zooms only the inner document portion onwheel*/
  handleWheelZoom(e) {
    if (!e.ctrlKey) return;
    e.preventDefault();
    const addedZoom = -1 * (e.deltaY / 600);
    if (this.zoomAmount + addedZoom <= 0 || this.zoomAmount + addedZoom >= this.MAX_ALLOWED_ZOOM) return;
    this.zoomAmount += addedZoom;
    this.editor.style.scale = `${this.zoomAmount}`;
  }
  /** @description zooms only the inner document portion on CTRL + +, CTRL + - */
  handleKeyZoom(e) {
    if (!e.ctrlKey) return;
    const isZoomingIn = e.key === "+" || e.key === "=";
    const isZoomingOut = e.key === "-" || e.key === "_";
    if (isZoomingIn || isZoomingOut) {
      e.preventDefault();
      const addedZoom = isZoomingIn ? 0.25 : -0.25;
      if (this.zoomAmount + addedZoom <= 0 || this.zoomAmount + addedZoom >= this.MAX_ALLOWED_ZOOM) return;
      this.zoomAmount += addedZoom;
      this.editor.style.scale = `${this.zoomAmount}`;
    }
  }
}
