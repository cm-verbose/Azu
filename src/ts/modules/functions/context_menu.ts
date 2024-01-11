import { ContextMenuOptionTypeString } from "../../types";

/**
 *
 * @description Handles the custom context menu's logic
 *
 */

export default class ContextMenu {
  editor: HTMLDivElement;
  contextMenu: HTMLDivElement;
  contextMenuOptions: HTMLUListElement;
  ctxCover: HTMLDivElement;

  constructor() {
    this.contextMenu = document.querySelector("#context-menu") as HTMLDivElement;
    this.contextMenuOptions = document.querySelector("#context-menu-options") as HTMLUListElement;
    this.ctxCover = document.querySelector("#main-cover") as HTMLDivElement;
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.instantiateContextMenu();
  }

  /** @description instantiates methods to manipulate the context menu */
  private instantiateContextMenu() {
    document.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      this.populateOptions();
      this.ctxCover.style.display = "block";
      this.contextMenu.style.display = "block";
      this.handleOpenMenu({ x: e.clientX, y: e.clientY });
    });

    this.handleCloseMenu();
  }

  /** @description handles opening and positionning the menu, and adding events relative to opening the menu */
  private handleOpenMenu(atMousePos: { x: number; y: number }) {
    const escMenuClose = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      this.closeMenu();
      document.removeEventListener("keydown", escMenuClose);
    };
    document.addEventListener("keydown", escMenuClose);
    setTimeout(() => {
      this.moveMenu(atMousePos.x, atMousePos.y);
    }); 
  }

  /** @description move the menu to a specific position */
  private moveMenu(x: number, y: number) {
    const boundingBox = this.contextMenu.getBoundingClientRect();
    if (x + boundingBox.width > window.innerWidth) {
      x = window.innerWidth - boundingBox.width;
    }

    if (y + boundingBox.height > window.innerHeight) {
      y = window.innerHeight - boundingBox.height;
    }

    this.contextMenu.style.left = `${x}px`;
    this.contextMenu.style.top = `${y}px`;
  }

  /** Closes the menu on exit of the cover */
  private handleCloseMenu() {
    this.ctxCover.addEventListener("click", () => {
      this.closeMenu();
    });
  }

  private closeMenu() {
    this.ctxCover.style.display = "none";
    this.contextMenu.style.display = "none";
  }

  /** @description Appends created options to the context menu */
  private populateOptions() {
    this.contextMenuOptions.innerHTML = "";
    const options: ContextMenuOptionTypeString[] = ["Copy", "Cut", "Paste", "SelectAll", "Refresh"];
    options.forEach((option) => {
      switch (option) {
        case "Copy":
          {
            const selection = document.getSelection();
            if (selection === null || selection.toString().replace(/\s+/g, "").length === 0) return;
          }
          break;

        case "Cut": {
          const selection = document.getSelection();
          const activeElement = document.activeElement;

          if (
            !activeElement ||
            selection === null ||
            (activeElement !== this.editor && activeElement.tagName !== "INPUT")
          )
            return;
          if (selection.toString().replace(/\s+/g, "").length === 0) return;
          const element = this.createContextMenuOption(option, activeElement as HTMLElement);
          this.contextMenuOptions.appendChild(element);
          return;
        }

        case "Paste":
        case "SelectAll": {
          const selection = document.getSelection();
          const activeElement = document.activeElement;
          if (
            !activeElement ||
            !selection ||
            !["div", "input", "textarea"].includes(activeElement.tagName.toLowerCase())
          )
            return;
          if (selection.rangeCount <= 0) return;
          const element = this.createContextMenuOption(option, activeElement as HTMLElement);
          this.contextMenuOptions.appendChild(element);
          return;
        }

        case "Refresh":
          {
            /* 
            We don't want to provide a reload page option when editing text, since it would 
            make accidentally reloading annoying 
          */
            const selection = document.getSelection();
            if (
              (selection === null || selection.toString().replace(/\s+/g, "").length !== 0) &&
              document.activeElement === null
            )
              return;

            if (this.contextMenuOptions.children.length !== 0) {
              this.contextMenuOptions.appendChild(document.createElement("hr"));
            }
          }
          break;
      }
      const element = this.createContextMenuOption(option);
      this.contextMenuOptions.appendChild(element);
    });
  }

  /** @description Creates the context menu options */
  private createContextMenuOption(
    optionType: ContextMenuOptionTypeString,
    activeElement?: HTMLElement
  ): HTMLLIElement {
    const baseElement = document.createElement("li");
    let optionText: string = optionType;
    switch (optionType) {
      case "Copy":
        {
          baseElement.addEventListener("click", () => {
            this.handleCopy();
          });
        }
        break;

      case "Cut":
        {
          baseElement.addEventListener("click", () => {
            this.handleCopy("cut", activeElement);
          });
        }
        break;

      case "Paste":
        {
          baseElement.addEventListener("click", () => {
            const selection = document.getSelection();
            if (selection === null) return;

            if ("clipboard" in navigator) {
              // @ts-expect-error permissions
              navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
                if (!(result.state === "granted" || result.state === "prompt")) return;

                navigator.clipboard.read().then(
                  (value) => {
                    const firstType: string = value[0].types[0];
                    value[0].getType(firstType).then((blob_t) => {
                      const blob = blob_t;
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (!reader.result || !activeElement) return;
                        this.handleAfterPaste(reader.result, firstType, activeElement);
                        this.closeMenu();
                      };
                      reader.readAsText(blob);
                    });
                  },
                  () => {
                    console.error("Failed reading the clipboard");
                  }
                );
              });
            } else {
              console.error("Please upgrade your browser. The clipboard API is not enabled in your browser");
            }
          });
        }
        break;

      case "SelectAll":
        {
          optionText = "Select all";
          baseElement.addEventListener("click", () => {
            if (!activeElement) return;
            if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
              const inputElement = activeElement as HTMLInputElement | HTMLTextAreaElement;
              inputElement.focus(); // inputs
              inputElement.select();
            } else if (activeElement.tagName.toLowerCase() === "div") {
              const selection = document.getSelection();
              if (!selection) return;
              const range = document.createRange();
              range.selectNodeContents(this.editor);
              selection.removeAllRanges();
              selection.addRange(range);
            }
            this.closeMenu();
          });
        }
        break;

      case "Refresh":
        {
          optionText = "Refresh page";
          baseElement.addEventListener("click", () => {
            window.location.reload();
          });
          // No need to close the menu, the page has refreshed
        }
        break;
    }
    const path = `./svg/op_${optionType.replace(/(?!^)([A-Z])/g, "_$1").toLowerCase()}.svg`;
    const image = document.createElement("img");
    image.src = path;

    baseElement.appendChild(image);

    const span = document.createElement("span");
    span.innerText = optionText;

    baseElement.appendChild(span);
    return baseElement;
  }

  private handleCopy(mode?: string | null, activeElement?: HTMLElement) {
    const selection = document.getSelection();

    if (selection === null || selection.toString().replace(/\s+/g, "").length === 0) return;
    const selectionText = selection.toString();

    const partsFragment = selection.getRangeAt(0).cloneContents();
    const fragmentChildNodes = partsFragment.childNodes;
    const copiedElement = document.createElement("div");

    for (let i = 0; i < fragmentChildNodes.length; i++) {
      const el = fragmentChildNodes.item(i);

      if (el.nodeType === Node.ELEMENT_NODE) {
        const element = (el as HTMLElement).cloneNode();

        const def = document.createElement("div");
        const temp = document.createElement("div");
        def.style.fontFamily = "Times";
        def.textContent = "";

        temp.appendChild(element);
        document.body.append(temp, def);

        const defStyles = window.getComputedStyle(def);
        const tempStyles = window.getComputedStyle(temp.children[0]);
        let CSSString = "";

        for (const property in tempStyles) {
          if (defStyles[property] === tempStyles[property]) continue;
          const propertyName = property.replace(/([A-Z])/g, "-$1").toLowerCase();
          CSSString += `${propertyName}:${tempStyles[property]};`;
        }
        const spanElement = document.createElement("span");
        spanElement.setAttribute("style", CSSString);
        spanElement.innerHTML = (el as HTMLElement).innerHTML;
        copiedElement.appendChild(spanElement);

        [def, temp].forEach((e) => e.remove());
      } else if (el.nodeType === Node.TEXT_NODE) {
        copiedElement.appendChild(el);
      }
    }

    if ("clipboard" in navigator) {
      // @ts-expect-error permissions
      navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (!(result.state === "granted" || result.state === "prompt")) return;
        if (copiedElement.children.length === 0) {
          navigator.clipboard.writeText(selectionText).then(
            () => {}, // sucess (unused)
            () => {
              console.error("Failed copying text");
            }
          );
        } else {
          const htmlContent = copiedElement;
          const blob = new Blob([htmlContent.outerHTML], { type: "text/html; charset=utf-8" });
          const clipboardItem = new ClipboardItem({ "text/html": blob });

          navigator.clipboard.write([clipboardItem]).then(
            () => {}, // sucess (unused)
            () => {
              console.error("Failed copying content");
            }
          );
        }
      });
    } else {
      /* NOTE: This is deprecrated an only used as fallback */
      document.execCommand("copy");
    }

    if (mode === "cut" && activeElement) {
      if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
        const element = activeElement as HTMLInputElement | HTMLTextAreaElement;
        const start = element.selectionStart;
        const end = element.selectionEnd;

        console.log(start, end);
        if (start === null || end === null) return;
        const content = element.value;

        element.value = `${content.substring(0, start)}${content.substring(end)}`;
      } else if (activeElement.tagName.toLowerCase() === "div") {
        const selection = document.getSelection();
        if (!selection) {
          this.closeMenu();
          return;
        }
        const range = selection.getRangeAt(0);
        range.deleteContents();
      }
    }
    this.closeMenu();
  }

  /** @description Handles after paste event */
  private handleAfterPaste(
    value: NonNullable<string | ArrayBuffer>,
    type: string,
    lastActiveElement: HTMLElement
  ) {
    switch (type) {
      case "text/plain":
        {
          const pasted = (value as string).trim();
          if (["input", "textarea"].includes(lastActiveElement.tagName.toLowerCase())) {
            const input = lastActiveElement as HTMLInputElement | HTMLTextAreaElement;
            if (!input.selectionStart || !input.selectionEnd) return;
            input.setRangeText(pasted, input.selectionStart, input.selectionEnd);
          } else if (lastActiveElement.tagName.toLowerCase() === "div") {
            const selection = window.getSelection();
            if (!selection) return;
            if (selection.rangeCount !== 0) {
              const range = selection.getRangeAt(0);
              const textContent = document.createTextNode(value as string);
              range.deleteContents();
              range.insertNode(textContent);
              range.setStart(textContent, textContent.length);
              range.collapse(true);
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
        break;

      case "text/html":
        {
          const selection = window.getSelection();
          if (!selection) return;
          const range = selection.getRangeAt(0);
          const node = document.createElement("div");
          node.innerHTML = (value as string).trim();

          const element = node.firstChild as ChildNode;
          if (element.nodeName.toLowerCase() === "img") {
            const image = element as HTMLImageElement;
            if (!image) return;
            image.onload = () => {
              if (!(image.naturalWidth > this.editor.getBoundingClientRect().width)) return;
              image.width = this.editor.getBoundingClientRect().width;
            };
          }

          range.deleteContents();
          range.insertNode(element);
          range.setStartAfter(element);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        break;
    }
  }
}
