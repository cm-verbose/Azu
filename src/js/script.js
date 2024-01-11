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
/* harmony import */ var _functions_import_export__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/import_export */ "./src/ts/modules/functions/import_export.ts");










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
        new _functions_import_export__WEBPACK_IMPORTED_MODULE_9__["default"]();
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
        setTimeout(() => {
            this.moveMenu(atMousePos.x, atMousePos.y);
        });
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
                    if (!activeElement ||
                        selection === null ||
                        (activeElement !== this.editor && activeElement.tagName !== "INPUT"))
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
        this.imageUploadButton = document.querySelector("#format-upload-button");
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
         * */
        this.boldButton.addEventListener("click", () => document.execCommand("bold", false));
        this.italicButton.addEventListener("click", () => document.execCommand("italic", false));
        this.underlineButton.addEventListener("click", () => document.execCommand("underline", false));
        this.strikeButtonButton.addEventListener("click", () => document.execCommand("strikeThrough", false));
        this.supScriptButton.addEventListener("click", () => document.execCommand("superScript", false));
        this.subScriptButton.addEventListener("click", () => document.execCommand("subScript", false));
        this.instantiateUploadImage();
    }
    /** @description Sets events for text justification by the click of a button */
    instantiateTextJustification() {
        this.justifyCenterButton.addEventListener("click", this.justify("center"));
        this.justifyLeftButton.addEventListener("click", this.justify("left"));
        this.justifyRightButton.addEventListener("click", this.justify("right"));
        this.justifyEvenButton.addEventListener("click", this.justify("justify"));
    }
    /** @description Uploads an image to the document at cursor position */
    instantiateUploadImage() {
        this.imageUploadButton.onclick = () => {
            this.handleImageUpload();
        };
    }
    /** @description Handles the uploaded images */
    handleImageUpload() {
        const selection = document.getSelection();
        if (!selection)
            return;
        const range = selection.getRangeAt(0);
        const uploadInput = document.createElement("input");
        uploadInput.setAttribute("type", "file");
        uploadInput.setAttribute("accept", "image/*");
        uploadInput.setAttribute("multiple", "");
        uploadInput.addEventListener("change", (e) => {
            const fileList = e.target.files;
            if (!fileList)
                return;
            const imageList = [];
            this.readURLS(fileList).then((srcList) => {
                for (const src of srcList) {
                    const image = new Image();
                    image.src = src;
                    imageList.push(image);
                }
                if (range.commonAncestorContainer !== this.editor && !this.editor.contains(range.commonAncestorContainer))
                    return;
                range.deleteContents();
                for (const image of imageList) {
                    if (image.naturalWidth >= this.editor.getBoundingClientRect().width) {
                        image.width = this.editor.getBoundingClientRect().width;
                    }
                    range.insertNode(image);
                    range.setEndBefore(image);
                }
                uploadInput.remove();
            });
        });
        uploadInput.style.display = "none";
        document.body.appendChild(uploadInput);
        uploadInput.click();
    }
    /** @description reads images src urls then returns them */
    readURLS(fileList) {
        return __awaiter(this, void 0, void 0, function* () {
            const srcList = [];
            const promises = [];
            /*
              Why we are doing it this way is because reader.onload is asynchronous
              without supporting .then() or any operation that would make the value
              usable synchronously
            */
            for (const file of fileList) {
                const reader = new FileReader();
                const promise = new Promise((resolve, reject) => {
                    reader.onload = () => {
                        if (!reader.result)
                            return;
                        srcList.push(reader.result);
                        resolve();
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                promises.push(promise);
            }
            yield Promise.all(promises);
            return srcList;
        });
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
     * @description a function used to replace the document.execCommand() element creation, as
     * behaviour varies between browsers, normalizing this function can lead to more consistent behaviour
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand | document.execCommand(); }
     */
    wrapElement(element) {
        const selection = document.getSelection();
        if (!selection)
            return;
        const range = selection.getRangeAt(0);
        const children = range.extractContents();
        if (children.childNodes.length === 0)
            return;
        console.log(element);
        // TODO:
    }
    /** @description matches all subchildren of a certain type */
    matchAllSubChildren(root) {
        const result = [];
        for (const node of this.traverseChildren(root)) {
            if (node.nodeName === root.nodeName) {
                result.push(node);
            }
        }
        return result;
    }
    /** @description traverses children of a node */
    *traverseChildren(element) {
        if (!element)
            return;
        yield element;
        for (const node of element.childNodes) {
            yield* this.traverseChildren(node);
        }
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
        if (!(this.editor.childNodes.length === 1 && this.editor.childNodes[0].nodeType === Node.TEXT_NODE))
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

/***/ "./src/ts/modules/functions/import_export.ts":
/*!***************************************************!*\
  !*** ./src/ts/modules/functions/import_export.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportExport)
/* harmony export */ });
/**
 *
 * @description Handles file imports / exports.
 *
 */
class ImportExport {
    constructor() {
        this.closeViewsBackground = document.querySelector("#close-import-export-view");
        this.editor = document.querySelector("#editor");
        this.exportButton = document.querySelector("#export-button");
        this.importButton = document.querySelector("#import-button");
        this.exportView = document.querySelector("#export-document-view");
        this.importView = document.querySelector("#import-document-view");
        this.importDragZone = document.querySelector("#import-drag-zone");
        this.instantiateImportExport();
    }
    instantiateImportExport() {
        this.handleViews();
        this.handleImports();
    }
    handleImports() {
        this.importDragZone.addEventListener("click", () => this.handleDocumentImport());
    }
    handleDocumentImport() {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.style.display = "none";
        fileInput.addEventListener("change", (e) => this.handleUpload(e));
        document.body.appendChild(fileInput);
        fileInput.click();
    }
    /** @description handles the uploaded files */
    handleUpload(e) {
        const target = e.target;
        const files = target.files;
        if (!files || files.length !== 1)
            return;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            if (!reader.result || content.length === 0)
                return;
            console.log(file.type);
            this.importContent(content, file.type);
        };
        reader.readAsText(file);
    }
    /** @description imports the content from a file type to  */
    importContent(content, type) {
        if (this.editor.textContent) {
            const textContent = this.editor.textContent;
            if (textContent.replace(/\s+/g, "").length !== 0) {
                console.log("empty");
            }
        }
        switch (type) {
            /* no extension is interpreted as an alias of "text/plain" */
            case "":
            case "text/plain":
                {
                    if (content.replace(/\s+/g, ""))
                        return; // TODO: Better indications for the document being empty
                }
                break;
            default:
                {
                    const span = this.importDragZone.querySelector("span");
                    const oldContent = span.textContent;
                    span.textContent = `File type, ${type} not supported`;
                    setTimeout(() => {
                        span.textContent = oldContent;
                    }, 2000);
                }
                break;
        }
    }
    handleViews() {
        this.exportButton.addEventListener("click", () => this.handleExport());
        this.importButton.addEventListener("click", () => this.handleImport());
        this.closeViewsBackground.addEventListener("click", () => this.closeViews());
    }
    /** @description exports the current document as a file */
    handleExport() {
        this.exportButton.addEventListener("click", () => {
            this.exportView.style.display = "block";
            this.closeViewsBackground.style.display = "block";
        });
    }
    /** @description imports content to the current document */
    handleImport() {
        this.importButton.addEventListener("click", () => {
            this.importView.style.display = "block";
            this.closeViewsBackground.style.display = "block";
        });
    }
    closeViews() {
        this.closeViewsBackground.style.display = "none";
        this.exportView.style.display = "none";
        this.importView.style.display = "none";
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
        this.MAX_ALLOWED_ZOOM = parseFloat(this.zoomRangeInput.max);
        this.MIN_ALLOWED_ZOOM = parseFloat(this.zoomRangeInput.min); // TODO:
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
        if (this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM || this.zoomCurr + addedZoom < this.MIN_ALLOWED_ZOOM)
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
        this.zoomCurr = zoomAmount >= this.MAX_ALLOWED_ZOOM ? this.MAX_ALLOWED_ZOOM : zoomAmount;
        if (this.zoomCurr < this.MIN_ALLOWED_ZOOM) {
            if (previousZoom < this.MIN_ALLOWED_ZOOM)
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
        if (!/Backspace|\d/g.test(e.code))
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

/***/ "./src/ts/modules/functions/languages/corrector.ts":
/*!*********************************************************!*\
  !*** ./src/ts/modules/functions/languages/corrector.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Corrector)
/* harmony export */ });
/**
 *
 * @description serves to extend other correctors
 *
 */
class Corrector {
    constructor() {
        this.lang = "";
        this.numberRegex =
            /(^(?![a-zA-Z]))(((-?\d+(\.\d+)?((e)(\+|-)\d+)?i?)(?![a-zA-Z]))|0x([a-fA-F]|\d)+|0b(0|1)+|0o[0-7]+)(?=\b)/gi;
    }
    correct(text, index) {
        return [{ term: text, index: index }];
    }
}


/***/ }),

