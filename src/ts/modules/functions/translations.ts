import { ShortLanguageAnnotation, TranlsationShape } from "../../types";

/**
 *
 * @description configurates automatic translations
 *
 */

export default class Translations {
  formatBoldButton: HTMLButtonElement;
  formatItalicButton: HTMLButtonElement;
  formatUnderlineButton: HTMLButtonElement;
  formatStrikeButton: HTMLButtonElement;
  initialContentDiv: HTMLDivElement;
  titleInput: HTMLInputElement;
  languageSelection: HTMLSelectElement;

  translations: TranlsationShape;

  constructor() {
    this.formatBoldButton = document.querySelector("#format-bold") as HTMLButtonElement;
    this.formatItalicButton = document.querySelector("#format-italics") as HTMLButtonElement;
    this.formatUnderlineButton = document.querySelector("#format-underline") as HTMLButtonElement;
    this.formatStrikeButton = document.querySelector("#format-strike") as HTMLButtonElement;
    this.titleInput = document.querySelector("#title-input") as HTMLInputElement;
    this.initialContentDiv = document.querySelector("#initial-content") as HTMLDivElement;
    this.languageSelection = document.querySelector("#language-options") as HTMLSelectElement;
    this.translations = {};
    this.instantiateTranslations();
  }

  /** @description instantiates events for translations */
  private instantiateTranslations() {
    (async () => {
      await this.fetchTranslations().then((json) => {
        this.translations = json;
      });
    })();
    this.instantiateLanguageSelection();
  }

  /** @description sets the interface language, to the specified value */
  private setInterfaceLanguage(language: ShortLanguageAnnotation) {
    if (Object.keys(this.translations).length === 0 || this.translations[language] === undefined) return;
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
  private async fetchTranslations() {
    const response = await fetch("./json/translations.json");
    const translations = await response.json();
    return translations;
  }

  /** @description Allows for the user to change their language */
  private instantiateLanguageSelection() {
    this.languageSelection.addEventListener("change", () => {
      const selectedLang =
        this.languageSelection.children[this.languageSelection.selectedIndex].getAttribute("lang");
      if (selectedLang === null) return;
      this.setInterfaceLanguage(selectedLang as unknown as ShortLanguageAnnotation);
    });
  }
}
