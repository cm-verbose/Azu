/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/modules/editor.ts":
/*!**********************************!*\
  !*** ./src/ts/modules/editor.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Editor)
/* harmony export */ });
/* harmony import */ var _functions_editor_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/editor_functions */ "./src/ts/modules/functions/editor_functions.ts");
/* harmony import */ var _functions_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/settings */ "./src/ts/modules/functions/settings.ts");
/* harmony import */ var _functions_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/storage */ "./src/ts/modules/functions/storage.ts");
/* harmony import */ var _functions_statistics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/statistics */ "./src/ts/modules/functions/statistics.ts");
/* harmony import */ var _functions_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functions/interface */ "./src/ts/modules/functions/interface.ts");
/* harmony import */ var _functions_text_correction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions/text_correction */ "./src/ts/modules/functions/text_correction.ts");
/* harmony import */ var _functions_document_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/document_styles */ "./src/ts/modules/functions/document_styles.ts");
/* harmony import */ var _functions_translations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/translations */ "./src/ts/modules/functions/translations.ts");
/* harmony import */ var _functions_context_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./functions/context_menu */ "./src/ts/modules/functions/context_menu.ts");









/**
 *
 * @description Reprensents the editor itself, instantiates functions under sub-classes
 *
 */
class Editor {
    constructor() {
        this.ini();
    }
    /** @description initializes the editor */
    ini() {
        new _functions_storage__WEBPACK_IMPORTED_MODULE_2__["default"]();
        new _functions_interface__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.setEvents();
    }
    /** @description Configures editor functions */
    setEvents() {
        new _functions_context_menu__WEBPACK_IMPORTED_MODULE_8__["default"]();
        new _functions_document_styles__WEBPACK_IMPORTED_MODULE_6__["default"]();
        new _functions_editor_functions__WEBPACK_IMPORTED_MODULE_0__["default"]();
        new _functions_settings__WEBPACK_IMPORTED_MODULE_1__["default"]();
        new _functions_statistics__WEBPACK_IMPORTED_MODULE_3__["default"]();
        new _functions_text_correction__WEBPACK_IMPORTED_MODULE_5__["default"]();
        new _functions_translations__WEBPACK_IMPORTED_MODULE_7__["default"]();
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/context_menu.ts":
/*!**************************************************!*\
  !*** ./src/ts/modules/functions/context_menu.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContextMenu)
/* harmony export */ });
/**
 *
 * @description Handles the custom context menu's logic
 *
 */
