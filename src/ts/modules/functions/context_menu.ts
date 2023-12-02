/**
 *
 * @description Handles the a custom context menu
 *
 */

export default class ContextMenu {
  contextMenu: HTMLDivElement;
  ctxCover: HTMLDivElement;

  constructor() {
    this.contextMenu = document.querySelector("#context-menu") as HTMLDivElement;
    this.ctxCover = document.querySelector("#main-cover") as HTMLDivElement;
    this.instantiateContextMenu();
  }

  /** @description instantiates methods to manipulate the context menu */
  private instantiateContextMenu() {
    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      if (document.activeElement) {
        const activeElement = document.activeElement as HTMLElement;
        activeElement.blur();
      }
      this.ctxCover.style.display = "block";
      this.contextMenu.style.display = "block";
      this.moveMenu(e.clientX, e.clientY);
    });

    this.handleCloseMenu();
  }

  /** @description move the menu to a specific position */
  private moveMenu(x: number, y: number) {
    this.contextMenu.style.left = `${x}px`;
    this.contextMenu.style.top = `${y}px`;
  }

  /** Closes the menu on exit of the cover */
  private handleCloseMenu() {
    this.ctxCover.addEventListener("click", () => {
      this.ctxCover.style.display = "none";
      this.contextMenu.style.display = "none";
    });
  }
}
