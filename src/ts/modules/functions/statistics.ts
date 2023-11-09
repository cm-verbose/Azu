/**
 *
 * @description initialises events relative to word count, word length, mistakes etc.
 * or document hence, statistics.
 *
 **/

export default class Statictics {
  editor: HTMLDivElement;
  wordCountContainer: HTMLDivElement;
  COUNT_INTERVAL: number;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.wordCountContainer = document.querySelector("#word-count") as HTMLDivElement;
    this.COUNT_INTERVAL = 5_000;
    this.initializeStatistics();
  }

  private initializeStatistics() {
    this.configureWordCount();
  }

  /** @description Count words at an interval */
  private configureWordCount() {
    let timer = setTimeout(() => {});
    this.editor.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        queueMicrotask(() => {
          const textContent: string = this.editor.innerText;
          const textLength = textContent
            .trim()
            .split(/\s+/g)
            .filter((x) => x !== "").length;
          this.wordCountContainer.innerText = `${textLength === 0 ? "no" : textLength} word${
            textLength === 1 ? "" : "s"
          }`;
        });
      }, this.COUNT_INTERVAL);
    });
  }
}
