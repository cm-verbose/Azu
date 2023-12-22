import { ShortLanguageAnnotation, TranslationShape, TranslationInterface } from "../../types";

/**
 *
 * @description configurates automatic / manual translations
 *
 */

export default class Translations {
  editor: HTMLDivElement;
  formatBoldButton: HTMLButtonElement;
  formatItalicButton: HTMLButtonElement;
  formatUnderlineButton: HTMLButtonElement;
  formatStrikeButton: HTMLButtonElement;
  initialContentDiv: HTMLDivElement;
  titleInput: HTMLInputElement;
  settingsAccessibilityTitle: HTMLHeadingElement;
  settingsAppearanceTitle: HTMLHeadingElement;
  settingsDescription: HTMLParagraphElement;
  settingsInterfaceLanguage: HTMLHeadingElement;
  settingsThemesTitle: HTMLHeadingElement;
  settingsThemesDark: HTMLDivElement;
  settingsThemesLight: HTMLDivElement;
  settingsThemesSystem: HTMLDivElement;
  settingsThemesCustom: HTMLDivElement;
  settingsTitle: HTMLHeadingElement;
  languageSelection: HTMLSelectElement;

  documentNames: Set<string>;
  translations: TranslationShape;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.formatBoldButton = document.querySelector("#format-bold") as HTMLButtonElement;
    this.formatItalicButton = document.querySelector("#format-italics") as HTMLButtonElement;
    this.formatUnderlineButton = document.querySelector("#format-underline") as HTMLButtonElement;
    this.formatStrikeButton = document.querySelector("#format-strike") as HTMLButtonElement;
    this.settingsAccessibilityTitle = document.querySelector("[data-tr-acc]") as HTMLHeadingElement;
    this.settingsAppearanceTitle = document.querySelector("[data-tr-appearance]") as HTMLHeadingElement;
    this.settingsDescription = document.querySelector("[data-tr-description]") as HTMLParagraphElement;
    this.settingsInterfaceLanguage = document.querySelector("[data-tr-intl]") as HTMLHeadingElement;
    this.settingsThemesTitle = document.querySelector("[data-tr-themes]") as HTMLHeadingElement;
    this.settingsThemesDark = document.querySelector("[data-tr-th-dark]") as HTMLDivElement;
    this.settingsThemesLight = document.querySelector("[data-tr-th-light]") as HTMLDivElement;
    this.settingsThemesSystem = document.querySelector("[data-tr-th-sys]") as HTMLDivElement;
    this.settingsThemesCustom = document.querySelector("[data-tr-th-cus]") as HTMLDivElement;
    this.settingsTitle = document.querySelector("[data-tr-settings]") as HTMLHeadingElement;
    this.titleInput = document.querySelector("#title-input") as HTMLInputElement;
    this.initialContentDiv = document.querySelector("#initial-content") as HTMLDivElement;
    this.languageSelection = document.querySelector("#language-options") as HTMLSelectElement;

    this.documentNames = new Set();
    this.translations = {};
    this.instantiateTranslations();
  }

  /** @description instantiates events for translations */
  private instantiateTranslations() {
    (async () => {
      await this.fetchTranslations().then((json): void => {
        this.translations = json;
        Object.values(json).forEach((translation: unknown) => {
          const t = translation as TranslationInterface;
          this.documentNames.add(t.document_initial_title);
        });
      });

      /** this.translations and this.documentNames might not exist yet */
      this.instantiateLanguageSelection();
    })();
  }

  /** @description fetches the .json file containing all translations */
  private async fetchTranslations() {
    const response = await fetch("./json/translations.json");
    const translations = await response.json().catch((e) => {
      console.error(e);
    });
    return translations;
  }

  /** @description sets the interface language, to the specified value */
  private setInterfaceLanguage(language: ShortLanguageAnnotation) {
    if (Object.keys(this.translations).length === 0 || this.translations[language] === undefined) return;
    const translationobj = this.translations[language];
    this.titleInput.placeholder = translationobj.document_no_title_placeholder;

    if (this.documentNames.has(this.titleInput.value)) {
      this.titleInput.value = translationobj.document_initial_title;
      document.title = `Azu - ${translationobj.document_initial_title}`;
    }

    /* FIXME: This is very ugly but it works ¯\_(ツ)_/¯ */
    this.initialContentDiv.setAttribute("data-placeholder", translationobj.document_place_holder);
    this.formatBoldButton.children[0].innerHTML = translationobj.format_text_button.bold;
    this.formatItalicButton.children[0].innerHTML = translationobj.format_text_button.italic;
    this.formatUnderlineButton.children[0].innerHTML = translationobj.format_text_button.underline;
    this.formatStrikeButton.children[0].innerHTML = translationobj.format_text_button.strike;
    this.settingsTitle.textContent = translationobj.settings.title;
    this.settingsDescription.textContent = translationobj.settings.description;
    this.settingsAccessibilityTitle.textContent = translationobj.settings.accessibility.title;
    this.settingsInterfaceLanguage.textContent = translationobj.settings.accessibility.interface_language.title;
    this.settingsAppearanceTitle.textContent = translationobj.settings.appearance.title;
    this.settingsThemesTitle.textContent = translationobj.settings.appearance.theme_title;
    this.settingsThemesLight.textContent = translationobj.settings.appearance.themes.light;
    this.settingsThemesDark.textContent = translationobj.settings.appearance.themes.dark;
    ((this.settingsThemesSystem.querySelector("span") as HTMLSpanElement).childNodes[0] as Text) = 
      translationobj.settings.appearance.themes.system;
    this.settingsThemesCustom.textContent = translationobj.settings.appearance.themes.custom;
  }

  /** @description Allows for the user to change their language */
  private instantiateLanguageSelection() {
    this.languageSelection.addEventListener("change", () => {
      const selectedLang =
        this.languageSelection.children[this.languageSelection.selectedIndex].getAttribute("lang");

      if (selectedLang === null) return;
      this.editor.setAttribute("lang", "zh-hans");
      switch (selectedLang) {
        case "ja":
          {
            this.editor.setAttribute("lang", "ja");
          }
          break;

        case "zh-hant":
          {
            this.editor.setAttribute("lang", "zh-hant");
          }
          break;
      }

      document.body.setAttribute("lang", selectedLang);
      this.setInterfaceLanguage(selectedLang as unknown as ShortLanguageAnnotation);
    });
  }
}
