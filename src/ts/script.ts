import Editor from "./modules/editor.js";

class Main {
  titleInput: HTMLInputElement;
  constructor() {
    this.titleInput = document.querySelector("#title-input") as HTMLInputElement;
    this.ini();
  }

  /** @description Initializes the class */
  private ini() {
    this.setInitialDocumentTitle();
    this.titleInput.addEventListener("input", () => this.handleTitleInput());
    this.titleInput.addEventListener("blur", () => this.handleTitleBlur());
    new Editor();
  }

  /** @description Handles page title change based on input */
  handleTitleInput() {
    const content: string = this.titleInput.value;
    if (content.replace(/\s*/g, "") === "") {
      document.title = "azu - Unnamed";
    } else {
      const MAX_TITLE_LENGTH = 50;
      const ellidedString: string =
        content.length >= MAX_TITLE_LENGTH ? `${content.substring(0, MAX_TITLE_LENGTH - 3)}...` : content;
      document.title = `azu - ${ellidedString}`;
    }
  }

  /** @description Sets page value  */
  handleTitleBlur() {
    const content: string = this.titleInput.value;
    if (content.replace(/\s*/g, "") !== "") return;
    this.titleInput.value = "Unnamed";
  }

  /** @description Handle initial page content  */
  setInitialDocumentTitle() {
    document.title = "azu - Document 1";
  }
}

new Main();
