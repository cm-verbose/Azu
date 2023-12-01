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
 * @description configurates automatic translations
 *
 */
export default class Translations {
    constructor() {
        this.formatBoldButton = document.querySelector("#format-bold");
        this.formatItalicButton = document.querySelector("#format-italics");
        this.formatUnderlineButton = document.querySelector("#format-underline");
        this.formatStrikeButton = document.querySelector("#format-strike");
        this.titleInput = document.querySelector("#title-input");
        this.initialContentDiv = document.querySelector("#initial-content");
        this.languageSelection = document.querySelector("#language-options");
        this.translations = {};
        this.instantiateTranslations();
    }
    /** @description instantiates events for translations */
    instantiateTranslations() {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchTranslations().then((json) => {
                this.translations = json;
            });
        }))();
        this.instantiateLanguageSelection();
    }
    /** @description sets the interface language, to the specified value */
    setInterfaceLanguage(language) {
        if (Object.keys(this.translations).length === 0 || this.translations[language] === undefined)
            return;
        const translationobj = this.translations[language];
        this.titleInput.placeholder = translationobj.document_no_title_placeholder;
        if (this.titleInput.value === "Document 1") {
            this.titleInput.value = translationobj.document_initial_title;
        }
        this.initialContentDiv.setAttribute("data-placeholder", translationobj.document_place_holder);
        this.formatBoldButton.children[0].innerHTML = translationobj.format_text_button.bold;
        this.formatItalicButton.children[0].innerHTML = translationobj.format_text_button.italic;
        this.formatUnderlineButton.children[0].innerHTML = translationobj.format_text_button.underline;
        this.formatStrikeButton.children[0].innerHTML = translationobj.format_text_button.strike;
    }
    /** @description fetches the .json file containing all translations */
    fetchTranslations() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("./json/translations.json");
            const translations = yield response.json();
            return translations;
        });
    }
    /** @description Allows for the user to change their language */
    instantiateLanguageSelection() {
        this.languageSelection.addEventListener("change", () => {
            const selectedLang = this.languageSelection.children[this.languageSelection.selectedIndex].getAttribute("lang");
            if (selectedLang === null)
                return;
            this.setInterfaceLanguage(selectedLang);
        });
    }
}
