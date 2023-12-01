/**
 *
 * @description Configures events relative to the functions of the text editing
 * within the editor
 *
 **/
export default class EditorFunctions {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.formatFontSizeInput = document.querySelector("#format-font-size");
        this.initialDiv = document.querySelector("#initial-content");
        this.configureEditorFunctions();
    }
    configureEditorFunctions() {
        this.editor.addEventListener("blur", () => this.handleEmptyEditor());
        this.editor.addEventListener("paste", (e) => this.handlePaste(e));
        this.editor.addEventListener("beforeinput", (e) => this.handleEditorInput(e));
        this.formatFontSizeInput.addEventListener("keydown", (e) => this.enforeDigitOnly(e));
        this.formatFontSizeInput.addEventListener("click", () => this.handleInputFocus(this.formatFontSizeInput));
        this.editor.addEventListener("keydown", (e) => this.restrictInitialDiv(e));
    }
    /** @description Clears the editor when empty (remaining <div>, <br> elements) */
    handleEmptyEditor() {
        if (this.editor.innerText.replace(/\s+/g, "").length !== 0)
            return;
        this.initialDiv.innerHTML = "";
    }
    handleEditorInput(e) {
        switch (e.inputType) {
            case "insertParagraph":
                {
                    this.handleParagraphInsertion(e);
                }
                break;
        }
    }
    /** @description Overrides the default keydown event for a contenteditable <div> element */
    handleParagraphInsertion(e) {
        var _a;
        const selection = window.getSelection();
        const activeNode = (_a = selection.focusNode) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (activeNode === this.initialDiv) {
            e.preventDefault();
            const secondNode = document.createElement("div");
            secondNode.innerText = "\u200B";
            const align = this.initialDiv.getAttribute("data-text-align");
            const possibleAlignments = ["left", "center", "right", "justify"];
            if (align && possibleAlignments.includes(align)) {
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
    /** @description Handles the paste event, to only keep text */
    handlePaste(e) {
        e.preventDefault();
        const clipboardData = e.clipboardData ? e.clipboardData.getData("text") : null;
        if (!clipboardData)
            return;
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const textContentNode = document.createTextNode(clipboardData);
        range.insertNode(textContentNode);
        range.setStartAfter(textContentNode);
        range.setEndAfter(textContentNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    /** @description Prevents the initial div from being deleted */
    restrictInitialDiv(e) {
        if (e.key === "Backspace") {
            if (this.initialDiv.innerText.replace(/\n|\s/g, "") === "") {
                const selection = window.getSelection();
                if (!selection)
                    return;
                let parentNode = selection.anchorNode;
                /** recursively traverse */
                if (parentNode && parentNode.parentElement !== this.editor) {
                    while (parentNode !== null && parentNode.parentElement !== this.editor) {
                        parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentElement;
                    }
                }
                if (parentNode === this.initialDiv) {
                    e.preventDefault();
                }
            }
        }
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
}
