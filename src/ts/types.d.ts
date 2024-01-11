/** @description Represents possible options of a context menu */
enum ContextMenuOptionType {
  Copy,
  Cut,
  Paste,
  Refresh,
  SelectAll,
}

type ContextMenuOptionTypeString = NonNullable<Capitalize<keyof typeof ContextMenuOptionType>>;

/** @description Represent an error object */
interface ErrorObjectInterface {
  readonly term: string,
  readonly index: number, 
}

type ErrorObjectShape = NonNullable<ErrorObjectInterface>; 

/** @description Represents all fields of a statistics Object, used to display statistics */
interface StatisticsObjectInterface {
  readonly wordCount: NonNullable<number>;
  readonly wordAverageLength: NonNullable<number>;
  readonly wordLengthDistributionImage: URL | null;
}

type StatisticsObjectShape = NonNullable<StatisticsObjectInterface>;

/** @description Represents all available language options for text correction */
enum LanguageOptions {
  French,
}

type LanguageOptionString = NonNullable<Lowercase<keyof typeof LanguageOptions>>;

/** @decription Represent possible values for text alignment */
enum TextFormatOptions {
  Left,
  Center,
  Right,
  Justify,
}

type TextFormatOptionString = NonNullable<Lowercase<keyof typeof TextFormatOptions>>;

/** @description Represents short language code annotations */
enum ShortLanguageAnnotation {
  "de",
  "es",
  "en",
  "fr",
  "ja",
  "pt",
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
      theme_title: string;
      themes: {
        dark: string;
        light: string;
        system: string;
        custom: string;
      };
    };
  };
}

type TranslationShape = NonNullable<Record<ShortLanguageAnnotation, NonNullableTranslationInterface>>;
export {
  ContextMenuOptionTypeString,
  ErrorObjectShape, 
  LanguageOptionString,
  TextFormatOptionString,
  TranslationInterface,
  TranslationShape,
  ShortLanguageAnnotation,
  StatisticsObjectInterface,
};
