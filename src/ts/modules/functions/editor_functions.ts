import { TextFormatOptionString } from "../../types";

/**
 *
 * @description Configures events relative to the functions of the text editing
 * within the editor
 *
 **/

export default class EditorFunctions {
  editor: HTMLDivElement;
  formatFontSizeInput: HTMLInputElement;
  initialDiv: HTMLDivElement;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.formatFontSizeInput = document.querySelector("#format-font-size") as HTMLInputElement;
    this.initialDiv = document.querySelector("#initial-content") as HTMLDivElement;
    this.configureEditorFunctions();
  }

  private configureEditorFunctions() {
    this.editor.addEventListener("blur", () => this.handleEmptyEditor());
    this.editor.addEventListener("paste", (e) => this.handlePaste(e));
    this.editor.addEventListener("beforeinput", (e: Event) => this.handleEditorInput(e as InputEvent));
    this.formatFontSizeInput.addEventListener("keydown", (e: KeyboardEvent) => this.enforeDigitOnly(e));
    this.formatFontSizeInput.addEventListener("click", () => this.handleInputFocus(this.formatFontSizeInput));
    this.editor.addEventListener("keydown", (e: KeyboardEvent) => this.restrictInitialDiv(e));
  }

  /** @description Clears the editor when empty (remaining <div>, <br> elements) */
  private handleEmptyEditor() {
    if (this.editor.innerText.replace(/\s+/g, "").length !== 0) return;
    this.initialDiv.innerHTML = "";
  }

  private handleEditorInput(e: InputEvent) {
    switch (e.inputType) {
      case "insertParagraph":
        {
          this.handleParagraphInsertion(e);
        }
        break;
    }
  }

  /** @description Overrides the default keydown event for a contenteditable <div> element */
  private handleParagraphInsertion(e: InputEvent) {
    const selection = window.getSelection() as Selection;
    const activeNode = selection.focusNode?.parentElement;
    if (activeNode === this.initialDiv) {
      e.preventDefault();
      const secondNode = document.createElement("div");
      secondNode.innerText = "\u200B";

      const align = this.initialDiv.getAttribute("data-text-align");
      const possibleAlignments: Array<TextFormatOptionString> = ["left", "center", "right", "justify"];
      if (align && possibleAlignments.includes(align as TextFormatOptionString)) {
        secondNode.setAttribute("data-text-align", align);
      }
      this.initialDiv.after(secondNode);
      setTimeout(() => {
        const range = new Range();
        range.setStart(secondNode, 0);
        range.setEnd(secondNode, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      });
    }
  }

  /** @description Handles the paste event */
  private handlePaste(e: ClipboardEvent) {
    if (!e.clipboardData) return;
    const data = e.clipboardData;
    if (data.types.length === 0) return;

    const html = data.getData("text/html");
    const template = document.createElement("template");
    template.innerHTML = html;

    if (!template.content) return;
    const fragment = template.content as DocumentFragment;
    const elements: Array<Node> = [];

    for (const node of fragment.childNodes) {
      if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
        elements.push(node);
      }
    }

    const selection = document.getSelection();
    if (!selection) return;
    const toBeAppendedFragment = document.createDocumentFragment();
    toBeAppendedFragment.append(...elements);
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(toBeAppendedFragment);

    // FIXME: This doesn't quite work + images
    range.setStartAfter(toBeAppendedFragment);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /** @description Prevents the initial div from being deleted */
  restrictInitialDiv(e: KeyboardEvent) {
    if (e.key !== "Backspace") return;
    if (this.initialDiv.innerText.replace(/\n|\s/g, "") === "") {
      const selection = window.getSelection();
      if (!selection) return;
      let parentNode = selection.anchorNode;

      /** recursively traverse elements until encountering the editor as a parent node */
      if (!(parentNode && parentNode.parentElement !== this.editor)) return;
      while (parentNode !== null && parentNode.parentElement !== this.editor) {
        parentNode = parentNode?.parentElement;
      }
      if (parentNode !== this.initialDiv) return;
      e.preventDefault();
    }
  }

  /** @description Selects entire input content onfocus */
  private handleInputFocus(inputElement: HTMLInputElement) {
    inputElement.focus();
    inputElement.select();
  }

  /** @description Enforces digit only input or backspace for deletion */
  private enforeDigitOnly(e: KeyboardEvent) {
    if (!/Backspace|\d/g.test(e.key)) e.preventDefault();
  }
}
