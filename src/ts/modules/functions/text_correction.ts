/**
 *
 * @description Implements text correction
 *
 */

import { ErrorObjectShape, LanguageOptionString } from "../../types";
import Corrector from "./languages/corrector";
import { FrenchCorrector } from "./languages/french";

export default class TextCorrection {
  contextMenu: HTMLDivElement;
  contextMenuOptions: HTMLUListElement;
  contextMenuOverlay: HTMLDivElement;
  editor: HTMLDivElement;

  /* Internal state */
  currentLanguage: LanguageOptionString | "";
  currentCorrector: Corrector | null;
  wordSet: Array<string>;
  readonly TEXT_CORRECTION_INTERVAL: number;

  constructor() {
    this.contextMenu = document.querySelector("#context-menu") as HTMLDivElement;
    this.contextMenuOptions = document.querySelector("#context-menu-options") as HTMLUListElement;
    this.contextMenuOverlay = document.querySelector("#main-cover") as HTMLDivElement;
    this.editor = document.querySelector("#editor") as HTMLDivElement;

    /* Internal states */
    this.currentLanguage = "";
    this.currentCorrector = null;
    this.wordSet = [];
    this.TEXT_CORRECTION_INTERVAL = 1000;
    this.iniTextCorrection();
  }

  private iniTextCorrection() {
    let timer = setTimeout(() => {});
    this.editor.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const language = "french";
        this.scanText(language);
      }, this.TEXT_CORRECTION_INTERVAL);
    });
  }

  /** @description loads a specified dictionnary, containing words in the specified language */
  private async loadDictionnary(language: LanguageOptionString) {
    const response = await fetch(`./json/${language}.json`);
    const dictionnary = (await response.json()) as string[];
    this.currentLanguage = language;
    this.wordSet = dictionnary;
  }

  /** @description scan text to find words */
  private scanText(language: LanguageOptionString) {
    if (this.wordSet.length === 0 || this.currentLanguage !== language) {
      this.loadDictionnary(language).then(() => {
        this.identifyParagraphs(language);
      });
    } else {
      this.identifyParagraphs(language);
    }
  }

  /** @description identify the paragraphs to correct */
  private identifyParagraphs(lang: LanguageOptionString) {
    let i = 0;
    for (const el of this.editor.children) {
      const paragraph = el as HTMLDivElement;
      if (paragraph.textContent === "" || paragraph.textContent === null) {
        i += 1;
        continue;
      }
      this.correctText({ content: paragraph.textContent, paragraphIndex: i }, lang);
      i += 1;
    }
  }

  /** @description corrects text based on current language */
  private correctText(contentValue: { content: string; paragraphIndex: number }, language: LanguageOptionString) {
    let tokens: Array<ErrorObjectShape> = [];
    if (this.currentCorrector === null || this.currentCorrector.lang !== language) {
      switch (this.currentLanguage) {
        case "french":
          {
            this.currentCorrector = new FrenchCorrector(this.wordSet);
          }
          break;
      }
    }
    tokens = (this.currentCorrector as Corrector).correct(contentValue.content, contentValue.paragraphIndex);
    if (tokens.length === 0) return;
    this.markIncorrect(tokens);
  }

  /** @description marks text inccorrect in the editor */
  private markIncorrect(tokens: Array<ErrorObjectShape>) {
    /* 
      FIXME: Part of a detected erred word can appear as an error 
      within any word that contains a substring matching that word
      for example: have and ve, ve is erred, but the "ve" part of 
      "have" is highlighted (when "ve" is written last ?)
    */
    const rangeSet = [];

    for (const token of tokens) {
      const node = this.editor.children[token.index];
      const textNodes = this.filterTextNodesUnder(node);
      const unifiedText: string = textNodes.map((x) => x.textContent).join("\uFFFF");

      if (token.term.replace(/\s+/g, "").length === 0) continue;
      const termRegex = new RegExp(`\\b${token.term.split("").join("\uFFFF?")}\\b`, "g");
      const match = unifiedText.match(termRegex);
      if (!match || match.length === 0) continue;

      const delimitations: Array<{ start: number; end: number }> = [];
      let separators = this.getIndicesOf("\uFFFF", unifiedText);
      if (!separators || separators.length === 0) separators = [];

      if (match.length === 1) {
        let temp = "";
        const startIndex = unifiedText.indexOf(match[0]);
        for (let i = startIndex; i < unifiedText.length; i++) {
          temp += unifiedText[i];
          if (temp.match(termRegex)) break;
        }
        const endIndex = startIndex + temp.length;
        delimitations.push({ start: startIndex, end: endIndex });
      } else {
        for (const m of match) {
          const indices = this.getIndicesOf(m, unifiedText);
          if (!indices) continue;
          for (const index of indices) {
            let temp = "";
            for (let i = index; i < unifiedText.length; i++) {
              temp += unifiedText[i];
              if (temp.match(termRegex)) break;
            }
            const endIndex = index + temp.length;
            delimitations.push({ start: index, end: endIndex });
          }
        }
      }

      /* Remove duplicated objects (identical keys and values) */
      const delimitationsSet = [...new Set(delimitations.map((item) => JSON.stringify(item)))].map((item) =>
        JSON.parse(item)
      ) as Array<{ start: number; end: number }>;

      for (const delimitation of delimitationsSet) {
        const ps = separators.filter((x) => x <= delimitation.start); // separators passed (start)
        const pn = separators.filter((x) => x < delimitation.end); // separators passed (end)

        const startingNodeIndex = ps.length;
        const endingNodeIndex = pn.length;

        let startOffset,
          endOffset = 0;

        if (ps.length !== 0) {
          startOffset = delimitation.start - ps[ps.length - 1] - 1;
        } else {
          startOffset = delimitation.start;
        }

        if (pn.length !== 0) {
          endOffset = delimitation.end - pn[pn.length - 1] - 1;
        } else {
          endOffset = delimitation.end;
        }

        const range = new Range();
        range.setStart(textNodes[startingNodeIndex], startOffset);
        range.setEnd(textNodes[endingNodeIndex], endOffset);
        rangeSet.push(range);
      }
    }
    this.createErrorElements(rangeSet);
  }

  /** @description creates the error elements from the provided ranges */
  private createErrorElements(rangeArray: Array<Range>) {
    /* FIXME: Maintain user cursor position within a erred span */

    for (const range of rangeArray) {
      const contents = range.extractContents().childNodes;
      if (contents.length === 0) continue;
      const spanElement = this.createErrorSpan();

      for (let i = 0; i < contents.length; i++) {
        const child = contents.item(i) as Node;
        if (child.nodeType === Node.ELEMENT_NODE) {
          const element = child as HTMLElement;
          if (element.textContent === "") element.remove();
        }
      }
      spanElement.append(...contents);
      range.insertNode(spanElement);
    }
    this.cleanUpDeeplyNested();
  }

  /**
   * @description removes nth time nested terms and adds a MutationObserver
   * to see changes, after replacing nested elements
   */
  private cleanUpDeeplyNested() {
    const errorElements = document.getElementsByClassName("error") as HTMLCollectionOf<HTMLSpanElement>;
    if (errorElements.length === 0) return;
    for (const error of errorElements) {
      if (error.querySelector(".error")) {
        const nodes = this.selectAllMatching(".error", error);
        const span = this.createErrorSpan();
        span.append(...nodes[nodes.length - 1].childNodes);
        error.replaceWith(span);
      }
    }
    for (let i = 0; i < document.getElementsByClassName("error").length; i++) {
      const child = document.getElementsByClassName("error").item(i) as HTMLSpanElement;
      this.observeSpan(child);
    }
  }

  /** @description generator method used to traverse children */
  private *traverseChildren(element: Node): Generator<Node> {
    if (!element) return;
    yield element;

    for (const node of element.childNodes) {
      yield* this.traverseChildren(node);
    }
  }

  /** @description get nodes matching a selector */
  private selectAllMatching(selector: string, root: Node) {
    const result: Array<Node | HTMLElement> = [];
    for (const node of this.traverseChildren(root)) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if ((node as HTMLElement).matches(selector)) {
          result.push(node);
        }
      }
    }
    return result;
  }

  /** @description creates the error span elements */
  private createErrorSpan(): HTMLSpanElement {
    const span = document.createElement("span");
    span.addEventListener("contextmenu", () => this.displaySuggestions(span));
    span.setAttribute("class", "error");
    return span;
  }

  /** @description observes if the user corrects their mistakes, removes span if so */
  private observeSpan(span: HTMLSpanElement) {
    const configuration: MutationObserverInit = {
      characterData: true,
      childList: true,
      subtree: true,
    };
    const callback: MutationCallback = (mutationList: Array<MutationRecord>, observer: MutationObserver) => {
      for (const mutation of mutationList) {
        if (!mutation.target) observer.disconnect();
        const text = span.textContent;
        if (!text || text === "") return;

        const checkCorrected = (this.currentCorrector as Corrector).correct(text.toLowerCase(), -1);

        if (checkCorrected.length === 0) {
          const textNode = new Text(text);
          const selection = document.getSelection() as Selection;
          const oldRange = selection.getRangeAt(0);
          const startOffset = oldRange.startOffset;
          const endOffset = oldRange.endOffset;
          span.replaceWith(textNode);

          console.log(startOffset, endOffset);

          setTimeout(() => {
            const newRange = new Range();
            newRange.setStart(textNode, startOffset);
            newRange.setEnd(textNode, endOffset);
            newRange.collapse(false);
            selection.removeAllRanges();
            selection.addRange(newRange);
          });
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(span, configuration);
  }

  /** @description computes suggestions for the current term*/
  private displaySuggestions(span: HTMLSpanElement) {
    const text = span.textContent;

    if (!text) return;
    this.contextMenu.style.display = "none";
    this.computeSuggestions(text).then((suggestions) => {
      setTimeout(() => {
        this.editContextMenu(
          suggestions.map((x) => x.term),
          text,
          span
        );
      });
    });
  }

  /** @description edits the contextMenu in order to add the suggestions */
  private editContextMenu(suggestions: Array<string>, originalTerm: string, errorElement: HTMLSpanElement) {
    const errorMessage = document.createElement("li");
    const suggestionFragment = document.createDocumentFragment();
    errorMessage.setAttribute("id", "correction-error-option");

    const languageDescriptor = document.createElement("h1");

    const capitalizedLang = this.currentLanguage[0].toLocaleUpperCase() + this.currentLanguage.slice(1);
    languageDescriptor.textContent = capitalizedLang;
    suggestionFragment.appendChild(languageDescriptor);

    const suggestionMessage = document.createElement("p");
    if (suggestions.length === 0) {
      suggestionMessage.innerHTML = `No suggestions for the term ${originalTerm}`;
      suggestionFragment.appendChild(suggestionMessage);
    } else {
      const errMessage = `The spelling for the term
      ${originalTerm} seems incorrect, here are some suggestions :`;
      suggestionMessage.innerHTML = errMessage;
      const suggestionUL = document.createElement("ul");

      suggestions.forEach((suggestion) => {
        const suggestionLi = document.createElement("li");
        suggestionLi.textContent = suggestion;

        suggestionLi.addEventListener("click", () => {
          const textNode = new Text(suggestion);
          errorElement.replaceWith(textNode);
          this.contextMenu.style.display = "none";
          this.contextMenuOverlay.style.display = "none";
        });

        suggestionUL.appendChild(suggestionLi);
      });
      suggestionFragment.appendChild(suggestionMessage);
      suggestionFragment.appendChild(suggestionUL);
    }

    errorMessage.appendChild(suggestionFragment);
    const contextMenuFirstChild = this.contextMenuOptions.firstElementChild as HTMLLIElement;
    const errorJoiner = document.createDocumentFragment();
    errorJoiner.append(errorMessage, document.createElement("hr"));

    this.contextMenuOptions.insertBefore(errorJoiner, contextMenuFirstChild);

    this.contextMenu.style.display = "block";
    this.contextMenuOverlay.style.display = "block";
  }

  /** @description compares the passed term to one in the dictionary */
  private async computeSuggestions(term: string): Promise<Array<{ term: string; dif: number }>> {
    const word = term.toLowerCase();
    let filteredList: Array<string> = [];
    if (term.length <= 5) {
      filteredList = this.wordSet.filter((x) => x.startsWith(word[0]));
    } else {
      filteredList = this.wordSet.filter((x) => x.startsWith(word.slice(0, 2)));
    }

    return await this.computeSimilarity(term, filteredList);
  }

  /**
   * @description computes the similarity between a word set and a word
   */
  private async computeSimilarity(
    term: string,
    list: Array<string>
  ): Promise<Array<{ term: string; dif: number }>> {
    const suggestions = [];
    for (let i = 0; i < list.length; i++) {
      const distance = this.computeLevenstheinDistance(term, list[i]);
      suggestions.push({ term: list[i], dif: distance });
    }
    return suggestions
      .sort((a, b) => a.dif - b.dif)
      .reverse()
      .slice(0, 3);
  }

  /**
   * @description computes the similarity between two strings using the Levensthein distance
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

  /**
   * @description Gets the indices of where a string n appears.
   * @see https://stackoverflow.com/questions/3410464
   */
  private getIndicesOf(targetString: string, objectString: string): Array<number> {
    if (targetString.length === 0) return [];
    let startIndex,
      index = 0;
    const indices = [];
    while ((index = objectString.indexOf(targetString, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + targetString.length;
    }
    return indices;
  }

  /**
   * @description filters text nodes under an element
   * @see https://stackoverflow.com/questions/10730309
   */
  private filterTextNodesUnder(element: Node): Array<Node> {
    const children: Array<Node> = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode() !== null) {
      children.push(walker.currentNode);
    }
    return children;
  }
}
