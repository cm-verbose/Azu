/**
 *
 * @description Handles the a custom context menu
 *
 */
export default class ContextMenu {
    constructor() {
        this.contextMenu = document.querySelector("#context-menu");
        this.ctxCover = document.querySelector("#main-cover");
        this.instantiateContextMenu();
    }
    /** @description instantiates methods to manipulate the context menu */
    instantiateContextMenu() {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (document.activeElement) {
                const activeElement = document.activeElement;
                activeElement.blur();
            }
            this.ctxCover.style.display = "block";
            this.contextMenu.style.display = "block";
            this.moveMenu(e.clientX, e.clientY);
        });
        this.handleCloseMenu();
    }
    /** @description move the menu to a specific position */
    moveMenu(x, y) {
        this.contextMenu.style.left = `${x}px`;
        this.contextMenu.style.top = `${y}px`;
    }
    /** Closes the menu on exit of the cover */
    handleCloseMenu() {
        this.ctxCover.addEventListener("click", () => {
            this.ctxCover.style.display = "none";
            this.contextMenu.style.display = "none";
        });
    }
}
