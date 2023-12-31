import { LanguageOptionString, TextMistake } from "../../types";

/**
 *
 * @description Implements text correction
 *
 */

export default class TextCorrection {
  contextMenuOptions: HTMLUListElement;
  contextMenu: HTMLDivElement;
  contextMenuCover: HTMLDivElement;
  editor: HTMLDivElement;
  currentWordListLang: string;
  wordList: Array<string>;
  readonly CORRECTION_INTERVAL: number;

  constructor() {
    this.contextMenuOptions = document.querySelector("#context-menu-options") as HTMLUListElement;
    this.contextMenu = document.querySelector("#context-menu") as HTMLDivElement;
    this.contextMenuCover = document.querySelector("#main-cover") as HTMLDivElement;
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.currentWordListLang = "";
    this.wordList = [];
    this.CORRECTION_INTERVAL = 500;
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
      if (textContent === null || textContent.replace(/\u200B/g, "").length === 0) {
        paraIndex += 1;
        continue;
      }
      await this.scanText(para as HTMLDivElement, paraIndex).then(() => {
        paraIndex += 1;
      });
    }
  }

  /** @description Scans text content for errors, then structures errors in an object */
  private async scanText(paragraph: HTMLDivElement, paraIndex: number) {
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

  /** FIXME: Revert user cursor position on edit */
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
      this.observeErrorChange(error as HTMLSpanElement);
    }
  }

  /** @description Shows suggestions using the Levensthein distance algorithm */
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

    /* TODO: Wait for contextMenuOptions's children as they might not exist */
    setTimeout(() => {
      const errorMessage = document.createElement("li");
      const suggestionFragment = document.createDocumentFragment();
      errorMessage.setAttribute("id", "correction-error-option");

      const languageDescriptor = document.createElement("h1");

      const capitalizedLang = this.currentWordListLang[0].toLocaleUpperCase() + this.currentWordListLang.slice(1);
      languageDescriptor.innerHTML = capitalizedLang;
      suggestionFragment.appendChild(languageDescriptor);

      const suggestionMessage = document.createElement("p");
      if (suggestions.length === 0) {
        suggestionMessage.innerHTML = `No suggestions for term "${term}"`;
        suggestionFragment.appendChild(suggestionMessage);
      } else {
        const ism = `The spelling for the term "${term}" seems incorrect, here are some suggestions :`;
        suggestionMessage.innerHTML = ism;
        const suggestionsUL = document.createElement("ul");
        suggestions.forEach((suggestion) => {
          const suggestionLi = document.createElement("li");
          suggestionLi.textContent = suggestion.word;

          suggestionLi.addEventListener("click", () => {
            const textNode = document.createTextNode(suggestion.word);
            span.replaceWith(textNode);
            this.contextMenu.style.display = "none";
            this.contextMenuCover.style.display = "none";
          });
          suggestionsUL.appendChild(suggestionLi);
        });
        suggestionFragment.appendChild(suggestionMessage);
        suggestionFragment.appendChild(suggestionsUL);
      }

      errorMessage.appendChild(suggestionFragment);
      const firstChild = this.contextMenuOptions.firstElementChild as HTMLLIElement;
      const errorJoiner = document.createDocumentFragment();
      errorJoiner.append(errorMessage, document.createElement("hr")); 
      this.contextMenuOptions.insertBefore(errorJoiner, firstChild);
    });
  }

  /** @description Changes the content of the error element if the updated text is valid */
  private observeErrorChange(error: HTMLSpanElement) {
    const options: MutationObserverInit = {
      childList: true,
      characterData: true,
      characterDataOldValue: true,
      subtree: true,
    };

    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        const textContent = mutation.target.textContent;
        if (mutation.type !== "characterData" || !textContent) return;
        if (this.wordList.includes(textContent)) {
          const text = document.createTextNode(textContent);
          error.replaceWith(text);
        }
      }
    });

    observer.observe(error, options);
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
