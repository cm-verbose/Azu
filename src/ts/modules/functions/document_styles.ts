import { TextFormatOptionString } from "../../types";

/**
 *
 * @description Handles document styles, such as bold, italics, superscript, fonts,
 * text justification, etc.
 *
 */

export default class DocumentStyles {
  boldButton: HTMLButtonElement;
  editor: HTMLDivElement;
  fontFamilyInput: HTMLInputElement;
  fontFamilyJoiner: HTMLDivElement;
  fontFamilyDropdown: HTMLDivElement;
  italicButton: HTMLButtonElement;
  justifyLeftButton: HTMLButtonElement;
  justifyCenterButton: HTMLButtonElement;
  justifyRightButton: HTMLButtonElement;
  justifyEvenButton: HTMLButtonElement;
  strikeButtonButton: HTMLButtonElement;
  supScriptButton: HTMLButtonElement;
  subScriptButton: HTMLButtonElement;
  underlineButton: HTMLButtonElement;

  constructor() {
    this.fontFamilyJoiner = document.querySelector("#text-format-font") as HTMLDivElement;
    this.fontFamilyInput = document.querySelector("#format-font-family") as HTMLInputElement;
    this.fontFamilyDropdown = document.querySelector("#font-family-dropdown") as HTMLDivElement;
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.boldButton = document.querySelector("#format-bold") as HTMLButtonElement;
    this.italicButton = document.querySelector("#format-italics") as HTMLButtonElement;
    this.justifyLeftButton = document.querySelector("#format-justify-left") as HTMLButtonElement;
    this.justifyCenterButton = document.querySelector("#format-justify-center") as HTMLButtonElement;
    this.justifyRightButton = document.querySelector("#format-justify-right") as HTMLButtonElement;
    this.justifyEvenButton = document.querySelector("#format-justify-even") as HTMLButtonElement;
    this.underlineButton = document.querySelector("#format-underline") as HTMLButtonElement;
    this.strikeButtonButton = document.querySelector("#format-strike") as HTMLButtonElement;
    this.supScriptButton = document.querySelector("#format-sup") as HTMLButtonElement;
    this.subScriptButton = document.querySelector("#format-sub") as HTMLButtonElement;
    this.instantiateDocumentStyles();
  }

  /** @description instantiates document styles */
  private instantiateDocumentStyles() {
    this.instantiateTextStyles();
    this.instantiateTextJustification();
    this.instantiateDropdown();
  }

  /** @description Instantiate text styles (bold, italics, font...) */
  private instantiateTextStyles() {
    /**
     * FIXME: THIS IS DEPECRECATED AND COULD STOP WORKING AT ANY MOMENT
     * TODO: THIS IS FEATURE DIFFERS FROM BROWSERS TO BROWSERS
     * */

    this.boldButton.addEventListener("click", () => {
      this.wrapElement(document.createElement("strong"));
    });
    this.italicButton.addEventListener("click", () => document.execCommand("italic", false));
    this.underlineButton.addEventListener("click", () => document.execCommand("underline", false));
    this.strikeButtonButton.addEventListener("click", () => document.execCommand("strikeThrough", false));
    this.supScriptButton.addEventListener("click", () => document.execCommand("superScript", false));
    this.subScriptButton.addEventListener("click", () => document.execCommand("subScript", false));
  }

  /** @description Sets events for text justification by the click of a button */
  private instantiateTextJustification() {
    this.justifyCenterButton.addEventListener("click", this.justify("center"));
    this.justifyLeftButton.addEventListener("click", this.justify("left"));
    this.justifyRightButton.addEventListener("click", this.justify("right"));
    this.justifyEvenButton.addEventListener("click", this.justify("justify"));
  }

  /** @description Handles text justification events */
  private justify(position: TextFormatOptionString): () => void {
    return () => {
      const selection = window.getSelection();
      if (!selection) return;
      let parentNode = selection.focusNode;

      /* recursively traverse parents to find the ones that are paragraph leveled */
      if (parentNode && parentNode.parentElement !== this.editor) {
        while (parentNode !== null && parentNode.parentElement !== this.editor) {
          parentNode = parentNode?.parentElement;
        }
      }
      if (parentNode === null) return;
      const paragraphNode = parentNode as HTMLDivElement;

      if (selection.anchorNode === selection.focusNode) {
        paragraphNode.setAttribute("data-text-align", position);
      } else {
        let endNode = selection.anchorNode;
        if (endNode && endNode.parentElement !== this.editor) {
          while (endNode !== null && endNode.parentElement !== this.editor) {
            endNode = endNode?.parentElement;
          }
        }
        if (!endNode) return;
        const childEndPosition = Array.from(this.editor.children).indexOf(endNode as HTMLDivElement);
        const childStartPosition = Array.from(this.editor.children).indexOf(paragraphNode);
        const positionSet: Record<string, number> = {
          start: childStartPosition < childEndPosition ? childStartPosition : childEndPosition,
          end: (childStartPosition < childEndPosition ? childEndPosition : childStartPosition) + 1,
        };
        for (let i = positionSet.start; i < positionSet.end; i++) {
          if (!this.editor.children[i]) break;
          this.editor.children[i].setAttribute("data-text-align", position);
        }
      }
    };
  }

  /**
   * @description a function used to replace the document.execCommand() element creation
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand | document.execCommand(); }
   */
  private wrapElement<T extends HTMLElement>(element: T) {
    // TODO: FIXME: 
    const selection = document.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);

    const childNodes = range.cloneContents().childNodes;
    const elements = [];
    for (const child of childNodes) {
      elements.push(child);
    }
    range.deleteContents();

    if(elements.length === 0) return; 
    if(elements.length === 1){
      console.log(element, elements); 
      if(elements[0].parentElement && element.nodeType === elements[0].parentElement.nodeType){
        console.log(elements[0].childNodes); 
      } else{
        element.appendChild(elements[0]); 
        range.insertNode(element); 
        range.collapse(true);
        range.setStartAfter(element);
        selection.removeAllRanges(); 
        selection.addRange(range); 
      }
    }
    console.log(elements, element); 
  }

  /** @description Show dropdown indicating the font list under the font select menu */
  private async instantiateDropdown() {
    const boundBox = this.fontFamilyJoiner.getBoundingClientRect();
    const dropdown = this.fontFamilyDropdown;

    dropdown.style.width = `${boundBox.width}px`;
    dropdown.style.height = `${boundBox.height}px`;
    dropdown.style.left = `${boundBox.left}px`;
    dropdown.style.top = `${boundBox.top + boundBox.height}px`;

    this.fontFamilyInput.addEventListener("focus", () => {
      dropdown.style.display = "block";
    });

    this.fontFamilyInput.addEventListener("blur", () => {
      dropdown.style.display = "none";
    });
  }
}
