var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @description Implements text correction
 *
 */
export default class TextCorrection {
    constructor() {
        this.contextMenu = document.querySelector("#context-menu");
        this.editor = document.querySelector("#editor");
        this.currentWordListLang = "";
        this.wordList = [];
        this.CORRECTION_INTERVAL = 2000;
        this.initializeTextCorrection();
    }
    /** @description instantiates all methods related to text correction */
    initializeTextCorrection() {
        this.configureTextCorrection();
    }
    /** @description Attempts to find errors within the document */
    configureTextCorrection() {
        let timer = setTimeout(() => { });
        this.editor.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                queueMicrotask(() => __awaiter(this, void 0, void 0, function* () {
                    if (this.currentWordListLang === "" || this.wordList.length === 0) {
                        this.currentWordListLang = "french";
                        yield this.loadDictionnary("french").then((json) => {
                            this.setDictionnary(json);
                        });
                    }
                    this.verifyText();
                }));
            }, this.CORRECTION_INTERVAL);
        });
    }
    /** @description Loads a specified dictionnary */
    loadDictionnary(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`./json/${lang}.json`);
            const dictionnary = yield response.json();
            return dictionnary;
        });
    }
    /** @description sets value this.wordList */
    setDictionnary(dictionnary) {
        this.wordList = dictionnary;
    }
    /** @description Finds errors in text */
    verifyText() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wordList.length === 0)
                return;
            let paraIndex = 0;
            for (const para of this.editor.children) {
                const textContent = para.textContent;
                /* Triming a placeholder \u200B, Zero-width space in order to remove it from tokens */
                if (textContent === null || textContent.replace(/\u200B/g, "").length === 0)
                    return;
                yield this.scanText(para, paraIndex).then(() => {
                    paraIndex += 1;
                });
            }
        });
    }
    /** @description Scans text content for errors, then structures errors in an object */
    scanText(paragraph, paraIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[scanning...]");
            const textContent = paragraph.textContent
                .trim()
                .replace(/\u200B/g, "")
                .replace(/\u00A0/g, "");
            const tokens = textContent.split(" ");
            const errorArray = [];
            switch (this.currentWordListLang) {
                case "french":
                    {
                        tokens.forEach((token) => {
                            const errorTerm = {
                                paraIndex: paraIndex,
                                nthOccurence: errorArray.filter((x) => x.term === token || x.paraIndex === paraIndex).length,
                                term: "",
                            };
                            const addTerm = (term) => {
                                Object.defineProperty(errorTerm, "term", {
                                    value: term,
                                    enumerable: true,
                                });
                                errorArray.push(errorTerm);
                            };
                            const word = token.includes("'") ? token.split("'") : token;
                            if (typeof word === "string") {
                                const strWord = word.replace(/[^\w\s]+/g, "");
                                /* exclude numbers, decimal numbers, exponential notation, imaginary forms */
                                if (strWord.match(/(-?\d+(.\d+)?((e|E)(\+|-)\d+)?i?)(?![a-zA-Z])/g))
                                    return;
                                if (this.wordList.includes(strWord.toLowerCase()) || strWord.replace(/\s+|\u200B/g, "") === "")
                                    return;
                                addTerm(strWord.trim());
                            }
                            else if (Array.isArray(word)) {
                                /* case for terms composed by elision such as "c'est" or "presqu'île" */
                                word.forEach((part, index) => {
                                    const p = part.replace(/[^\w\s]+/g, "");
                                    if (index === 0) {
                                        /*  "c'est" is broken into "c" and "est", but "c" is not a valid term, but by elision, "ce" is */
                                        if (this.wordList.includes((p + "e").toLowerCase()))
                                            return;
                                        addTerm((p + "e").trim());
                                    }
                                    else if (!this.wordList.includes(p.toLowerCase())) {
                                        addTerm(p.trim());
                                    }
                                });
                            }
                        });
                        if (errorArray.length === 0)
                            return;
                        this.markIncorrectTerm(errorArray);
                    }
                    break;
            }
        });
    }
    /** @description marks incorrect terms within the DOM, and suggestions along with it */
    markIncorrectTerm(errorArray) {
        // \u200C, \uFEFF
        errorArray.forEach((err) => {
            const paragraph = this.editor.children[err.paraIndex];
            const termRegex = new RegExp(`\\b(${err.term})\\b`, "g");
            if (!paragraph.textContent)
                return;
            paragraph.textContent = paragraph.textContent.replace(termRegex, "\uFEFF$1\u200C");
        });
        this.editor.innerHTML = this.editor.innerHTML.replace(/\uFEFF(.*?)\u200C/g, "<span data-temp-err>$1</span>");
        const errorNodes = document.querySelectorAll("[data-temp-err]");
        for (const error of errorNodes) {
            const span = document.createElement("span");
            span.innerHTML = error.innerHTML;
            span.setAttribute("class", "error");
            error.replaceWith(span);
        }
        /* looping again since looping paragraph by paragraph only preserves the last paragraph's events */
        const errors = document.getElementsByClassName("error");
        for (const error of errors) {
            error.addEventListener("contextmenu", (e) => this.showSuggestions(e));
        }
    }
    /** @description using some TODO: Algorithm ? Show suggestions from a given word */
    showSuggestions(e) {
        const span = e.target;
        const term = span.textContent;
        if (!term || term.length === 0)
            return;
        let filteredList = [];
        if (term.length <= 3) {
            filteredList = this.wordList.filter((x) => x.startsWith(term) && x.length < term.length + 2);
        }
        else {
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
        if (suggestions.length === 0) {
            const message = document.createElement("span");
            message.textContent = `No suggestions for term "${term}"`;
            this.contextMenu.appendChild(message);
        }
        else {
            const message = document.createElement("span");
            message.textContent = `Correct ortograph for term "${term}"`;
            this.contextMenu.appendChild(message);
            suggestions.forEach(s => {
                const element = document.createElement("div");
                element.textContent = s.word;
                element.addEventListener("click", () => {
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
    computeLevenstheinDistance(first, second) {
        const m = first.length, n = second.length;
        let t = [...Array(n + 1).keys()], u = [];
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
