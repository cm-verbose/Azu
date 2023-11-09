import { LanguageOptionString, TextMistake } from "../../types";

/**
 *
 * @description Implements text correction
 *
 */

export default class TextCorrection {
  editor: HTMLDivElement;
  currentWordListLang: string;
  wordList: Array<string>;
  CORRECTION_INTERVAL: number;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.currentWordListLang = "";
    this.wordList = [];
    this.CORRECTION_INTERVAL = 2_000;
    this.initializeTextCorrection();
  }

  /** @description instantiates all methods related to text correction */
  private initializeTextCorrection() {
    this.configureTextCorrection();
  }

  /** @description Attempts to find errors within the document */
  private configureTextCorrection() {
    let timer = setTimeout(() => {});
    this.editor.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        queueMicrotask(async () => {
          if (this.currentWordListLang === "" || this.wordList.length === 0) {
            this.currentWordListLang = "french";
            await this.loadDictionnary("french").then((json) => {
              this.setDictionnary(json);
            });
          }
          this.verifyText();
        });
      }, this.CORRECTION_INTERVAL);
    });
  }

  /** @description Loads a specified dictionnary */
  private async loadDictionnary(lang: LanguageOptionString): Promise<Array<string>> {
    const response = await fetch(`./json/${lang}.json`);
    const dictionnary = await response.json();
    return dictionnary;
  }

  /** @description sets value this.wordList */
  private setDictionnary(dictionnary: Array<string>) {
    this.wordList = dictionnary;
  }

  /** @description Finds errors in text */
  private async verifyText() {
    if (this.wordList.length === 0) return;
    const paragraphs = this.editor.children;
    let paraIndex = 0;
    for (const para of paragraphs) {
      const textContent = para.textContent;

      /* Triming a placeholder \u200B, zero width space in order to remove it from tokens */
      if (textContent === null || textContent.replace(/\u200B/g, "").length === 0) return;
      await this.scanText(para as HTMLDivElement, paraIndex);
      paraIndex += 1;
    }
  }

  /** @description Scans text content for errors, then structures errors in an object */
  private async scanText(paragraph: HTMLDivElement, paraIndex: number) {
    console.log("[scanning...]");
    const textContent = (paragraph.textContent as string).trim();
    const tokens = textContent.split(" ");
    const errorCollection: Array<TextMistake> = [];

    /** TODO: Add other languages too (but not now) */
    switch (this.currentWordListLang as LanguageOptionString) {
      case "french":
        {
          tokens.forEach((token, index) => {
            const errorTerm = {
              paraIndex: paraIndex,
              nth: index,
              term: "",
            };
            const addTerm = (term: string) => {
              Object.defineProperty(errorTerm, "term", {
                value: term,
                enumerable: true,
              });
              errorCollection.push(errorTerm);
            };

            const word: string | Array<string> = token.includes("'")
              ? token.toLowerCase().split("'")
              : token.toLowerCase();

            if (typeof word === "string") {
              if (this.wordList.includes(word) || word.replace(/\s+|\u200B/g, "") === "") return;
              addTerm(word.trim());
            } else if (Array.isArray(word)) {
              /* case for terms composed by elision such as "c'est" or "presqu'île" */
              word.forEach((part: string, index) => {
                if (index === 0) {
                  /* The a "c" part is not a valid word, but ce, which is "c"+"e" is valid */
                  if (this.wordList.includes(part + "e")) return;
                  addTerm((part + "e").trim());
                } else if (!this.wordList.includes(part)) {
                  addTerm(part.trim());
                }
              });
            }
          });
          if (errorCollection.length === 0) return; /* no errors were detected */
          this.markIncorrectTerm(errorCollection);
        }
        break;
    }
  }

  /** @description marks incorrect terms within the DOM, and suggestions along with it */
  private markIncorrectTerm(errorArray: Array<TextMistake>) {
    errorArray.forEach((error: TextMistake) => {
      const targetedParagraph = this.editor.children[error.paraIndex];
      console.log(targetedParagraph.innerHTML, error);
    });
  }

  /** @description Create Error span element */
  private createErrorElement(content: Node | string): HTMLSpanElement {
    const errorElement: HTMLSpanElement = document.createElement("span");
    errorElement.setAttribute("class", "error");
    if (typeof content === "string") {
      const textNode = document.createTextNode(content);
      errorElement.appendChild(textNode);
    } else {
      errorElement.appendChild(content);
    }

    errorElement.addEventListener("click", () => {
      console.log(errorElement.textContent);
    });
    return errorElement;
  }
}
