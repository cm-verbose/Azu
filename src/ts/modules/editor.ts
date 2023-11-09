import EditorFunctions from "./functions/editor_functions.js";
import Settings from "./functions/settings.js";
import Storage from "./functions/storage.js";
import Statictics from "./functions/statistics.js";
import UserInterface from "./functions/interface.js";
import TextCorrection from "./functions/text_correction.js";

/**
 *
 * @description Reprensents the editor itself, instantiates functions under sub-classes
 *
 */

export default class Editor {
  constructor() {
    this.ini();
  }

  /** @description initializes the editor */
  public ini() {
    new Storage();
    new UserInterface();
    this.setEvents();
  }

  /** @description Configures editor functions */
  private setEvents() {
    new EditorFunctions();
    new Settings(); 
    new Statictics();
    new TextCorrection();
  }
}
