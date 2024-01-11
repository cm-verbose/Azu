/**
 *
 * @description corrects French text
 *
 */

import { ErrorObjectShape, LanguageOptionString } from "../../../types";
import Corrector from "./corrector";

export class FrenchCorrector extends Corrector {
  dictionnary: string[];
  lang: LanguageOptionString;

  constructor(dictionnary: string[]) {
    super();
    (this.lang = "french"), (this.dictionnary = dictionnary);
  }

  /** @description corrects mistakes */
  public correct(text: string, index: number) {
    const content = this.cleanContent(text);
    if (content.replace(/\s+|\u200B/g, "").length === 0) return [];
    return this.correctOrthography(content, index);
  }

  /** @description cleans the content */
  private cleanContent(text: string): string {
    const cleaned = text.replace(/\u00A0/g, " ").trim();
    return cleaned;
  }

  /** @description checks the ortography of a sequence of words */
  private correctOrthography(content: string, index: number): Array<ErrorObjectShape> {
    const punctuationRegex = /!|\.|\(|\)|\[|\]|\$|;|:|&|\*|@|\{|\}|"|'|<|>|\+|-/g;
    const words: Array<string> = content.replace(punctuationRegex, "").split(" ");
    const errors: Array<{ term: string; index: number }> = [];

    for (const word of words) {
      const numberRegex = this.numberRegex;
      if (word.match(numberRegex)) continue;

      if (word.includes("'")) {
        const apostrophes = word.match(/"'"/g);
        if (apostrophes && apostrophes.length >= 2) {
          errors.push({ term: word, index: index });
        }
      } else if (word.match(/([a-zA-Z]|é|à|è|ù|â|ê|î|ô|û|ë|ï|ü|ç)+/gi)) {
        if (this.dictionnary.includes(word.toLocaleLowerCase())) continue;
        errors.push({ term: word, index: index });
      } else {
        if (word.replace(/\s+/g, "").length === 0) continue;
        errors.push({ term: word, index: index });
      }
    }
    return errors;
  }
}
