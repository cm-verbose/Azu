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
      this.initialDiv.after(secondNode);

      console.log(secondNode);
      setTimeout(() => {
        const range = new Range();
        range.setStart(secondNode, 0);
        range.setEnd(secondNode, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      });
    }
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

  /** @description Prevents the initial div from being deleted */
  restrictInitialDiv(e: KeyboardEvent) {
    if (e.key === "Backspace") {
      if (this.initialDiv.innerText.replace(/\n|\s/g, "") === "") {
        e.preventDefault();
      }
    }
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
