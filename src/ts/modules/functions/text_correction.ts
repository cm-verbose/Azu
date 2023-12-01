import { LanguageOptionString, TextMistake } from "../../types";

/**
 *
 * @description Implements text correction
 *
 */

export default class TextCorrection {
  contextMenu: HTMLDivElement; 
  editor: HTMLDivElement;
  currentWordListLang: string;
  wordList: Array<string>;
  readonly CORRECTION_INTERVAL: number;

  constructor() {
    this.contextMenu = document.querySelector("#context-menu") as HTMLDivElement; 
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
    let paraIndex = 0;
    for (const para of this.editor.children) {
      const textContent = para.textContent;

      /* Triming a placeholder \u200B, Zero-width space in order to remove it from tokens */
      if (textContent === null || textContent.replace(/\u200B/g, "").length === 0) return;
      await this.scanText(para as HTMLDivElement, paraIndex).then(() => {
        paraIndex += 1;
      });
    }
  }

  /** @description Scans text content for errors, then structures errors in an object */
  private async scanText(paragraph: HTMLDivElement, paraIndex: number) {
    console.log("[scanning...]");
    const textContent = (paragraph.textContent as string)
      .trim()
      .replace(/\u200B/g, "")
      .replace(/\u00A0/g, "");
    const tokens = textContent.split(" ");
    const errorArray: Array<TextMistake> = [];

    switch (this.currentWordListLang as LanguageOptionString) {
      case "french":
        {
          tokens.forEach((token) => {
            const errorTerm = {
              paraIndex: paraIndex,
              nthOccurence: errorArray.filter((x) => x.term === token || x.paraIndex === paraIndex).length,
              term: "",
            };
            const addTerm = (term: string) => {
              Object.defineProperty(errorTerm, "term", {
                value: term,
                enumerable: true,
              });
              errorArray.push(errorTerm);
            };
            const word: string | Array<string> = token.includes("'") ? token.split("'") : token;

            if (typeof word === "string") {
              const strWord: string = word.replace(/[^\w\s]+/g, "");
              /* exclude numbers, decimal numbers, exponential notation, imaginary forms */
              if (strWord.match(/(-?\d+(.\d+)?((e|E)(\+|-)\d+)?i?)(?![a-zA-Z])/g)) return;
              if (this.wordList.includes(strWord.toLowerCase()) || strWord.replace(/\s+|\u200B/g, "") === "")
                return;
              addTerm(strWord.trim());
            } else if (Array.isArray(word)) {
              /* case for terms composed by elision such as "c'est" or "presqu'île" */
              word.forEach((part: string, index) => {
                const p = part.replace(/[^\w\s]+/g, "");
                if (index === 0) {
                  /*  "c'est" is broken into "c" and "est", but "c" is not a valid term, but by elision, "ce" is */
                  if (this.wordList.includes((p + "e").toLowerCase())) return;
                  addTerm((p + "e").trim());
                } else if (!this.wordList.includes(p.toLowerCase())) {
                  addTerm(p.trim());
                }
              });
            }
          });
          if (errorArray.length === 0) return;
          this.markIncorrectTerm(errorArray);
        }
        break;
    }
  }

  /** @description marks incorrect terms within the DOM, and suggestions along with it */
  private markIncorrectTerm(errorArray: Array<TextMistake>) {
    // \u200C, \uFEFF

    errorArray.forEach((err: TextMistake) => {
      const paragraph = this.editor.children[err.paraIndex];
      const termRegex = new RegExp(`\\b(${err.term})\\b`, "g");
      if (!paragraph.textContent) return;
      paragraph.textContent = paragraph.textContent.replace(termRegex, "\uFEFF$1\u200C");
    });
    this.editor.innerHTML = this.editor.innerHTML.replace(/\uFEFF(.*?)\u200C/g, "<span data-temp-err>$1</span>");
    const errorNodes: NodeListOf<HTMLDivElement> = document.querySelectorAll("[data-temp-err]");

    for (const error of errorNodes) {
      const span = document.createElement("span");
      span.innerHTML = error.innerHTML;
      span.setAttribute("class", "error");
      error.replaceWith(span);
    }

    /* looping again since looping paragraph by paragraph only preserves the last paragraph's events */
    const errors = document.getElementsByClassName("error");
    for (const error of errors) {
      error.addEventListener("contextmenu", (e) => this.showSuggestions(e as MouseEvent));
    }
  }

  /** @description using some TODO: Algorithm ? Show suggestions from a given word */
  private showSuggestions(e: MouseEvent) {
    const span = e.target as HTMLSpanElement;
    const term = span.textContent;
    if (!term || term.length === 0) return;

    let filteredList = []; 

    if (term.length <= 3) {
      filteredList = this.wordList.filter((x) => x.startsWith(term) && x.length < term.length + 2);
    } else {
      filteredList = this.wordList.filter((x) => x.startsWith(term.slice(0, 3)));
    }
    const accumulator = [];
    for (const word of filteredList) {
      const editDistance = this.computeLevenstheinDistance(word, term.toLowerCase());
      accumulator.push({ word: word, edit: editDistance });
    }
    const suggestions = accumulator
      .sort((a, b) => a.edit - b.edit)
      .reverse()
      .slice(0, 3);
    console.log(suggestions);
    this.contextMenu.innerHTML = ""; 
    if(suggestions.length === 0){
      const message = document.createElement("span"); 
      message.textContent = `No suggestions for term "${term}"`;
      this.contextMenu.appendChild(message); 
    } else {
      const message = document.createElement("span"); 
      message.textContent = `Correct ortograph for term "${term}"`;
      this.contextMenu.appendChild(message); 

      suggestions.forEach(s => {
        const element = document.createElement("div");
        element.textContent = s.word;

        element.addEventListener("click", () =>{
          const textNode = document.createTextNode(s.word);
          span.replaceWith(textNode); 
          this.contextMenu.style.display = "none"; 
          this.contextMenu.innerHTML = ""; 
        });
        this.contextMenu.append(element); 
      });
    }
  }

  /**
   * @description computes Levensthein distance
   * @see https://rosettacode.org/wiki/Levenshtein_distance#TypeScript
   */
  private computeLevenstheinDistance(first: string, second: string): number {
    const m = first.length,
      n = second.length;
    let t: Array<number> = [...Array(n + 1).keys()],
      u: Array<number> = [];
    for (let i = 0; i < m; i++) {
      u = [i + 1];
      for (let j = 0; j < n; j++) {
        u[j + 1] = first[i] === second[j] ? t[j] : Math.min(t[j], t[j + 1], u[j]) + 1;
      }
      t = u;
    }
    return 1 - u[n] / Math.max(m, n);
  }
}
