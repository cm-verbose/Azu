import EditorFunctions from "./functions/editor_functions";
import Settings from "./functions/settings";
import Storage from "./functions/storage";
import Statictics from "./functions/statistics";
import UserInterface from "./functions/interface";
import TextCorrection from "./functions/text_correction";
import DocumentStyles from "./functions/document_styles";
import Translations from "./functions/translations";
import ContextMenu from "./functions/context_menu";

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
    new ContextMenu();
    new DocumentStyles();
    new EditorFunctions();
    new Settings();
    new Statictics();
    new TextCorrection();
    new Translations();
  }
}
