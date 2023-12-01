/** @description Represents all available language options for text correction */
enum LanguageOptions {
  French,
}

type LanguageOptionString = Lowercase<NonNullable<keyof typeof LanguageOptions>>;

/** @description Represents an error within the text and additional information */
interface TextMistakeInterface {
  readonly paraIndex: number;
  readonly nthOccurence: number;
  readonly term: string;
}

type TextMistake = NonNullable<TextMistakeInterface>;

/** @decription Represent possible values for text alignment */
enum TextFormatOptions {
  Left,
  Center,
  Right,
  Justify,
}

type TextFormatOptionString = Lowercase<NonNullable<keyof typeof TextFormatOptions>>;

/** @description Represents short language code annotations */
enum ShortLanguageAnnotation {
  "fr",
  "en",
  "ja",
  "zh-hans",
  "zh-hant",
}

/** @description Represents the shape of a translation */
interface TranslationInterface {
  format_text_button: {
    bold: string;
    italic: string;
    underline: string;
    strike: string;
  };
  document_initial_title: string;
  document_no_title_placeholder: string; 
  document_place_holder: string;
  settings: {
    title: string;
    description: string;
    accessibility: {
      title: string;
      interface_language: {
        title: string;
      };
    };
    appearance: {
      title: string;
      themes: {
        dark: string;
        light: string;
        system: string;
        custom: string;
      };
    };
  };
}

type TranlsationShape = Record<ShortLanguageAnnotation, TranslationInterface>;
export {
  LanguageOptionString,
  TextMistake,
  TextFormatOptionString,
  TranslationInterface,
  TranlsationShape,
  ShortLanguageAnnotation,
};
