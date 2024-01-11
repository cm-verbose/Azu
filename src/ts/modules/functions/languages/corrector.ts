/**
 *
 * @description serves to extend other correctors
 *
 */

import { ErrorObjectShape, LanguageOptionString } from "../../../types";

export default abstract class Corrector {
  lang: LanguageOptionString | "";
  numberRegex: RegExp;
  constructor() {
    this.lang = "";
    this.numberRegex =
      /(^(?![a-zA-Z]))(((-?\d+(\.\d+)?((e)(\+|-)\d+)?i?)(?![a-zA-Z]))|0x([a-fA-F]|\d)+|0b(0|1)+|0o[0-7]+)(?=\b)/gi;
  }

  public correct(text: string, index: number): Array<ErrorObjectShape> {
    return [{ term: text, index: index }];
  }
}
