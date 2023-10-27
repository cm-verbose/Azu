/** @description Represents all available language options for text correction */
enum languageOptions {
  french,
}

type languageOptionStrings = keyof typeof languageOptions;
export { languageOptionStrings };
