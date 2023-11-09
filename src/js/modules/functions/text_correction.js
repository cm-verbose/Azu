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
            const paragraphs = this.editor.children;
            let paraIndex = 0;
            for (const para of paragraphs) {
                const textContent = para.textContent;
                /* Triming a placeholder \u200B, zero width space in order to remove it from tokens */
                if (textContent === null || textContent.replace(/\u200B/g, "").length === 0)
                    return;
                yield this.scanText(para, paraIndex);
                paraIndex += 1;
            }
        });
    }
    /** @description Scans text content for errors, then structures errors in an object */
    scanText(paragraph, paraIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("[scanning...]");
            const textContent = paragraph.textContent.trim();
            const tokens = textContent.split(" ");
            const errorCollection = [];
            /** TODO: Add other languages too (but not now) */
            switch (this.currentWordListLang) {
                case "french":
                    {
                        tokens.forEach((token, index) => {
                            const errorTerm = {
                                paraIndex: paraIndex,
                                nth: index,
                                term: "",
                            };
                            const addTerm = (term) => {
                                Object.defineProperty(errorTerm, "term", {
                                    value: term,
                                    enumerable: true,
                                });
                                errorCollection.push(errorTerm);
                            };
                            const word = token.includes("'")
                                ? token.toLowerCase().split("'")
                                : token.toLowerCase();
                            if (typeof word === "string") {
                                if (this.wordList.includes(word) || word.replace(/\s+|\u200B/g, "") === "")
                                    return;
                                addTerm(word.trim());
                            }
                            else if (Array.isArray(word)) {
                                /* case for terms composed by elision such as "c'est" or "presqu'île" */
                                word.forEach((part, index) => {
                                    if (index === 0) {
                                        /* The a "c" part is not a valid word, but ce, which is "c"+"e" is valid */
                                        if (this.wordList.includes(part + "e"))
                                            return;
                                        addTerm((part + "e").trim());
                                    }
                                    else if (!this.wordList.includes(part)) {
                                        addTerm(part.trim());
                                    }
                                });
                            }
                        });
                        if (errorCollection.length === 0)
                            return; /* no errors were detected */
                        this.markIncorrectTerm(errorCollection);
                    }
                    break;
            }
        });
    }
    /** @description marks incorrect terms within the DOM, and suggestions along with it */
    markIncorrectTerm(errorArray) {
        errorArray.forEach((error) => {
            const targetedParagraph = this.editor.children[error.paraIndex];
            console.log(targetedParagraph.innerHTML, error);
        });
    }
    /** @description Create Error span element */
    createErrorElement(content) {
        const errorElement = document.createElement("span");
        errorElement.setAttribute("class", "error");
        if (typeof content === "string") {
            const textNode = document.createTextNode(content);
            errorElement.appendChild(textNode);
        }
        else {
            errorElement.appendChild(content);
        }
        errorElement.addEventListener("click", () => {
            console.log(errorElement.textContent);
        });
        return errorElement;
    }
}
