import { languageOptionStrings } from "../../types";

/**
 *
 * @description Implements text correction for the editor
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
  private async loadDictionnary(lang: languageOptionStrings): Promise<Array<string>> {
    const response = await fetch(`./json/${lang}.json`);
    const dictionnary = await response.json();
    return dictionnary;
  }

  /** @description sets value this.wordList */
  private setDictionnary(dictionnary: Array<string>) {
    this.wordList = dictionnary;
  }

  /** @description finds errors in text */
  private async verifyText() {
    if (this.wordList.length === 0) return;
    const paragraphs = this.editor.children;
    for (const para of paragraphs) {
      const textContent = para.textContent;
      if (textContent === null || textContent.replace(/\u200B/g, "").length === 0) return;
      await this.scanText(para as HTMLDivElement);
    }
  }

  /** @description Scans text content for errors, then structures errors in an object */
  private async scanText(paragraph: HTMLDivElement) {
    console.log("scanning...");
    const textContent = (paragraph.textContent as string).trim();
    const tokens = textContent.split(" ");

    /** TODO: Add other languages too (but not now) */
    switch (this.currentWordListLang as languageOptionStrings) {
      case "french":
        {
          tokens.forEach((token) => {
            const word:string| Array<string> = token.includes("'") ? token.split("'") : token; 
            if (typeof word === "string") {
              if (this.wordList.includes(word)) return;
              console.log(word);
            } else if (Array.isArray(word)){
              /* case for words composed by elision like "c'est", "lorsqu'il" */
              word.forEach((part: string, index) => {
                if(index === 0){
                  if(this.wordList.includes(part + "e")) return; 
                  console.log(part); 
                } else if (!this.wordList.includes(part)){
                  console.log(part); 
                }
              });
            }
          });
        }
        break;
    }
  }
}