/***/ "./src/ts/modules/functions/languages/french.ts":
/*!******************************************************!*\
  !*** ./src/ts/modules/functions/languages/french.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FrenchCorrector: () => (/* binding */ FrenchCorrector)
/* harmony export */ });
/* harmony import */ var _corrector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./corrector */ "./src/ts/modules/functions/languages/corrector.ts");
/**
 *
 * @description corrects French text
 *
 */

class FrenchCorrector extends _corrector__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(dictionnary) {
        super();
        (this.lang = "french"), (this.dictionnary = dictionnary);
    }
    /** @description corrects mistakes */
    correct(text, index) {
        const content = this.cleanContent(text);
        if (content.replace(/\s+|\u200B/g, "").length === 0)
            return [];
        return this.correctOrthography(content, index);
    }
    /** @description cleans the content */
    cleanContent(text) {
        const cleaned = text.replace(/\u00A0/g, " ").trim();
        return cleaned;
    }
    /** @description checks the ortography of a sequence of words */
    correctOrthography(content, index) {
        const punctuationRegex = /!|\.|\(|\)|\[|\]|\$|;|:|&|\*|@|\{|\}|"|'|<|>|\+|-/g;
        const words = content.replace(punctuationRegex, "").split(" ");
        const errors = [];
        for (const word of words) {
            const numberRegex = this.numberRegex;
            if (word.match(numberRegex))
                continue;
            if (word.includes("'")) {
                const apostrophes = word.match(/"'"/g);
                if (apostrophes && apostrophes.length >= 2) {
                    errors.push({ term: word, index: index });
                }
            }
            else if (word.match(/([a-zA-Z]|é|à|è|ù|â|ê|î|ô|û|ë|ï|ü|ç)+/gi)) {
                if (this.dictionnary.includes(word.toLocaleLowerCase()))
                    continue;
                errors.push({ term: word, index: index });
            }
            else {
                if (word.replace(/\s+/g, "").length === 0)
                    continue;
                errors.push({ term: word, index: index });
            }
        }
        return errors;
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
        this.appView = document.querySelector("#app");
        this.closeSettingsButton = document.querySelector("#close-settings-button");
        this.openSettingsButton = document.querySelector("#setting-button");
        this.settingsView = document.querySelector("#settings-view");
        this.themeSelectContainer = document.querySelector("#theme-option-select-ul");
        this.initialise_settings();
    }
    initialise_settings() {
        this.iniChangeView();
    }
    /** @description instantiates events relating to opening and closing the settings*/
    iniChangeView() {
        this.openSettingsButton.addEventListener("click", () => this.setSettingView("open"));
        this.closeSettingsButton.addEventListener("click", () => this.setSettingView("close"));
        this.instantiateThemeSelect();
    }
    /** @description opens or closes the settings view */
    setSettingView(state) {
        this.appView.style.display = state === "open" ? "none" : "block";
        this.settingsView.style.display = state === "open" ? "block" : "none";
    }
    /** @description Changes the current theme of the document based on the user option */
    instantiateThemeSelect() {
        for (let i = 0; i < this.themeSelectContainer.childElementCount; i++) {
            const children = this.themeSelectContainer.children.item(i);
            if (["light-theme-option", "dark-theme-option", "system-theme-option"].includes(children.id)) {
                children.addEventListener("click", () => {
                    const activeThemeLabel = "active-theme";
                    if (document.querySelector(`.${activeThemeLabel}`) !== null) {
                        const element = this.themeSelectContainer.querySelector(`.${activeThemeLabel}`);
                        element.classList.remove(activeThemeLabel);
                    }
                    children.classList.add(activeThemeLabel);
                    document.body.setAttribute("class", children.id.replace("-theme-option", ""));
                });
            }
        }
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
    /** @description Count words at an interval */
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
            return;
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
        this.themeSelectContainer = document.querySelector("#theme-option-select-ul");
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
            if (zoomLevel !== null && !Number.isNaN(parseInt(zoomLevel, 10))) {
                this.zoomAmount = parseInt(zoomLevel, 10);
                this.zoomRangeInput.value = `${this.zoomAmount / 100}`;
                this.zoomInput.value = `${this.zoomAmount}`;
                this.editor.style.scale = `${this.zoomAmount / 100}`;
            }
            else {
                this.editor.style.scale = "1";
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
                            const themeSelectLi = this.themeSelectContainer.querySelector(`#${value}-theme-option`);
                            if (document.querySelector(".active-theme") === null) {
                                themeSelectLi.classList.add("active-theme");
                            }
                            else {
                                const activeElement = document.querySelector(".active-theme");
                                if (!activeElement)
                                    return;
                                activeElement.classList.remove("active-theme");
                                themeSelectLi.classList.add("active-theme");
                            }
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
/* harmony import */ var _languages_french__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languages/french */ "./src/ts/modules/functions/languages/french.ts");
/**
 *
 * @description Implements text correction
 *
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class TextCorrection {
    constructor() {
        this.contextMenu = document.querySelector("#context-menu");
        this.contextMenuOptions = document.querySelector("#context-menu-options");
        this.contextMenuOverlay = document.querySelector("#main-cover");
        this.editor = document.querySelector("#editor");
        /* Internal states */
        this.currentLanguage = "";
        this.currentCorrector = null;
        this.wordSet = [];
        this.TEXT_CORRECTION_INTERVAL = 1000;
        this.iniTextCorrection();
    }
    iniTextCorrection() {
        let timer = setTimeout(() => { });
        this.editor.addEventListener("input", () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                const language = "french";
                this.scanText(language);
            }, this.TEXT_CORRECTION_INTERVAL);
        });
    }
    /** @description loads a specified dictionnary, containing words in the specified language */
    loadDictionnary(language) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`./json/${language}.json`);
            const dictionnary = (yield response.json());
            this.currentLanguage = language;
            this.wordSet = dictionnary;
        });
    }
    /** @description scan text to find words */
    scanText(language) {
        if (this.wordSet.length === 0 || this.currentLanguage !== language) {
            this.loadDictionnary(language).then(() => {
                this.identifyParagraphs(language);
            });
        }
        else {
            this.identifyParagraphs(language);
        }
    }
    /** @description identify the paragraphs to correct */
    identifyParagraphs(lang) {
        let i = 0;
        for (const el of this.editor.children) {
            const paragraph = el;
            if (paragraph.textContent === "" || paragraph.textContent === null) {
                i += 1;
                continue;
            }
            this.correctText({ content: paragraph.textContent, paragraphIndex: i }, lang);
            i += 1;
        }
    }
    /** @description corrects text based on current language */
    correctText(contentValue, language) {
        let tokens = [];
        if (this.currentCorrector === null || this.currentCorrector.lang !== language) {
            switch (this.currentLanguage) {
                case "french":
                    {
                        this.currentCorrector = new _languages_french__WEBPACK_IMPORTED_MODULE_0__.FrenchCorrector(this.wordSet);
                    }
                    break;
            }
        }
        tokens = this.currentCorrector.correct(contentValue.content, contentValue.paragraphIndex);
        if (tokens.length === 0)
            return;
        this.markIncorrect(tokens);
    }
    /** @description marks text inccorrect in the editor */
    markIncorrect(tokens) {
        /*
          FIXME: Part of a detected erred word can appear as an error
          within any word that contains a substring matching that word
          for example: have and ve, ve is erred, but the "ve" part of
          "have" is highlighted (when "ve" is written last ?)
        */
        const rangeSet = [];
        for (const token of tokens) {
            const node = this.editor.children[token.index];
            const textNodes = this.filterTextNodesUnder(node);
            const unifiedText = textNodes.map((x) => x.textContent).join("\uFFFF");
            if (token.term.replace(/\s+/g, "").length === 0)
                continue;
            const termRegex = new RegExp(`\\b${token.term.split("").join("\uFFFF?")}\\b`, "g");
            const match = unifiedText.match(termRegex);
            if (!match || match.length === 0)
                continue;
            const delimitations = [];
            let separators = this.getIndicesOf("\uFFFF", unifiedText);
            if (!separators || separators.length === 0)
                separators = [];
            if (match.length === 1) {
                let temp = "";
                const startIndex = unifiedText.indexOf(match[0]);
                for (let i = startIndex; i < unifiedText.length; i++) {
                    temp += unifiedText[i];
                    if (temp.match(termRegex))
                        break;
                }
                const endIndex = startIndex + temp.length;
                delimitations.push({ start: startIndex, end: endIndex });
            }
            else {
                for (const m of match) {
                    const indices = this.getIndicesOf(m, unifiedText);
                    if (!indices)
                        continue;
                    for (const index of indices) {
                        let temp = "";
                        for (let i = index; i < unifiedText.length; i++) {
                            temp += unifiedText[i];
                            if (temp.match(termRegex))
                                break;
                        }
                        const endIndex = index + temp.length;
                        delimitations.push({ start: index, end: endIndex });
                    }
                }
            }
            /* Remove duplicated objects (identical keys and values) */
            const delimitationsSet = [...new Set(delimitations.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));
            for (const delimitation of delimitationsSet) {
                const ps = separators.filter((x) => x <= delimitation.start); // separators passed (start)
                const pn = separators.filter((x) => x < delimitation.end); // separators passed (end)
                const startingNodeIndex = ps.length;
                const endingNodeIndex = pn.length;
                let startOffset, endOffset = 0;
                if (ps.length !== 0) {
                    startOffset = delimitation.start - ps[ps.length - 1] - 1;
                }
                else {
                    startOffset = delimitation.start;
                }
                if (pn.length !== 0) {
                    endOffset = delimitation.end - pn[pn.length - 1] - 1;
                }
                else {
                    endOffset = delimitation.end;
                }
                const range = new Range();
                range.setStart(textNodes[startingNodeIndex], startOffset);
                range.setEnd(textNodes[endingNodeIndex], endOffset);
                rangeSet.push(range);
            }
        }
        this.createErrorElements(rangeSet);
    }
    /** @description creates the error elements from the provided ranges */
    createErrorElements(rangeArray) {
        /* FIXME: Maintain user cursor position within a erred span */
        for (const range of rangeArray) {
            const contents = range.extractContents().childNodes;
            if (contents.length === 0)
                continue;
            const spanElement = this.createErrorSpan();
            for (let i = 0; i < contents.length; i++) {
                const child = contents.item(i);
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const element = child;
                    if (element.textContent === "")
                        element.remove();
                }
            }
            spanElement.append(...contents);
            range.insertNode(spanElement);
        }
        this.cleanUpDeeplyNested();
    }
    /**
     * @description removes nth time nested terms and adds a MutationObserver
     * to see changes, after replacing nested elements
     */
    cleanUpDeeplyNested() {
        const errorElements = document.getElementsByClassName("error");
        if (errorElements.length === 0)
            return;
        for (const error of errorElements) {
            if (error.querySelector(".error")) {
                const nodes = this.selectAllMatching(".error", error);
                const span = this.createErrorSpan();
                span.append(...nodes[nodes.length - 1].childNodes);
                error.replaceWith(span);
            }
        }
        for (let i = 0; i < document.getElementsByClassName("error").length; i++) {
            const child = document.getElementsByClassName("error").item(i);
            this.observeSpan(child);
        }
    }
    /** @description generator method used to traverse children */
    *traverseChildren(element) {
        if (!element)
            return;
        yield element;
        for (const node of element.childNodes) {
            yield* this.traverseChildren(node);
        }
    }
    /** @description get nodes matching a selector */
    selectAllMatching(selector, root) {
        const result = [];
        for (const node of this.traverseChildren(root)) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches(selector)) {
                    result.push(node);
                }
            }
        }
        return result;
    }
    /** @description creates the error span elements */
    createErrorSpan() {
        const span = document.createElement("span");
        span.addEventListener("contextmenu", () => this.displaySuggestions(span));
        span.setAttribute("class", "error");
        return span;
    }
    /** @description observes if the user corrects their mistakes, removes span if so */
    observeSpan(span) {
        const configuration = {
            characterData: true,
            childList: true,
            subtree: true,
        };
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (!mutation.target)
                    observer.disconnect();
                const text = span.textContent;
                if (!text || text === "")
                    return;
                const checkCorrected = this.currentCorrector.correct(text.toLowerCase(), -1);
                if (checkCorrected.length === 0) {
                    const textNode = new Text(text);
                    const selection = document.getSelection();
                    const oldRange = selection.getRangeAt(0);
                    const startOffset = oldRange.startOffset;
                    const endOffset = oldRange.endOffset;
                    span.replaceWith(textNode);
                    console.log(startOffset, endOffset);
                    setTimeout(() => {
                        const newRange = new Range();
                        newRange.setStart(textNode, startOffset);
                        newRange.setEnd(textNode, endOffset);
                        newRange.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    });
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(span, configuration);
    }
    /** @description computes suggestions for the current term*/
    displaySuggestions(span) {
        const text = span.textContent;
        if (!text)
            return;
        this.contextMenu.style.display = "none";
        this.computeSuggestions(text).then((suggestions) => {
            setTimeout(() => {
                this.editContextMenu(suggestions.map((x) => x.term), text, span);
            });
        });
    }
    /** @description edits the contextMenu in order to add the suggestions */
    editContextMenu(suggestions, originalTerm, errorElement) {
        const errorMessage = document.createElement("li");
        const suggestionFragment = document.createDocumentFragment();
        errorMessage.setAttribute("id", "correction-error-option");
        const languageDescriptor = document.createElement("h1");
        const capitalizedLang = this.currentLanguage[0].toLocaleUpperCase() + this.currentLanguage.slice(1);
        languageDescriptor.textContent = capitalizedLang;
        suggestionFragment.appendChild(languageDescriptor);
        const suggestionMessage = document.createElement("p");
        if (suggestions.length === 0) {
            suggestionMessage.innerHTML = `No suggestions for the term ${originalTerm}`;
            suggestionFragment.appendChild(suggestionMessage);
        }
        else {
            const errMessage = `The spelling for the term
      ${originalTerm} seems incorrect, here are some suggestions :`;
            suggestionMessage.innerHTML = errMessage;
            const suggestionUL = document.createElement("ul");
            suggestions.forEach((suggestion) => {
                const suggestionLi = document.createElement("li");
                suggestionLi.textContent = suggestion;
                suggestionLi.addEventListener("click", () => {
                    const textNode = new Text(suggestion);
                    errorElement.replaceWith(textNode);
                    this.contextMenu.style.display = "none";
                    this.contextMenuOverlay.style.display = "none";
                });
                suggestionUL.appendChild(suggestionLi);
            });
            suggestionFragment.appendChild(suggestionMessage);
            suggestionFragment.appendChild(suggestionUL);
        }
        errorMessage.appendChild(suggestionFragment);
        const contextMenuFirstChild = this.contextMenuOptions.firstElementChild;
        const errorJoiner = document.createDocumentFragment();
        errorJoiner.append(errorMessage, document.createElement("hr"));
        this.contextMenuOptions.insertBefore(errorJoiner, contextMenuFirstChild);
        this.contextMenu.style.display = "block";
        this.contextMenuOverlay.style.display = "block";
    }
    /** @description compares the passed term to one in the dictionary */
    computeSuggestions(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const word = term.toLowerCase();
            let filteredList = [];
            if (term.length <= 5) {
                filteredList = this.wordSet.filter((x) => x.startsWith(word[0]));
            }
            else {
                filteredList = this.wordSet.filter((x) => x.startsWith(word.slice(0, 2)));
            }
            return yield this.computeSimilarity(term, filteredList);
        });
    }
    /**
     * @description computes the similarity between a word set and a word
     */
    computeSimilarity(term, list) {
        return __awaiter(this, void 0, void 0, function* () {
            const suggestions = [];
            for (let i = 0; i < list.length; i++) {
                const distance = this.computeLevenstheinDistance(term, list[i]);
                suggestions.push({ term: list[i], dif: distance });
            }
            return suggestions
                .sort((a, b) => a.dif - b.dif)
                .reverse()
                .slice(0, 3);
        });
    }
    /**
     * @description computes the similarity between two strings using the Levensthein distance
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
    /**
     * @description Gets the indices of where a string n appears.
     * @see https://stackoverflow.com/questions/3410464
     */
    getIndicesOf(targetString, objectString) {
        if (targetString.length === 0)
            return [];
        let startIndex, index = 0;
        const indices = [];
        while ((index = objectString.indexOf(targetString, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + targetString.length;
        }
        return indices;
    }
    /**
     * @description filters text nodes under an element
     * @see https://stackoverflow.com/questions/10730309
     */
    filterTextNodesUnder(element) {
        const children = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        while (walker.nextNode() !== null) {
            children.push(walker.currentNode);
        }
        return children;
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
            /** this.translations and this.documentNames might not exist yet FIXME: */
            // this.instantiateLanguageSelection();
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