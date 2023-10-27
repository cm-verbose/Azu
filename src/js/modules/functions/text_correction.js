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
 * @description Implements text correction for the editor
 *
 */
export default class TextCorrection {
    constructor() {
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
    /** @description finds errors in text */
    verifyText() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wordList.length === 0)
                return;
            const paragraphs = this.editor.children;
            for (const para of paragraphs) {
                const textContent = para.textContent;
                if (textContent === null || textContent.replace(/\u200B/g, "").length === 0)
                    return;
                yield this.scanText(para);
            }
        });
    }
    /** @description Scans text content for errors, then structures errors in an object */
    scanText(paragraph) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("scanning...");
            const textContent = paragraph.textContent.trim();
            const tokens = textContent.split(" ");
            /** TODO: Add other languages too (but not now) */
            switch (this.currentWordListLang) {
                case "french":
                    {
                        tokens.forEach((token) => {
                            const word = token.includes("'") ? token.split("'") : token;
                            if (typeof word === "string") {
                                if (this.wordList.includes(word))
                                    return;
                                console.log(word);
                            }
                            else if (Array.isArray(word)) {
                                /* case for words composed by elision like "c'est", "lorsqu'il" */
                                word.forEach((part, index) => {
                                    if (index === 0) {
                                        if (this.wordList.includes(part + "e"))
                                            return;
                                        console.log(part);
                                    }
                                    else if (!this.wordList.includes(part)) {
                                        console.log(part);
                                    }
                                });
                            }
                        });
                    }
                    break;
            }
        });
    }
}
