/**
 *
 * @description initialises events relative to word count, word length, mistakes etc.
 * or document hence, statistics.
 *
 **/
export default class Statictics {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.wordCountContainer = document.querySelector("#word-count");
        this.COUNT_INTERVAL = 5000;
        this.initializeStatistics();
    }
    initializeStatistics() {
        this.configureWordCount();
    }
    /** @description Count words at an interval */
    configureWordCount() {
        let timer = setTimeout(() => { });
        this.editor.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                queueMicrotask(() => {
                    const textContent = this.editor.innerText;
                    const textLength = textContent
                        .trim()
                        .split(/\s+/g)
                        .filter((x) => x !== "").length;
                    this.wordCountContainer.innerText = `${textLength === 0 ? "no" : textLength} word${textLength === 1 ? "" : "s"}`;
                });
            }, this.COUNT_INTERVAL);
        });
    }
}
