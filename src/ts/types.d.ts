/** @description Represents all available language options for text correction */
enum LanguageOptions {
  French,
}

type LanguageOptionString = Lowercase<NonNullable<keyof typeof LanguageOptions>>;

/** @description Represents an error within the text and additional information*/
interface TextMistakeInterface {
  readonly paraIndex: number;
  readonly nth: number;
  readonly term: string;
}

type TextMistake = NonNullable<TextMistakeInterface>;
export { LanguageOptionString, TextMistake };
