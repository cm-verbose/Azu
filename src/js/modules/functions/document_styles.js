/**
 *
 * @description Handles document styles, such as bold, italics, superscript, fonts,
 * text justification, etc.
 *
 */
export default class DocumentStyles {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.boldButton = document.querySelector("#format-bold");
        this.italicButton = document.querySelector("#format-italics");
        this.justifyLeftButton = document.querySelector("#format-justify-left");
        this.justifyCenterButton = document.querySelector("#format-justify-center");
        this.justifyRightButton = document.querySelector("#format-justify-right");
        this.justifyEvenButton = document.querySelector("#format-justify-even");
        this.underlineButton = document.querySelector("#format-underline");
        this.strikeButtonButton = document.querySelector("#format-strike");
        this.supScriptButton = document.querySelector("#format-sup");
        this.subScriptButton = document.querySelector("#format-sub");
        this.instantiateDocumentStyles();
    }
    /** @description instantiates document styles */
    instantiateDocumentStyles() {
        this.instantiateTextStyles();
        this.instantiateTextJustification();
    }
    /** @description Instantiate text styles (bold, italics, font...) */
    instantiateTextStyles() {
        /**
         * FIXME: THIS IS DEPECRECATED AND COULD STOP WORKING AT ANY MOMENT
         * TODO: THIS IS FEATURE DIFFERS FROM BROWSERS TO BROWSERS
         * */
        this.boldButton.addEventListener("click", () => document.execCommand("bold", false));
        this.italicButton.addEventListener("click", () => document.execCommand("italic", false));
        this.underlineButton.addEventListener("click", () => document.execCommand("underline", false));
        this.strikeButtonButton.addEventListener("click", () => document.execCommand("strikeThrough", false));
        this.supScriptButton.addEventListener("click", () => document.execCommand("superScript", false));
        this.subScriptButton.addEventListener("click", () => document.execCommand("subScript", false));
    }
    /** @description Sets events for text justification by the click of a button */
    instantiateTextJustification() {
        this.justifyCenterButton.addEventListener("click", this.handleJustification("center"));
        this.justifyLeftButton.addEventListener("click", this.handleJustification("left"));
        this.justifyRightButton.addEventListener("click", this.handleJustification("right"));
        this.justifyEvenButton.addEventListener("click", this.handleJustification("justify"));
    }
    /** @description Handles text justification events */
    handleJustification(position) {
        return () => {
            const selection = window.getSelection();
            let parentNode = selection.focusNode;
            /* recursively traverse parents to find the ones that are paragraph leveled */
            if (parentNode && parentNode.parentElement !== this.editor) {
                while (parentNode !== null && parentNode.parentElement !== this.editor) {
                    parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentElement;
                }
            }
            if (parentNode === null)
                return;
            const paragraphNode = parentNode;
            if (selection.anchorNode === selection.focusNode) {
                paragraphNode.setAttribute("data-text-align", position);
            }
            else {
                let endNode = selection.anchorNode;
                if (endNode && endNode.parentElement !== this.editor) {
                    while (endNode !== null && endNode.parentElement !== this.editor) {
                        endNode = endNode === null || endNode === void 0 ? void 0 : endNode.parentElement;
                    }
                }
                if (!endNode)
                    return;
                const childEndPosition = Array.from(this.editor.children).indexOf(endNode);
                const childStartPosition = Array.from(this.editor.children).indexOf(paragraphNode);
                const positionSet = {
                    start: childStartPosition < childEndPosition ? childStartPosition : childEndPosition,
                    end: (childStartPosition < childEndPosition ? childEndPosition : childStartPosition) + 1,
                };
                for (let i = positionSet.start; i < positionSet.end; i++) {
                    if (!this.editor.children[i])
                        break;
                    this.editor.children[i].setAttribute("data-text-align", position);
                }
            }
        };
    }
}