class ContextMenu {
    constructor() {
        this.contextMenu = document.querySelector("#context-menu");
        this.contextMenuOptions = document.querySelector("#context-menu-options");
        this.ctxCover = document.querySelector("#main-cover");
        this.editor = document.querySelector("#editor");
        this.instantiateContextMenu();
    }
    /** @description instantiates methods to manipulate the context menu */
    instantiateContextMenu() {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.populateOptions();
            this.ctxCover.style.display = "block";
            this.contextMenu.style.display = "block";
            this.handleOpenMenu({ x: e.clientX, y: e.clientY });
        });
        this.handleCloseMenu();
    }
    /** @description handles opening and positionning the menu, and adding events relative to opening the menu */
    handleOpenMenu(atMousePos) {
        const escMenuClose = (e) => {
            if (e.key !== "Escape")
                return;
            e.preventDefault();
            this.closeMenu();
            document.removeEventListener("keydown", escMenuClose);
        };
        document.addEventListener("keydown", escMenuClose);
        this.moveMenu(atMousePos.x, atMousePos.y);
    }
    /** @description move the menu to a specific position */
    moveMenu(x, y) {
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
    handleCloseMenu() {
        this.ctxCover.addEventListener("click", () => {
            this.closeMenu();
        });
    }
    closeMenu() {
        this.ctxCover.style.display = "none";
        this.contextMenu.style.display = "none";
    }
    /** @description Appends created options to the context menu */
    populateOptions() {
        this.contextMenuOptions.innerHTML = "";
        const options = ["Copy", "Cut", "Paste", "SelectAll", "Refresh"];
        options.forEach((option) => {
            switch (option) {
                case "Copy":
                    {
                        const selection = document.getSelection();
                        if (selection === null || selection.toString().replace(/\s+/g, "").length === 0)
                            return;
                    }
                    break;
                case "Cut": {
                    const selection = document.getSelection();
                    const activeElement = document.activeElement;
                    if (!activeElement || selection === null)
                        return;
                    if (selection.toString().replace(/\s+/g, "").length === 0)
                        return;
                    const element = this.createContextMenuOption(option, activeElement);
                    this.contextMenuOptions.appendChild(element);
                    return;
                }
                case "Paste":
                case "SelectAll": {
                    const selection = document.getSelection();
                    const activeElement = document.activeElement;
                    if (!activeElement ||
                        !selection ||
                        !["div", "input", "textarea"].includes(activeElement.tagName.toLowerCase()))
                        return;
                    if (selection.rangeCount <= 0)
                        return;
                    const element = this.createContextMenuOption(option, activeElement);
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
                        if ((selection === null || selection.toString().replace(/\s+/g, "").length !== 0) &&
                            document.activeElement === null)
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
    createContextMenuOption(optionType, activeElement) {
        const baseElement = document.createElement("li");
        let optionText = optionType;
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
                        if (selection === null)
                            return;
                        if ("clipboard" in navigator) {
                            // @ts-expect-error permissions
                            navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
                                if (!(result.state === "granted" || result.state === "prompt"))
                                    return;
                                navigator.clipboard.read().then((value) => {
                                    const firstType = value[0].types[0];
                                    value[0].getType(firstType).then((blob_t) => {
                                        const blob = blob_t;
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (!reader.result || !activeElement)
                                                return;
                                            this.handleAfterPaste(reader.result, firstType, activeElement);
                                            this.closeMenu();
                                        };
                                        reader.readAsText(blob);
                                    });
                                }, () => {
                                    console.error("Failed reading the clipboard");
                                });
                            });
                        }
                        else {
                            console.error("Please upgrade your browser. The clipboard API is not enabled in your browser");
                        }
                    });
                }
                break;
            case "SelectAll":
                {
                    optionText = "Select all";
                    baseElement.addEventListener("click", () => {
                        if (!activeElement)
                            return;
                        if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
                            const inputElement = activeElement;
                            inputElement.focus(); // inputs
                            inputElement.select();
                        }
                        else if (activeElement.tagName.toLowerCase() === "div") {
                            const selection = document.getSelection();
                            if (!selection)
                                return;
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
    handleCopy(mode, activeElement) {
        const selection = document.getSelection();
        if (selection === null || selection.toString().replace(/\s+/g, "").length === 0)
            return;
        const selectionText = selection.toString();
        const partsFragment = selection.getRangeAt(0).cloneContents();
        const fragmentChildNodes = partsFragment.childNodes;
        const copiedElement = document.createElement("div");
        for (let i = 0; i < fragmentChildNodes.length; i++) {
            const el = fragmentChildNodes.item(i);
            if (el.nodeType === Node.ELEMENT_NODE) {
                const element = el.cloneNode();
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
                    if (defStyles[property] === tempStyles[property])
                        continue;
                    const propertyName = property.replace(/([A-Z])/g, "-$1").toLowerCase();
                    CSSString += `${propertyName}:${tempStyles[property]};`;
                }
                const spanElement = document.createElement("span");
                spanElement.setAttribute("style", CSSString);
                spanElement.innerHTML = el.innerHTML;
                copiedElement.appendChild(spanElement);
                [def, temp].forEach((e) => e.remove());
            }
            else if (el.nodeType === Node.TEXT_NODE) {
                copiedElement.appendChild(el);
            }
        }
        if ("clipboard" in navigator) {
            // @ts-expect-error permissions
            navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
                if (!(result.state === "granted" || result.state === "prompt"))
                    return;
                if (copiedElement.children.length === 0) {
                    navigator.clipboard.writeText(selectionText).then(() => { }, // sucess (unused)
                    () => {
                        console.error("Failed copying text");
                    });
                }
                else {
                    const htmlContent = copiedElement;
                    const blob = new Blob([htmlContent.outerHTML], { type: "text/html; charset=utf-8" });
                    const clipboardItem = new ClipboardItem({ "text/html": blob });
                    navigator.clipboard.write([clipboardItem]).then(() => { }, // sucess (unused)
                    () => {
                        console.error("Failed copying content");
                    });
                }
            });
        }
        else {
            /* NOTE: This is deprecrated an only used as fallback */
            document.execCommand("copy");
        }
        if (mode === "cut" && activeElement) {
            if (["input", "textarea"].includes(activeElement.tagName.toLowerCase())) {
                const element = activeElement;
                const start = element.selectionStart;
                const end = element.selectionEnd;
                console.log(start, end);
                if (start === null || end === null)
                    return;
                const content = element.value;
                element.value = `${content.substring(0, start)}${content.substring(end)}`;
            }
            else if (activeElement.tagName.toLowerCase() === "div") {
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
    handleAfterPaste(value, type, lastActiveElement) {
        switch (type) {
            case "text/plain":
                {
                    const pasted = value.trim();
                    if (["input", "textarea"].includes(lastActiveElement.tagName.toLowerCase())) {
                        const input = lastActiveElement;
                        if (!input.selectionStart || !input.selectionEnd)
                            return;
                        input.setRangeText(pasted, input.selectionStart, input.selectionEnd);
                    }
                    else if (lastActiveElement.tagName.toLowerCase() === "div") {
                        const selection = window.getSelection();
                        if (!selection)
                            return;
                        if (selection.rangeCount !== 0) {
                            const range = selection.getRangeAt(0);
                            const textContent = document.createTextNode(value);
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
                    if (!selection)
                        return;
                    const range = selection.getRangeAt(0);
                    const node = document.createElement("div");
                    node.innerHTML = value.trim();
                    const element = node.firstChild;
                    if (element.nodeName.toLowerCase() === "img") {
                        const image = element;
                        if (!image)
                            return;
                        image.onload = () => {
                            if (!(image.naturalWidth > this.editor.getBoundingClientRect().width))
                                return;
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


/***/ }),

/***/ "./src/ts/modules/functions/document_styles.ts":
/*!*****************************************************!*\
  !*** ./src/ts/modules/functions/document_styles.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DocumentStyles)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @description Handles document styles, such as bold, italics, superscript, fonts,
 * text justification, etc.
 *
 */
class DocumentStyles {
    constructor() {
        this.fontFamilyJoiner = document.querySelector("#text-format-font");
        this.fontFamilyInput = document.querySelector("#format-font-family");
        this.fontFamilyDropdown = document.querySelector("#font-family-dropdown");
        this.editor = document.querySelector("#editor");
        this.boldButton = document.querySelector("#format-bold");
        this.italicButton = document.querySelector("#format-italics");
        this.justifyLeftButton = document.querySelector("#format-justify-left");
        this.justifyCenterButton = document.querySelector("#format-justify-center");
        this.justifyRightButton = document.querySelector("#format-justify-right");
        this.justifyEvenButton = document.querySelector("#format-justify-even");
        this.underlineButton = document.querySelector("#format-underline");
        this.strikeButtonButton = document.querySelector("#format-strike");
        this.supScriptButton = document.querySelector("#format-sup");
        this.subScriptButton = document.querySelector("#format-sub");
        this.instantiateDocumentStyles();
    }
    /** @description instantiates document styles */
    instantiateDocumentStyles() {
        this.instantiateTextStyles();
        this.instantiateTextJustification();
        this.instantiateDropdown();
    }
    /** @description Instantiate text styles (bold, italics, font...) */
    instantiateTextStyles() {
        /**
         * FIXME: THIS IS DEPECRECATED AND COULD STOP WORKING AT ANY MOMENT
         * TODO: THIS IS FEATURE DIFFERS FROM BROWSERS TO BROWSERS
         * */
        this.boldButton.addEventListener("click", () => {
            this.wrapElement(document.createElement("strong"));
        });
        this.italicButton.addEventListener("click", () => document.execCommand("italic", false));
        this.underlineButton.addEventListener("click", () => document.execCommand("underline", false));
        this.strikeButtonButton.addEventListener("click", () => document.execCommand("strikeThrough", false));
        this.supScriptButton.addEventListener("click", () => document.execCommand("superScript", false));
        this.subScriptButton.addEventListener("click", () => document.execCommand("subScript", false));
    }
    /** @description Sets events for text justification by the click of a button */
    instantiateTextJustification() {
        this.justifyCenterButton.addEventListener("click", this.justify("center"));
        this.justifyLeftButton.addEventListener("click", this.justify("left"));
        this.justifyRightButton.addEventListener("click", this.justify("right"));
        this.justifyEvenButton.addEventListener("click", this.justify("justify"));
    }
    /** @description Handles text justification events */
    justify(position) {
        return () => {
            const selection = window.getSelection();
            if (!selection)
                return;
            let parentNode = selection.focusNode;
            /* recursively traverse parents to find the ones that are paragraph leveled */
            if (parentNode && parentNode.parentElement !== this.editor) {
                while (parentNode !== null && parentNode.parentElement !== this.editor) {
                    parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentElement;
                }
            }
            if (parentNode === null)
                return;
            const paragraphNode = parentNode;
            if (selection.anchorNode === selection.focusNode) {
                paragraphNode.setAttribute("data-text-align", position);
            }
            else {
                let endNode = selection.anchorNode;
                if (endNode && endNode.parentElement !== this.editor) {
                    while (endNode !== null && endNode.parentElement !== this.editor) {
                        endNode = endNode === null || endNode === void 0 ? void 0 : endNode.parentElement;
                    }
                }
                if (!endNode)
                    return;
                const childEndPosition = Array.from(this.editor.children).indexOf(endNode);
                const childStartPosition = Array.from(this.editor.children).indexOf(paragraphNode);
                const positionSet = {
                    start: childStartPosition < childEndPosition ? childStartPosition : childEndPosition,
                    end: (childStartPosition < childEndPosition ? childEndPosition : childStartPosition) + 1,
                };
                for (let i = positionSet.start; i < positionSet.end; i++) {
                    if (!this.editor.children[i])
                        break;
                    this.editor.children[i].setAttribute("data-text-align", position);
                }
            }
        };
    }
    /**
     * @description a function used to replace the document.execCommand() element creation
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand | document.execCommand(); }
     */
    wrapElement(element) {
        // TODO: FIXME: 
        const selection = document.getSelection();
        if (!selection)
            return;
        const range = selection.getRangeAt(0);
        const childNodes = range.cloneContents().childNodes;
        const elements = [];
        for (const child of childNodes) {
            elements.push(child);
        }
        range.deleteContents();
        if (elements.length === 0)
            return;
        if (elements.length === 1) {
            console.log(element, elements);
            if (elements[0].parentElement && element.nodeType === elements[0].parentElement.nodeType) {
                console.log(elements[0].childNodes);
            }
            else {
                element.appendChild(elements[0]);
                range.insertNode(element);
                range.collapse(true);
                range.setStartAfter(element);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        console.log(elements, element);
    }
    /** @description Show dropdown indicating the font list under the font select menu */
    instantiateDropdown() {
        return __awaiter(this, void 0, void 0, function* () {
            const boundBox = this.fontFamilyJoiner.getBoundingClientRect();
            const dropdown = this.fontFamilyDropdown;
            dropdown.style.width = `${boundBox.width}px`;
            dropdown.style.height = `${boundBox.height}px`;
            dropdown.style.left = `${boundBox.left}px`;
            dropdown.style.top = `${boundBox.top + boundBox.height}px`;
            this.fontFamilyInput.addEventListener("focus", () => {
                dropdown.style.display = "block";
            });
            this.fontFamilyInput.addEventListener("blur", () => {
                dropdown.style.display = "none";
            });
        });
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/editor_functions.ts":
/*!******************************************************!*\
  !*** ./src/ts/modules/functions/editor_functions.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditorFunctions)
/* harmony export */ });
/**
 *
 * @description Configures events relative to the functions of the text editing
 * within the editor
 *
 **/
class EditorFunctions {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.formatFontSizeInput = document.querySelector("#format-font-size");
        this.initialDiv = document.querySelector("#initial-content");
        this.configureEditorFunctions();
    }
    configureEditorFunctions() {
        this.editor.addEventListener("blur", () => this.handleEmptyEditor());
        this.editor.addEventListener("paste", (e) => this.handlePaste(e));
        this.editor.addEventListener("beforeinput", (e) => this.handleEditorInput(e));
        this.formatFontSizeInput.addEventListener("keydown", (e) => this.enforeDigitOnly(e));
        this.formatFontSizeInput.addEventListener("click", () => this.handleInputFocus(this.formatFontSizeInput));
        this.editor.addEventListener("keydown", (e) => this.restrictInitialDiv(e));
    }
    /** @description Clears the editor when empty (remaining <div>, <br> elements) */
    handleEmptyEditor() {
        if (this.editor.innerText.replace(/\s+/g, "").length !== 0)
            return;
        this.initialDiv.innerHTML = "";
    }
    handleEditorInput(e) {
        switch (e.inputType) {
            case "insertParagraph":
                {
                    this.handleParagraphInsertion(e);
                }
                break;
        }
    }
    /** @description Overrides the default keydown event for a contenteditable <div> element */
    handleParagraphInsertion(e) {
        var _a;
        const selection = window.getSelection();
        const activeNode = (_a = selection.focusNode) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (activeNode === this.initialDiv) {
            e.preventDefault();
            const secondNode = document.createElement("div");
            secondNode.innerText = "\u200B";
            const align = this.initialDiv.getAttribute("data-text-align");
            const possibleAlignments = ["left", "center", "right", "justify"];
            if (align && possibleAlignments.includes(align)) {
                secondNode.setAttribute("data-text-align", align);
            }
            this.initialDiv.after(secondNode);
            setTimeout(() => {
                const range = new Range();
                range.setStart(secondNode, 0);
                range.setEnd(secondNode, 0);
                selection.removeAllRanges();
                selection.addRange(range);
            });
        }
    }
    /** @description Handles the paste event */
    handlePaste(e) {
        if (!e.clipboardData)
            return;
        const data = e.clipboardData;
        if (data.types.length === 0)
            return;
        const html = data.getData("text/html");
        const template = document.createElement("template");
        template.innerHTML = html;
        if (!template.content)
            return;
        const fragment = template.content;
        const elements = [];
        for (const node of fragment.childNodes) {
            if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
                elements.push(node);
            }
        }
        const selection = document.getSelection();
        if (!selection)
            return;
        const toBeAppendedFragment = document.createDocumentFragment();
        toBeAppendedFragment.append(...elements);
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(toBeAppendedFragment);
        // FIXME: This doesn't quite work + images
        range.setStartAfter(toBeAppendedFragment);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    /** @description Prevents the initial div from being deleted */
    restrictInitialDiv(e) {
        if (e.key !== "Backspace")
            return;
        if (this.initialDiv.innerText.replace(/\n|\s/g, "") === "") {
            const selection = window.getSelection();
            if (!selection)
                return;
            let parentNode = selection.anchorNode;
            /** recursively traverse elements until encountering the editor as a parent node */
            if (!(parentNode && parentNode.parentElement !== this.editor))
                return;
            while (parentNode !== null && parentNode.parentElement !== this.editor) {
                parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentElement;
            }
            if (parentNode !== this.initialDiv)
                return;
            e.preventDefault();
        }
    }
    /** @description Selects entire input content onfocus */
    handleInputFocus(inputElement) {
        inputElement.focus();
        inputElement.select();
    }
    /** @description Enforces digit only input or backspace for deletion */
    enforeDigitOnly(e) {
        if (!/Backspace|\d/g.test(e.key))
            e.preventDefault();
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/interface.ts":
/*!***********************************************!*\
  !*** ./src/ts/modules/functions/interface.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInterface)
/* harmony export */ });
/**
 *
 * @description Instantiates User Interface events
 *
 */
class UserInterface {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.titleInput = document.querySelector("#title-input");
        this.zoomRangeInput = document.querySelector("#zoom-range");
        this.zoomInput = document.querySelector("#zoom-control-input");
        /*
          localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated
          within the Storage class.
        */
        this.zoomCurr = parseInt(localStorage.getItem("zoomLevel"), 10) / 100;
        this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
        this.MAX_TITLE_LENGTH = 50;
        this.instantiateUIEvents();
    }
    /** @description instanciates a group of unrelated UIEvents */
    instantiateUIEvents() {
        document.title = "Azu - Document 1";
        this.titleInput.addEventListener("change", () => this.handleTitleInput());
        this.titleInput.addEventListener("blur", () => this.handleTitleBlur());
        this.instantiateZoom();
    }
    /**
     *
     * @description Handles window zoom through document scaling
     *
     **/
    /** @description instantiates the zoom function */
    instantiateZoom() {
        document.addEventListener("wheel", (e) => this.handleWheelZoom(e), { passive: false });
        document.addEventListener("keydown", (e) => this.handleKeyZoom(e));
        this.zoomRangeInput.addEventListener("input", (e) => this.handleRangeZoom(e));
        this.zoomInput.addEventListener("blur", () => this.handleInputZoom());
        this.zoomInput.addEventListener("click", () => this.handleInputFocus(this.zoomInput));
        this.zoomInput.addEventListener("keydown", (e) => this.enforeDigitOnly(e));
    }
    /** @description Zooms only the inner document portion onwheel */
    handleWheelZoom(e) {
        if (!e.ctrlKey)
            return;
        e.preventDefault();
        /* Different browsers usually have a different increment on zoom */
        const addedZoom = (e.deltaY * -1 < 0 ? -1 : 1) * 0.25;
        if (this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM ||
            this.zoomCurr + addedZoom < parseFloat(this.zoomRangeInput.min))
            return;
        this.zoomCurr += addedZoom;
        this.editor.style.scale = `${this.zoomCurr}`;
        this.zoomRangeInput.value = `${this.zoomCurr}`;
        this.zoomInput.value = `${Math.floor(parseFloat((this.zoomCurr * 100).toFixed(2)))}`;
    }
    /** @description Zooms only the inner document portion on `CTRL` + `+`, `CTRL` + `-` */
    handleKeyZoom(e) {
        if (!e.ctrlKey)
            return;
        const isZoomingIn = e.key === "+" || e.key === "=";
        if (["+", "-", "=", "_"].includes(e.key)) {
            e.preventDefault();
            const addedZoom = isZoomingIn ? 0.25 : -0.25;
            if (this.zoomCurr + addedZoom <= 0 || this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM)
                return;
            this.zoomCurr += addedZoom;
            this.editor.style.scale = `${this.zoomCurr}`;
            this.zoomRangeInput.value = `${this.zoomCurr}`;
            this.zoomInput.value = `${this.zoomCurr * 100}`;
        }
    }
    /** @description Handles the zoom with a slider (range input) */
    handleRangeZoom(e) {
        const target = e.target;
        const zoomValue = parseFloat(target.value);
        this.zoomInput.value = `${zoomValue * 100}`;
        this.editor.style.scale = `${zoomValue}`;
    }
    /** @description Handles the zoom through input */
    handleInputZoom() {
        let previousZoom = this.zoomCurr;
        const zoomAmount = parseInt(this.zoomInput.value, 10) / 100;
        const minZoom = parseFloat(this.zoomRangeInput.min);
        this.zoomCurr = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;
        if (this.zoomCurr < minZoom) {
            if (previousZoom < minZoom)
                previousZoom = 1;
            this.zoomInput.value = `${previousZoom * 100}`;
            this.editor.style.scale = `${previousZoom}`;
            return;
        }
        this.zoomInput.value = `${this.zoomCurr * 100}`;
        this.editor.style.scale = `${this.zoomCurr}`;
    }
    /** @description Selects entire input content onfocus */
    handleInputFocus(inputElement) {
        inputElement.focus();
        inputElement.select();
    }
    /** @description Enforces digit only input */
    enforeDigitOnly(e) {
        if (!/Backspace|\d/g.test(e.key))
            e.preventDefault();
    }
    /** @description If the title value is invalid, set the document title to "Unnamed" */
    handleTitleBlur() {
        const content = this.titleInput.value;
        if (content.replace(/\s*/g, "") !== "")
            return;
        this.titleInput.value = "Unnamed";
    }
    /** @description On title change, set document.title */
    handleTitleInput() {
        const title = this.titleInput.value;
        if (title.replace(/\s*/g, "") === "") {
            document.title = "Azu - Unnamed";
        }
        else {
            const ellidedString = title.length >= this.MAX_TITLE_LENGTH ? `${title.substring(0, this.MAX_TITLE_LENGTH - 3)}...` : title;
            document.title = `Azu - ${ellidedString}`;
        }
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/settings.ts":
/*!**********************************************!*\
  !*** ./src/ts/modules/functions/settings.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Settings)
/* harmony export */ });
/**
 *
 * @description Configures settings
 *
 */
class Settings {
    constructor() {
        this.mainView = document.querySelector("#app");
        this.settingsButton = document.querySelector("#setting-button");
        this.settingsView = document.querySelector("#settings-view");
        this.settingsCloseButton = document.querySelector("#close-settings");
        this.currentThemeContainer = document.querySelector("#current-system-scheme");
        this.themesGrid = document.querySelector("#settings-apprearance-themes");
        this.customThemeInput = document.querySelector("#custom-theme-file-input");
        this.instantiateSettings();
    }
    /** @description Initialises setting options */
    instantiateSettings() {
        this.setButtonEvents();
        this.instantiateThemeSelection();
    }
    /** @description sets events relative to opening and closing the settings view */
    setButtonEvents() {
        this.settingsButton.addEventListener("click", () => {
            this.mainView.style.display = "none";
            this.settingsView.style.display = "block";
            document.body.style.overflowY = "scroll";
        });
        this.settingsCloseButton.addEventListener("click", () => {
            this.settingsView.style.display = "none";
            this.mainView.style.display = "block";
            document.body.style.overflowY = "hidden";
        });
    }
    /** @description Instantiates events related to theme change*/
    instantiateThemeSelection() {
        for (const theme of this.themesGrid.children) {
            const themeContent = theme.getAttribute("id");
            if (themeContent !== "custom") {
                theme.addEventListener("click", () => {
                    document.body.setAttribute("class", themeContent);
                });
            }
            else {
                this.handleCustomThemeInput();
            }
        }
        const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const detectThemeChange = (e) => {
            this.currentThemeContainer.textContent = e.matches ? "dark" : "light";
        };
        this.currentThemeContainer.innerText = colorScheme.matches ? "dark" : "light";
        colorScheme.addEventListener("change", (e) => detectThemeChange(e));
    }
    /** @description Instantiates events for the custom styles input */
    handleCustomThemeInput() {
        this.customThemeInput.addEventListener("cancel", () => {
            console.log("Cancelled");
        });
        this.customThemeInput.addEventListener("change", () => {
            if (!this.customThemeInput.files || this.customThemeInput.files.length === 0)
                return;
            const file = this.customThemeInput.files[0];
            if (file.type !== "text/css")
                return; // not a CSS file
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                if (!e || !e.target)
                    return;
                const result = e.target.result;
                const customElementLink = document.querySelector("#CustomCSSThemeLink");
                if (customElementLink === null) {
                    const stylesElement = document.createElement("link");
                    stylesElement.rel = "stylesheet";
                    stylesElement.type = "text/css";
                    stylesElement.href = result;
                    stylesElement.id = "CustomCSSThemeLink";
                    document.head.appendChild(stylesElement);
                }
                else {
                    const styleElement = customElementLink;
                    styleElement.setAttribute("href", result);
                }
            });
            reader.readAsDataURL(file);
        });
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/statistics.ts":
/*!************************************************!*\
  !*** ./src/ts/modules/functions/statistics.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Statictics)
/* harmony export */ });
/**
 *
 * @description initialises events relative to word count, word length, mistakes,
 * or about the document itself
 *
 **/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Statictics {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.statisticsContainer = document.querySelector("#statistics-container");
        this.statisticsCover = document.querySelector("#close-statistics");
        this.statisticsView = document.querySelector("#statitics-view");
        this.wordCountContainer = document.querySelector("#word-count");
        this.COUNT_INTERVAL = 5000;
        this.initializeStatistics();
    }
    initializeStatistics() {
        this.wordCountContainer.addEventListener("click", () => this.openStatisticsView());
        this.statisticsCover.addEventListener("click", () => this.closeStatisticsView());
        this.configureWordCount();
    }
    /** @description Count words at an interval TODO: Fix count*/
    configureWordCount() {
        let timer = setTimeout(() => { });
        this.editor.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                queueMicrotask(() => {
                    const textContent = this.editor.innerText;
                    const textLength = textContent
                        .trim()
                        .split(/\s+/g)
                        .filter((x) => x !== "").length;
                    this.wordCountContainer.innerText = `${textLength === 0 ? "No" : textLength} word${textLength === 1 ? "" : "s"}`;
                });
            }, this.COUNT_INTERVAL);
        });
    }
    /** @description Opens a window related to statistics of the document */
    openStatisticsView() {
        this.statisticsView.style.display = "block";
        this.statisticsCover.style.display = "block";
        const content = this.editor.textContent;
        if (!content) {
            return; // TODO:
        }
        const text = content
            .replace(/\s+/g, " ")
            .trim()
            .replace(/\.|,|:|;|\(|\)|\[|\]/g, "");
        this.countWords(text).then((words) => {
            this.computeStatistics(words);
        });
    }
    /** @description Counts words asynchronously since some texts can be large */
    countWords(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const words = text.split(" ");
            return words;
        });
    }
    /** @description computes statistics */
    computeStatistics(words) {
        const wordCount = words.length;
        const averageWordLength = words.length === 0 ? 0 : words.join("").length / words.length;
        const longestTerm = words.reduce((a, b) => (a.length > b.length ? a : b));
        const distribution = [];
        const lengthArray = words.map((x) => x.length);
        for (let i = 1; i < longestTerm.length + 1; i++) {
            const filteredList = lengthArray.filter((x) => x === i);
            distribution.push({ [i]: filteredList.length });
        }
        const distributionImage = this.drawDistribution(distribution.filter((x) => Object.values(x)[0] !== 0), wordCount, { width: 1000, height: 500 });
        const statsObj = {
            wordCount: wordCount,
            wordAverageLength: parseFloat(averageWordLength.toFixed(2)),
            wordLengthDistributionImage: distributionImage,
        };
        this.displayStatistics(statsObj);
    }
    closeStatisticsView() {
        this.statisticsView.style.display = "none";
        this.statisticsCover.style.display = "none";
    }
    /** @description draws the distribution on a canvas element used for plotting */
    drawDistribution(distribution, distributionLength, dimensions) {
        if (distribution.length === 0)
            return null;
        const graph = document.createElement("canvas");
        const context = graph.getContext("2d");
        graph.width = dimensions.width;
        graph.height = dimensions.height;
        const lineWidth = graph.width * 0.9;
        const lineHeight = graph.height / 25;
        const lineX = (graph.width - lineWidth) / 2;
        const lineY = graph.height * 0.85 - lineHeight / 2;
        context.fillStyle = "#ccc";
        context.strokeStyle = context.fillStyle;
        context.fillRect(lineX, lineY, lineWidth, lineHeight);
        context.strokeRect(lineX, lineY, lineWidth, lineHeight);
        const barWidth = (lineWidth / distribution.length) * 0.8;
        const gap = barWidth - barWidth * 0.8;
        for (let i = 0; i < distribution.length; i++) {
            const item = distribution[i];
            const wordLength = parseInt(Object.keys(item)[0]);
            const barHeight = (Object.values(item)[0] / distributionLength) * (graph.height * 0.65);
            const barX = barWidth * i + gap * i + lineX;
            const barY = lineY - barHeight;
            const fontsize = barWidth / 3 > 64 ? 64 : barWidth / 3;
            context.font = `${fontsize}px sans-serif`;
            context.fillStyle = "#000000";
            context.fillText(wordLength.toString(), barX + barWidth / 2 - barWidth / 3 / 2, barY - 10);
            context.fillStyle = "#75E19A";
            context.fillRect(barX, barY, barWidth, barHeight);
        }
        return new URL(graph.toDataURL());
    }
    /** @description displays the statistics in a readable manner */
    displayStatistics(statisticsObject) {
        this.statisticsContainer.innerHTML = "";
        const statsFrag = document.createDocumentFragment();
        const statsList = document.createElement("ul");
        for (const entry of Object.entries(statisticsObject)) {
            switch (entry[0]) {
                case "wordCount":
                    {
                        const wordCount = entry[1];
                        const li = document.createElement("li");
                        li.innerText = `Number of words : ${wordCount}`;
                        statsList.appendChild(li);
                        console.log(wordCount);
                    }
                    break;
                case "wordAverageLength":
                    {
                        const averageWordLength = entry[1];
                        const li = document.createElement("li");
                        li.innerText = `Average word length : ${averageWordLength}`;
                        statsList.appendChild(li);
                        console.log(averageWordLength);
                    }
                    break;
                case "wordLengthDistributionImage":
                    {
                        if (entry[1] === null)
                            return;
                        const imageURL = entry[1];
                        const li = document.createElement("li");
                        const span = document.createElement("span");
                        span.innerText = "Word length distribution :";
                        li.appendChild(span);
                        const image = new Image(200);
                        image.src = imageURL.href;
                        li.appendChild(document.createElement("br"));
                        li.appendChild(image);
                        statsList.appendChild(li);
                    }
                    break;
            }
        }
        statsFrag.appendChild(statsList);
        this.statisticsContainer.append(statsFrag);
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/storage.ts":
/*!*********************************************!*\
  !*** ./src/ts/modules/functions/storage.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/**
 *
 * @description Manages the storage, stores some values such as previous session zoom
 *
 **/
class Storage {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.zoomRangeInput = document.querySelector("#zoom-range");
        this.zoomInput = document.querySelector("#zoom-control-input");
        this.zoomAmount = 1;
        this.instantiateStorage();
    }
    /** @description Instatiates all storage methods */
    instantiateStorage() {
        this.instantiateLocalStorage();
    }
    /** @description Instantiates localStorage */
    instantiateLocalStorage() {
        window.addEventListener("beforeunload", () => {
            const currentSettings = {
                theme: document.body.getAttribute("class"),
                lang: document.body.getAttribute("lang"),
            };
            localStorage.setItem("zoomLevel", this.zoomInput.value);
            localStorage.setItem("Settings", JSON.stringify(currentSettings));
        });
        document.addEventListener("DOMContentLoaded", () => {
            const zoomLevel = localStorage.getItem("zoomLevel");
            if (zoomLevel !== null) {
                this.zoomAmount = parseInt(zoomLevel, 10);
                this.zoomRangeInput.value = `${this.zoomAmount / 100}`;
                this.zoomInput.value = `${this.zoomAmount}`;
                this.editor.style.scale = `${this.zoomAmount / 100}`;
            }
            const fetchedSettings = localStorage.getItem("Settings");
            if (fetchedSettings === null)
                return;
            const settings = JSON.parse(fetchedSettings);
            for (const [key, value] of Object.entries(settings)) {
                switch (key) {
                    case "theme":
                        {
                            if (value === null)
                                return;
                            document.body.setAttribute("class", `${value}`);
                        }
                        break;
                    case "lang":
                        {
                            if (value === null)
                                return;
                            document.body.setAttribute("lang", `${value}`);
                        }
                        break;
                }
            }
        });
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/text_correction.ts":
/*!*****************************************************!*\
  !*** ./src/ts/modules/functions/text_correction.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextCorrection)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @description Implements text correction
 *
 */
class TextCorrection {
    constructor() {
        this.contextMenuOptions = document.querySelector("#context-menu-options");
        this.contextMenu = document.querySelector("#context-menu");
        this.contextMenuCover = document.querySelector("#main-cover");
        this.editor = document.querySelector("#editor");
        this.currentWordListLang = "";
        this.wordList = [];
        this.CORRECTION_INTERVAL = 500;
        this.initializeTextCorrection();
    }
    /** @description instantiates all methods related to text correction */
    initializeTextCorrection() {
        this.configureTextCorrection();
    }
    /** @description Attempts to find errors within the document */
    configureTextCorrection() {
        let timer = setTimeout(() => { });
        this.editor.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                queueMicrotask(() => __awaiter(this, void 0, void 0, function* () {
                    if (this.currentWordListLang === "" || this.wordList.length === 0) {
                        this.currentWordListLang = "french";
                        yield this.loadDictionnary("french").then((json) => {
                            this.setDictionnary(json);
                        });
                    }
                    this.verifyText();
                }));
            }, this.CORRECTION_INTERVAL);
        });
    }
    /** @description Loads a specified dictionnary */
    loadDictionnary(lang) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`./json/${lang}.json`);
            const dictionnary = yield response.json();
            return dictionnary;
        });
    }
    /** @description sets value this.wordList */
    setDictionnary(dictionnary) {
        this.wordList = dictionnary;
    }
    /** @description Finds errors in text */
    verifyText() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wordList.length === 0)
                return;
            let paraIndex = 0;
            for (const para of this.editor.children) {
                const textContent = para.textContent;
                /* Triming a placeholder \u200B, Zero-width space in order to remove it from tokens */
                if (textContent === null || textContent.replace(/\u200B/g, "").length === 0) {
                    paraIndex += 1;
                    continue;
                }
                yield this.scanText(para, paraIndex).then(() => {
                    paraIndex += 1;
                });
            }
        });
    }
    /** @description Scans text content for errors, then structures errors in an object */
    scanText(paragraph, paraIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const textContent = paragraph.textContent
                .trim()
                .replace(/\u200B/g, "")
                .replace(/\u00A0/g, "");
            const tokens = textContent.split(" ");
            const errorArray = [];
            switch (this.currentWordListLang) {
                case "french":
                    {
                        tokens.forEach((token) => {
                            const errorTerm = {
                                paraIndex: paraIndex,
                                nthOccurence: errorArray.filter((x) => x.term === token || x.paraIndex === paraIndex).length,
                                term: "",
                            };
                            const addTerm = (term) => {
                                Object.defineProperty(errorTerm, "term", {
                                    value: term,
                                    enumerable: true,
                                });
                                errorArray.push(errorTerm);
                            };
                            const word = token.includes("'") ? token.split("'") : token;
                            if (typeof word === "string") {
                                const strWord = word.replace(/[^\w\s]+/g, "");
                                /* exclude numbers, decimal numbers, exponential notation, imaginary forms */
                                if (strWord.match(/(-?\d+(.\d+)?((e|E)(\+|-)\d+)?i?)(?![a-zA-Z])/g))
                                    return;
                                if (this.wordList.includes(strWord.toLowerCase()) || strWord.replace(/\s+|\u200B/g, "") === "")
                                    return;
                                addTerm(strWord.trim());
                            }
                            else if (Array.isArray(word)) {
                                /* case for terms composed by elision such as "c'est" or "presqu'île" */
                                word.forEach((part, index) => {
                                    const p = part.replace(/[^\w\s]+/g, "");
                                    if (index === 0) {
                                        /*  "c'est" is broken into "c" and "est", but "c" is not a valid term, but by elision, "ce" is */
                                        if (this.wordList.includes((p + "e").toLowerCase()))
                                            return;
                                        addTerm((p + "e").trim());
                                    }
                                    else if (!this.wordList.includes(p.toLowerCase())) {
                                        addTerm(p.trim());
                                    }
                                });
                            }
                        });
                        if (errorArray.length === 0)
                            return;
                        this.markIncorrectTerm(errorArray);
                    }
                    break;
            }
        });
    }
    /** FIXME: Revert user cursor position on edit */
    /** @description marks incorrect terms within the DOM, and suggestions along with it */
    markIncorrectTerm(errorArray) {
        // \u200C, \uFEFF
        errorArray.forEach((err) => {
            const paragraph = this.editor.children[err.paraIndex];
            const termRegex = new RegExp(`\\b(${err.term})\\b`, "g");
            if (!paragraph.textContent)
                return;
            paragraph.textContent = paragraph.textContent.replace(termRegex, "\uFEFF$1\u200C");
        });
        this.editor.innerHTML = this.editor.innerHTML.replace(/\uFEFF(.*?)\u200C/g, "<span data-temp-err>$1</span>");
        const errorNodes = document.querySelectorAll("[data-temp-err]");
        for (const error of errorNodes) {
            const span = document.createElement("span");
            span.innerHTML = error.innerHTML;
            span.setAttribute("class", "error");
            error.replaceWith(span);
        }
        /* looping again since looping paragraph by paragraph only preserves the last paragraph's events */
        const errors = document.getElementsByClassName("error");
        for (const error of errors) {
            error.addEventListener("contextmenu", (e) => this.showSuggestions(e));
            this.observeErrorChange(error);
        }
    }
    /** @description Shows suggestions using the Levensthein distance algorithm */
    showSuggestions(e) {
        const span = e.target;
        const term = span.textContent;
        if (!term || term.length === 0)
            return;
        let filteredList = [];
        if (term.length <= 3) {
            filteredList = this.wordList.filter((x) => x.startsWith(term) && x.length < term.length + 2);
        }
        else {
            filteredList = this.wordList.filter((x) => x.startsWith(term.slice(0, 3)));
        }
        const accumulator = [];
        for (const word of filteredList) {
            const editDistance = this.computeLevenstheinDistance(word, term.toLowerCase());
            accumulator.push({ word: word, edit: editDistance });
        }
        const suggestions = accumulator
            .sort((a, b) => a.edit - b.edit)
            .reverse()
            .slice(0, 3);
        /* TODO: Wait for contextMenuOptions's children as they might not exist */
        setTimeout(() => {
            const errorMessage = document.createElement("li");
            const suggestionFragment = document.createDocumentFragment();
            errorMessage.setAttribute("id", "correction-error-option");
            const languageDescriptor = document.createElement("h1");
            const capitalizedLang = this.currentWordListLang[0].toLocaleUpperCase() + this.currentWordListLang.slice(1);
            languageDescriptor.innerHTML = capitalizedLang;
            suggestionFragment.appendChild(languageDescriptor);
            const suggestionMessage = document.createElement("p");
            if (suggestions.length === 0) {
                suggestionMessage.innerHTML = `No suggestions for term "${term}"`;
                suggestionFragment.appendChild(suggestionMessage);
            }
            else {
                const ism = `The spelling for the term "${term}" seems incorrect, here are some suggestions :`;
                suggestionMessage.innerHTML = ism;
                const suggestionsUL = document.createElement("ul");
                suggestions.forEach((suggestion) => {
                    const suggestionLi = document.createElement("li");
                    suggestionLi.textContent = suggestion.word;
                    suggestionLi.addEventListener("click", () => {
                        const textNode = document.createTextNode(suggestion.word);
                        span.replaceWith(textNode);
                        this.contextMenu.style.display = "none";
                        this.contextMenuCover.style.display = "none";
                    });
                    suggestionsUL.appendChild(suggestionLi);
                });
                suggestionFragment.appendChild(suggestionMessage);
                suggestionFragment.appendChild(suggestionsUL);
            }
            errorMessage.appendChild(suggestionFragment);
            const firstChild = this.contextMenuOptions.firstElementChild;
            const errorJoiner = document.createDocumentFragment();
            errorJoiner.append(errorMessage, document.createElement("hr"));
            this.contextMenuOptions.insertBefore(errorJoiner, firstChild);
        });
    }
    /** @description Changes the content of the error element if the updated text is valid */
    observeErrorChange(error) {
        const options = {
            childList: true,
            characterData: true,
            characterDataOldValue: true,
            subtree: true,
        };
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const textContent = mutation.target.textContent;
                if (mutation.type !== "characterData" || !textContent)
                    return;
                if (this.wordList.includes(textContent)) {
                    const text = document.createTextNode(textContent);
                    error.replaceWith(text);
                }
            }
        });
        observer.observe(error, options);
    }
    /**
     * @description computes Levensthein distance
     * @see https://rosettacode.org/wiki/Levenshtein_distance#TypeScript
     */
    computeLevenstheinDistance(first, second) {
        const m = first.length, n = second.length;
        let t = [...Array(n + 1).keys()], u = [];
        for (let i = 0; i < m; i++) {
            u = [i + 1];
            for (let j = 0; j < n; j++) {
                u[j + 1] = first[i] === second[j] ? t[j] : Math.min(t[j], t[j + 1], u[j]) + 1;
            }
            t = u;
        }
        return 1 - u[n] / Math.max(m, n);
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/translations.ts":
/*!**************************************************!*\
  !*** ./src/ts/modules/functions/translations.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Translations)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @description configurates automatic / manual translations
 *
 */
class Translations {
    constructor() {
        this.editor = document.querySelector("#editor");
        this.formatBoldButton = document.querySelector("#format-bold");
        this.formatItalicButton = document.querySelector("#format-italics");
        this.formatUnderlineButton = document.querySelector("#format-underline");
        this.formatStrikeButton = document.querySelector("#format-strike");
        this.settingsAccessibilityTitle = document.querySelector("[data-tr-acc]");
        this.settingsAppearanceTitle = document.querySelector("[data-tr-appearance]");
        this.settingsDescription = document.querySelector("[data-tr-description]");
        this.settingsInterfaceLanguage = document.querySelector("[data-tr-intl]");
        this.settingsThemesTitle = document.querySelector("[data-tr-themes]");
        this.settingsThemesDark = document.querySelector("[data-tr-th-dark]");
        this.settingsThemesLight = document.querySelector("[data-tr-th-light]");
        this.settingsThemesSystem = document.querySelector("[data-tr-th-sys]");
        this.settingsThemesCustom = document.querySelector("[data-tr-th-cus]");
        this.settingsTitle = document.querySelector("[data-tr-settings]");
        this.titleInput = document.querySelector("#title-input");
        this.initialContentDiv = document.querySelector("#initial-content");
        this.languageSelection = document.querySelector("#language-options");
        this.documentNames = new Set();
        this.translations = {};
        this.instantiateTranslations();
    }
    /** @description instantiates events for translations */
    instantiateTranslations() {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.fetchTranslations().then((json) => {
                this.translations = json;
                Object.values(json).forEach((translation) => {
                    const t = translation;
                    this.documentNames.add(t.document_initial_title);
                });
            });
            /** this.translations and this.documentNames might not exist yet */
            this.instantiateLanguageSelection();
        }))();
    }
    /** @description fetches the .json file containing all translations */
    fetchTranslations() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("./json/translations.json");
            const translations = yield response.json().catch((e) => {
                console.error(e);
            });
            return translations;
        });
    }
    /** @description sets the interface language, to the specified value */
    setInterfaceLanguage(language) {
        if (Object.keys(this.translations).length === 0 || this.translations[language] === undefined)
            return;
        const translationobj = this.translations[language];
        this.titleInput.placeholder = translationobj.document_no_title_placeholder;
        if (this.documentNames.has(this.titleInput.value)) {
            this.titleInput.value = translationobj.document_initial_title;
            document.title = `Azu - ${translationobj.document_initial_title}`;
        }
        /* FIXME: This is very ugly but it works ¯\_(ツ)_/¯ */
        this.initialContentDiv.setAttribute("data-placeholder", translationobj.document_place_holder);
        this.formatBoldButton.children[0].innerHTML = translationobj.format_text_button.bold;
        this.formatItalicButton.children[0].innerHTML = translationobj.format_text_button.italic;
        this.formatUnderlineButton.children[0].innerHTML = translationobj.format_text_button.underline;
        this.formatStrikeButton.children[0].innerHTML = translationobj.format_text_button.strike;
        this.settingsTitle.textContent = translationobj.settings.title;
        this.settingsDescription.textContent = translationobj.settings.description;
        this.settingsAccessibilityTitle.textContent = translationobj.settings.accessibility.title;
        this.settingsInterfaceLanguage.textContent = translationobj.settings.accessibility.interface_language.title;
        this.settingsAppearanceTitle.textContent = translationobj.settings.appearance.title;
        this.settingsThemesTitle.textContent = translationobj.settings.appearance.theme_title;
        this.settingsThemesLight.textContent = translationobj.settings.appearance.themes.light;
        this.settingsThemesDark.textContent = translationobj.settings.appearance.themes.dark;
        this.settingsThemesSystem.querySelector("span").childNodes[0] =
            translationobj.settings.appearance.themes.system;
        this.settingsThemesCustom.textContent = translationobj.settings.appearance.themes.custom;
    }
    /** @description Allows for the user to change their language */
    instantiateLanguageSelection() {
        this.languageSelection.addEventListener("change", () => {
            const selectedLang = this.languageSelection.children[this.languageSelection.selectedIndex].getAttribute("lang");
            if (selectedLang === null)
                return;
            this.editor.setAttribute("lang", "zh-hans");
            switch (selectedLang) {
                case "ja":
                    {
                        this.editor.setAttribute("lang", "ja");
                    }
                    break;
                case "zh-hant":
                    {
                        this.editor.setAttribute("lang", "zh-hant");
                    }
                    break;
            }
            document.body.setAttribute("lang", selectedLang);
            this.setInterfaceLanguage(selectedLang);
        });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/ts/script.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/editor */ "./src/ts/modules/editor.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Main {
    constructor() {
        this.ini();
    }
    /** @description Initializes the App */
    ini() {
        this.instantiateServiceWorker();
        new _modules_editor__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    /** @description instantiates a Service worker */
    instantiateServiceWorker() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!("serviceWorker" in navigator)) {
                console.error("[Service worker] : Service worker not available, please upgrade your browser.");
                return;
            }
            yield navigator.serviceWorker.register("./sw.js", {
                scope: "./src/",
            });
        });
    }
}
new Main();

})();

/******/ })()
;
//# sourceMappingURL=script.js.map