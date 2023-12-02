/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/ts/modules/editor.ts":
      /*!**********************************!*\
  !*** ./src/ts/modules/editor.ts ***!
  \**********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Editor,
          /* harmony export */
        });
        /* harmony import */ var _functions_editor_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! ./functions/editor_functions */ "./src/ts/modules/functions/editor_functions.ts"
        );
        /* harmony import */ var _functions_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./functions/settings */ "./src/ts/modules/functions/settings.ts"
        );
        /* harmony import */ var _functions_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./functions/storage */ "./src/ts/modules/functions/storage.ts"
        );
        /* harmony import */ var _functions_statistics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./functions/statistics */ "./src/ts/modules/functions/statistics.ts"
        );
        /* harmony import */ var _functions_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./functions/interface */ "./src/ts/modules/functions/interface.ts"
        );
        /* harmony import */ var _functions_text_correction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./functions/text_correction */ "./src/ts/modules/functions/text_correction.ts"
        );
        /* harmony import */ var _functions_document_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./functions/document_styles */ "./src/ts/modules/functions/document_styles.ts"
        );
        /* harmony import */ var _functions_translations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./functions/translations */ "./src/ts/modules/functions/translations.ts"
        );
        /* harmony import */ var _functions_context_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ./functions/context_menu */ "./src/ts/modules/functions/context_menu.ts"
        );

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

        /***/
      },

    /***/ "./src/ts/modules/functions/context_menu.ts":
      /*!**************************************************!*\
  !*** ./src/ts/modules/functions/context_menu.ts ***!
  \**************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ ContextMenu,
          /* harmony export */
        });
        /**
         *
         * @description Handles the a custom context menu
         *
         */
        class ContextMenu {
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

        /***/
      },

    /***/ "./src/ts/modules/functions/document_styles.ts":
      /*!*****************************************************!*\
  !*** ./src/ts/modules/functions/document_styles.ts ***!
  \*****************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ DocumentStyles,
          /* harmony export */
        });
        /**
         *
         * @description Handles document styles, such as bold, italics, superscript, fonts,
         * text justification, etc.
         *
         */
        class DocumentStyles {
          constructor() {
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
          }
          /** @description Instantiate text styles (bold, italics, font...) */
          instantiateTextStyles() {
            /**
             * FIXME: THIS IS DEPECRECATED AND COULD STOP WORKING AT ANY MOMENT
             * TODO: THIS IS FEATURE DIFFERS FROM BROWSERS TO BROWSERS
             * */
            this.boldButton.addEventListener("click", () => document.execCommand("bold", false));
            this.italicButton.addEventListener("click", () => document.execCommand("italic", false));
            this.underlineButton.addEventListener("click", () => document.execCommand("underline", false));
            this.strikeButtonButton.addEventListener("click", () => document.execCommand("strikeThrough", false));
            this.supScriptButton.addEventListener("click", () => document.execCommand("superScript", false));
            this.subScriptButton.addEventListener("click", () => document.execCommand("subScript", false));
          }
          /** @description Sets events for text justification by the click of a button */
          instantiateTextJustification() {
            this.justifyCenterButton.addEventListener("click", this.handleJustification("center"));
            this.justifyLeftButton.addEventListener("click", this.handleJustification("left"));
            this.justifyRightButton.addEventListener("click", this.handleJustification("right"));
            this.justifyEvenButton.addEventListener("click", this.handleJustification("justify"));
          }
          /** @description Handles text justification events */
          handleJustification(position) {
            return () => {
              const selection = window.getSelection();
              let parentNode = selection.focusNode;
              /* recursively traverse parents to find the ones that are paragraph leveled */
              if (parentNode && parentNode.parentElement !== this.editor) {
                while (parentNode !== null && parentNode.parentElement !== this.editor) {
                  parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentElement;
                }
              }
              if (parentNode === null) return;
              const paragraphNode = parentNode;
              if (selection.anchorNode === selection.focusNode) {
                paragraphNode.setAttribute("data-text-align", position);
              } else {
                let endNode = selection.anchorNode;
                if (endNode && endNode.parentElement !== this.editor) {
                  while (endNode !== null && endNode.parentElement !== this.editor) {
                    endNode = endNode === null || endNode === void 0 ? void 0 : endNode.parentElement;
                  }
                }
                if (!endNode) return;
                const childEndPosition = Array.from(this.editor.children).indexOf(endNode);
                const childStartPosition = Array.from(this.editor.children).indexOf(paragraphNode);
                const positionSet = {
                  start: childStartPosition < childEndPosition ? childStartPosition : childEndPosition,
                  end: (childStartPosition < childEndPosition ? childEndPosition : childStartPosition) + 1,
                };
                for (let i = positionSet.start; i < positionSet.end; i++) {
                  if (!this.editor.children[i]) break;
                  this.editor.children[i].setAttribute("data-text-align", position);
                }
              }
            };
          }
        }

        /***/
      },

    /***/ "./src/ts/modules/functions/editor_functions.ts":
      /*!******************************************************!*\
  !*** ./src/ts/modules/functions/editor_functions.ts ***!
  \******************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ EditorFunctions,
          /* harmony export */
        });
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
            this.formatFontSizeInput.addEventListener("click", () =>
              this.handleInputFocus(this.formatFontSizeInput)
            );
            this.editor.addEventListener("keydown", (e) => this.restrictInitialDiv(e));
          }
          /** @description Clears the editor when empty (remaining <div>, <br> elements) */
          handleEmptyEditor() {
            if (this.editor.innerText.replace(/\s+/g, "").length !== 0) return;
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
          /** @description Handles the paste event, to only keep text */
          handlePaste(e) {
            e.preventDefault();
            const clipboardData = e.clipboardData ? e.clipboardData.getData("text") : null;
            if (!clipboardData) return;
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const textContentNode = document.createTextNode(clipboardData);
            range.insertNode(textContentNode);
            range.setStartAfter(textContentNode);
            range.setEndAfter(textContentNode);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          /** @description Prevents the initial div from being deleted */
          restrictInitialDiv(e) {
            if (e.key === "Backspace") {
              if (this.initialDiv.innerText.replace(/\n|\s/g, "") === "") {
                const selection = window.getSelection();
                if (!selection) return;
                let parentNode = selection.anchorNode;
                /** recursively traverse */
                if (parentNode && parentNode.parentElement !== this.editor) {
                  while (parentNode !== null && parentNode.parentElement !== this.editor) {
                    parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentElement;
                  }
                }
                if (parentNode === this.initialDiv) {
                  e.preventDefault();
                }
              }
            }
          }
          /** @description Selects entire input content onfocus */
          handleInputFocus(inputElement) {
            inputElement.focus();
            inputElement.select();
          }
          /** @description Enforces digit only input */
          enforeDigitOnly(e) {
            if (!/Backspace|\d/g.test(e.key)) e.preventDefault();
          }
        }

        /***/
      },

    /***/ "./src/ts/modules/functions/interface.ts":
      /*!***********************************************!*\
  !*** ./src/ts/modules/functions/interface.ts ***!
  \***********************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ UserInterface,
          /* harmony export */
        });
        /**
         *
         * @description Instantiates User Interface events and functionality
         *
         */
        class UserInterface {
          constructor() {
            this.editor = document.querySelector("#editor");
            this.mainView = document.querySelector("#app");
            this.settingsButton = document.querySelector("#setting-button");
            this.settingsCloseButton = document.querySelector("#close-settings");
            this.settingsView = document.querySelector("#settings-view");
            this.titleInput = document.querySelector("#title-input");
            this.zoomRangeInput = document.querySelector("#zoom-range");
            this.zoomInput = document.querySelector("#zoom-control-input");
            /*
          localStorage.getItem("zoomLevel") is a non-nullish value since it has been instantiated
          within the Storage class.
        */
            this.zoomCurr = parseInt(localStorage.getItem("zoomLevel"), 10) / 100;
            this.MAX_ALLOWED_ZOOM = parseInt(this.zoomRangeInput.max);
            this.instantiateUIEvents();
          }
          /** @description instanciates a group of unrelated UIEvents */
          instantiateUIEvents() {
            document.title = "Azu - Document 1";
            this.titleInput.addEventListener("input", () => this.handleTitleInput());
            this.titleInput.addEventListener("blur", () => this.handleTitleBlur());
            this.instantiateSettingsUI();
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
            if (!e.ctrlKey) return;
            e.preventDefault();
            /* Different browsers usually have a different increment on zoom */
            const addedZoom = (e.deltaY * -1 < 0 ? -1 : 1) * 0.25;
            if (
              this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM ||
              this.zoomCurr + addedZoom < parseFloat(this.zoomRangeInput.min)
            )
              return;
            this.zoomCurr += addedZoom;
            this.editor.style.scale = `${this.zoomCurr}`;
            this.zoomRangeInput.value = `${this.zoomCurr}`;
            this.zoomInput.value = `${Math.floor(parseFloat((this.zoomCurr * 100).toFixed(2)))}`;
          }
          /** @description Zooms only the inner document portion on `CTRL` + `+`, `CTRL` + `-` */
          handleKeyZoom(e) {
            if (!e.ctrlKey) return;
            const isZoomingIn = e.key === "+" || e.key === "=";
            const isZoomingOut = e.key === "-" || e.key === "_";
            if (isZoomingIn || isZoomingOut) {
              e.preventDefault();
              const addedZoom = isZoomingIn ? 0.25 : -0.25;
              if (this.zoomCurr + addedZoom <= 0 || this.zoomCurr + addedZoom > this.MAX_ALLOWED_ZOOM) return;
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
              if (previousZoom < minZoom) previousZoom = 1;
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
            if (!/Backspace|\d/g.test(e.key)) e.preventDefault();
          }
          /**
           *
           * @description Handles document title change
           *
           */
          /** @description If the title value is invalid, set the document title to "Unnamed" */
          handleTitleBlur() {
            const content = this.titleInput.value;
            if (content.replace(/\s*/g, "") !== "") return;
            this.titleInput.value = "Unnamed";
          }
          /** @description On title change, set document.title */
          handleTitleInput() {
            const title = this.titleInput.value;
            if (title.replace(/\s*/g, "") === "") {
              document.title = "Azu - Unnamed";
            } else {
              const MAX_TITLE_LENGTH = 50;
              const ellidedString =
                title.length >= MAX_TITLE_LENGTH ? `${title.substring(0, MAX_TITLE_LENGTH - 3)}...` : title;
              document.title = `Azu - ${ellidedString}`;
            }
          }
          /**
           *
           * @description Handles events related to setting configuration
           *
           */
          instantiateSettingsUI() {
            this.settingsButton.addEventListener("click", () => this.openSettings());
            this.settingsCloseButton.addEventListener("click", () => this.closeSettings());
          }
          /** @description Opens the settings view, while closing the main view */
          openSettings() {
            this.mainView.style.display = "none";
            this.settingsView.style.display = "block";
            document.body.style.overflowY = "scroll";
          }
          /** @description Opens the main view, while closing the settings view */
          closeSettings() {
            this.settingsView.style.display = "none";
            this.mainView.style.display = "block";
            document.body.style.overflowY = "hidden";
          }
        }

        /***/
      },

    /***/ "./src/ts/modules/functions/settings.ts":
      /*!**********************************************!*\
  !*** ./src/ts/modules/functions/settings.ts ***!
  \**********************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Settings,
          /* harmony export */
        });
        /**
         *
         * @description Configures settings
         *
         */
        class Settings {
          constructor() {
            this.currentThemeContainer = document.querySelector("#current-system-scheme");
            this.themesGrid = document.querySelector("#settings-apprearance-themes");
            this.instantiateSettings();
          }
          /** @description Initialises setting options */
          instantiateSettings() {
            this.instantiateThemeSelection();
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
            }
            const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
            const detectThemeChange = (e) => {
              this.currentThemeContainer.textContent = e.matches ? "dark" : "light";
            };
            this.currentThemeContainer.innerText = colorScheme.matches ? "dark" : "light";
            colorScheme.addEventListener("change", (e) => detectThemeChange(e));
          }
        }

        /***/
      },

    /***/ "./src/ts/modules/functions/statistics.ts":
      /*!************************************************!*\
  !*** ./src/ts/modules/functions/statistics.ts ***!
  \************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Statictics,
          /* harmony export */
        });
        /**
         *
         * @description initialises events relative to word count, word length, mistakes,
         * or about the document itself ;
         *
         **/
        class Statictics {
          constructor() {
            this.editor = document.querySelector("#editor");
            this.wordCountContainer = document.querySelector("#word-count");
            this.COUNT_INTERVAL = 5000;
            this.initializeStatistics();
          }
          initializeStatistics() {
            this.configureWordCount();
          }
          /** @description Count words at an interval */
          configureWordCount() {
            let timer = setTimeout(() => {});
            this.editor.addEventListener("input", () => {
              clearTimeout(timer);
              timer = setTimeout(() => {
                queueMicrotask(() => {
                  const textContent = this.editor.innerText;
                  const textLength = textContent
                    .trim()
                    .split(/\s+/g)
                    .filter((x) => x !== "").length;
                  this.wordCountContainer.innerText = `${textLength === 0 ? "no" : textLength} word${
                    textLength === 1 ? "" : "s"
                  }`;
                });
              }, this.COUNT_INTERVAL);
            });
          }
        }

        /***/
      },

    /***/ "./src/ts/modules/functions/storage.ts":
      /*!*********************************************!*\
  !*** ./src/ts/modules/functions/storage.ts ***!
  \*********************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Storage,
          /* harmony export */
        });
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
            window.addEventListener("load", () => {
              const zoomLevel = localStorage.getItem("zoomLevel");
              if (zoomLevel !== null) {
                this.zoomAmount = parseInt(zoomLevel, 10);
                this.zoomRangeInput.value = `${this.zoomAmount / 100}`;
                this.zoomInput.value = `${this.zoomAmount}`;
                this.editor.style.scale = `${this.zoomAmount / 100}`;
              }
              const fetchedSettings = localStorage.getItem("Settings");
              if (fetchedSettings === null) return;
              const settings = JSON.parse(fetchedSettings);
              for (const [key, value] of Object.entries(settings)) {
                switch (key) {
                  case "theme":
                    {
                      if (value === null) return;
                      document.body.setAttribute("class", `${value}`);
                    }
                    break;
                  case "lang": {
                    if (value === null) return;
                  }
                }
              }
            });
          }
        }

        /***/
      },

    /***/ "./src/ts/modules/functions/text_correction.ts":
      /*!*****************************************************!*\
  !*** ./src/ts/modules/functions/text_correction.ts ***!
  \*****************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ TextCorrection,
          /* harmony export */
        });
        var __awaiter =
          (undefined && undefined.__awaiter) ||
          function (thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value);
                  });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
              }
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
            this.contextMenu = document.querySelector("#context-menu");
            this.editor = document.querySelector("#editor");
            this.currentWordListLang = "";
            this.wordList = [];
            this.CORRECTION_INTERVAL = 2000;
            this.initializeTextCorrection();
          }
          /** @description instantiates all methods related to text correction */
          initializeTextCorrection() {
            this.configureTextCorrection();
          }
          /** @description Attempts to find errors within the document */
          configureTextCorrection() {
            let timer = setTimeout(() => {});
            this.editor.addEventListener("input", () => {
              clearTimeout(timer);
              timer = setTimeout(() => {
                queueMicrotask(() =>
                  __awaiter(this, void 0, void 0, function* () {
                    if (this.currentWordListLang === "" || this.wordList.length === 0) {
                      this.currentWordListLang = "french";
                      yield this.loadDictionnary("french").then((json) => {
                        this.setDictionnary(json);
                      });
                    }
                    this.verifyText();
                  })
                );
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
              if (this.wordList.length === 0) return;
              let paraIndex = 0;
              for (const para of this.editor.children) {
                const textContent = para.textContent;
                /* Triming a placeholder \u200B, Zero-width space in order to remove it from tokens */
                if (textContent === null || textContent.replace(/\u200B/g, "").length === 0) return;
                yield this.scanText(para, paraIndex).then(() => {
                  paraIndex += 1;
                });
              }
            });
          }
          /** @description Scans text content for errors, then structures errors in an object */
          scanText(paragraph, paraIndex) {
            return __awaiter(this, void 0, void 0, function* () {
              console.log("[scanning...]");
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
                        nthOccurence: errorArray.filter((x) => x.term === token || x.paraIndex === paraIndex)
                          .length,
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
                        if (strWord.match(/(-?\d+(.\d+)?((e|E)(\+|-)\d+)?i?)(?![a-zA-Z])/g)) return;
                        if (
                          this.wordList.includes(strWord.toLowerCase()) ||
                          strWord.replace(/\s+|\u200B/g, "") === ""
                        )
                          return;
                        addTerm(strWord.trim());
                      } else if (Array.isArray(word)) {
                        /* case for terms composed by elision such as "c'est" or "presqu'île" */
                        word.forEach((part, index) => {
                          const p = part.replace(/[^\w\s]+/g, "");
                          if (index === 0) {
                            /*  "c'est" is broken into "c" and "est", but "c" is not a valid term, but by elision, "ce" is */
                            if (this.wordList.includes((p + "e").toLowerCase())) return;
                            addTerm((p + "e").trim());
                          } else if (!this.wordList.includes(p.toLowerCase())) {
                            addTerm(p.trim());
                          }
                        });
                      }
                    });
                    if (errorArray.length === 0) return;
                    this.markIncorrectTerm(errorArray);
                  }
                  break;
              }
            });
          }
          /** @description marks incorrect terms within the DOM, and suggestions along with it */
          markIncorrectTerm(errorArray) {
            // \u200C, \uFEFF
            errorArray.forEach((err) => {
              const paragraph = this.editor.children[err.paraIndex];
              const termRegex = new RegExp(`\\b(${err.term})\\b`, "g");
              if (!paragraph.textContent) return;
              paragraph.textContent = paragraph.textContent.replace(termRegex, "\uFEFF$1\u200C");
            });
            this.editor.innerHTML = this.editor.innerHTML.replace(
              /\uFEFF(.*?)\u200C/g,
              "<span data-temp-err>$1</span>"
            );
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
            }
          }
          /** @description Shows suggestions using the Levensthein distance algorithm*/
          showSuggestions(e) {
            const span = e.target;
            const term = span.textContent;
            if (!term || term.length === 0) return;
            let filteredList = [];
            if (term.length <= 3) {
              filteredList = this.wordList.filter((x) => x.startsWith(term) && x.length < term.length + 2);
            } else {
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
            console.log(suggestions);
            this.contextMenu.innerHTML = "";
            if (suggestions.length === 0) {
              const message = document.createElement("span");
              message.textContent = `[${this.currentWordListLang}] No suggestions for term "${term}"`;
              this.contextMenu.appendChild(message);
            } else {
              const message = document.createElement("span");
              message.textContent = `[${this.currentWordListLang}] Correct orthograph for term "${term}"`;
              this.contextMenu.appendChild(message);
              suggestions.forEach((s) => {
                const element = document.createElement("div");
                element.textContent = s.word;
                element.addEventListener("click", () => {
                  const textNode = document.createTextNode(s.word);
                  span.replaceWith(textNode);
                  this.contextMenu.style.display = "none";
                  this.contextMenu.innerHTML = "";
                });
                this.contextMenu.append(element);
              });
            }
          }
          /**
           * @description computes Levensthein distance
           * @see https://rosettacode.org/wiki/Levenshtein_distance#TypeScript
           */
          computeLevenstheinDistance(first, second) {
            const m = first.length,
              n = second.length;
            let t = [...Array(n + 1).keys()],
              u = [];
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

        /***/
      },

    /***/ "./src/ts/modules/functions/translations.ts":
      /*!**************************************************!*\
  !*** ./src/ts/modules/functions/translations.ts ***!
  \**************************************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ Translations,
          /* harmony export */
        });
        var __awaiter =
          (undefined && undefined.__awaiter) ||
          function (thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function (resolve) {
                    resolve(value);
                  });
            }
            return new (P || (P = Promise))(function (resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }
              function rejected(value) {
                try {
                  step(generator["throw"](value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
              }
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
            this.translations = {};
            this.instantiateTranslations();
          }
          /** @description instantiates events for translations */
          instantiateTranslations() {
            (() =>
              __awaiter(this, void 0, void 0, function* () {
                yield this.fetchTranslations().then((json) => {
                  this.translations = json;
                });
              }))();
            this.instantiateLanguageSelection();
          }
          /** @description sets the interface language, to the specified value */
          setInterfaceLanguage(language) {
            if (Object.keys(this.translations).length === 0 || this.translations[language] === undefined) return;
            const translationobj = this.translations[language];
            this.titleInput.placeholder = translationobj.document_no_title_placeholder;
            if (this.titleInput.value === "Document 1") {
              this.titleInput.value = translationobj.document_initial_title;
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
            this.settingsInterfaceLanguage.textContent =
              translationobj.settings.accessibility.interface_language.title;
            this.settingsAppearanceTitle.textContent = translationobj.settings.appearance.title;
            this.settingsThemesTitle.textContent = translationobj.settings.appearance.theme_title;
            this.settingsThemesLight.textContent = translationobj.settings.appearance.themes.light;
            this.settingsThemesDark.textContent = translationobj.settings.appearance.themes.dark;
            this.settingsThemesSystem.textContent = translationobj.settings.appearance.themes.system;
            this.settingsThemesCustom.textContent = translationobj.settings.appearance.themes.custom;
          }
          /** @description fetches the .json file containing all translations */
          fetchTranslations() {
            return __awaiter(this, void 0, void 0, function* () {
              const response = yield fetch("./json/translations.json");
              const translations = yield response.json();
              return translations;
            });
          }
          /** @description Allows for the user to change their language */
          instantiateLanguageSelection() {
            this.languageSelection.addEventListener("change", () => {
              const selectedLang =
                this.languageSelection.children[this.languageSelection.selectedIndex].getAttribute("lang");
              console.log(selectedLang);
              if (selectedLang === null) return;
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

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!**************************!*\
  !*** ./src/ts/script.ts ***!
  \**************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _modules_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./modules/editor */ "./src/ts/modules/editor.ts"
    );
    var __awaiter =
      (undefined && undefined.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
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
            console.error("[Service worker] : Unavailable");
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

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTJEO0FBQ2Y7QUFDRjtBQUNNO0FBQ0U7QUFDTztBQUNBO0FBQ0w7QUFDRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBTztBQUNuQixZQUFZLDREQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBVztBQUN2QixZQUFZLGtFQUFjO0FBQzFCLFlBQVksbUVBQWU7QUFDM0IsWUFBWSwyREFBUTtBQUNwQixZQUFZLDZEQUFVO0FBQ3RCLFlBQVksa0VBQWM7QUFDMUIsWUFBWSwrREFBWTtBQUN4QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsRUFBRTtBQUMzQyx3Q0FBd0MsRUFBRTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxxQkFBcUI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkVBQTZFLGdCQUFnQjtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQsdUNBQXVDLGNBQWM7QUFDckQsa0NBQWtDLHlEQUF5RDtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxjQUFjO0FBQ3ZELDJDQUEyQyxjQUFjO0FBQ3pELHNDQUFzQyxvQkFBb0I7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdCQUFnQjtBQUNsRCxxQ0FBcUMsVUFBVTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxtQkFBbUI7QUFDekQseUNBQXlDLGFBQWE7QUFDdEQ7QUFDQTtBQUNBLGtDQUFrQyxvQkFBb0I7QUFDdEQscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UseUNBQXlDO0FBQ2pILHNDQUFzQyxjQUFjO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxzQ0FBc0MsTUFBTSw0QkFBNEI7QUFDbkksaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msc0JBQXNCO0FBQ3JFLDBDQUEwQyxnQkFBZ0I7QUFDMUQsNkNBQTZDLHNCQUFzQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLE1BQU07QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELEtBQUs7QUFDeEQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGdDQUFnQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MseUJBQXlCLDZCQUE2QixLQUFLO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHlCQUF5QixpQ0FBaUMsS0FBSztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDNU5BLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7O1VDeEdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVEQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9henUvLi9zcmMvdHMvbW9kdWxlcy9lZGl0b3IudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL2NvbnRleHRfbWVudS50cyIsIndlYnBhY2s6Ly9henUvLi9zcmMvdHMvbW9kdWxlcy9mdW5jdGlvbnMvZG9jdW1lbnRfc3R5bGVzLnRzIiwid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2Z1bmN0aW9ucy9lZGl0b3JfZnVuY3Rpb25zLnRzIiwid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2Z1bmN0aW9ucy9pbnRlcmZhY2UudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL3NldHRpbmdzLnRzIiwid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2Z1bmN0aW9ucy9zdGF0aXN0aWNzLnRzIiwid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2Z1bmN0aW9ucy9zdG9yYWdlLnRzIiwid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2Z1bmN0aW9ucy90ZXh0X2NvcnJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL3RyYW5zbGF0aW9ucy50cyIsIndlYnBhY2s6Ly9henUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXp1L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9henUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9henUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9henUvLi9zcmMvdHMvc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFZGl0b3JGdW5jdGlvbnMgZnJvbSBcIi4vZnVuY3Rpb25zL2VkaXRvcl9mdW5jdGlvbnNcIjtcbmltcG9ydCBTZXR0aW5ncyBmcm9tIFwiLi9mdW5jdGlvbnMvc2V0dGluZ3NcIjtcbmltcG9ydCBTdG9yYWdlIGZyb20gXCIuL2Z1bmN0aW9ucy9zdG9yYWdlXCI7XG5pbXBvcnQgU3RhdGljdGljcyBmcm9tIFwiLi9mdW5jdGlvbnMvc3RhdGlzdGljc1wiO1xuaW1wb3J0IFVzZXJJbnRlcmZhY2UgZnJvbSBcIi4vZnVuY3Rpb25zL2ludGVyZmFjZVwiO1xuaW1wb3J0IFRleHRDb3JyZWN0aW9uIGZyb20gXCIuL2Z1bmN0aW9ucy90ZXh0X2NvcnJlY3Rpb25cIjtcbmltcG9ydCBEb2N1bWVudFN0eWxlcyBmcm9tIFwiLi9mdW5jdGlvbnMvZG9jdW1lbnRfc3R5bGVzXCI7XG5pbXBvcnQgVHJhbnNsYXRpb25zIGZyb20gXCIuL2Z1bmN0aW9ucy90cmFuc2xhdGlvbnNcIjtcbmltcG9ydCBDb250ZXh0TWVudSBmcm9tIFwiLi9mdW5jdGlvbnMvY29udGV4dF9tZW51XCI7XG4vKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gUmVwcmVuc2VudHMgdGhlIGVkaXRvciBpdHNlbGYsIGluc3RhbnRpYXRlcyBmdW5jdGlvbnMgdW5kZXIgc3ViLWNsYXNzZXNcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gaW5pdGlhbGl6ZXMgdGhlIGVkaXRvciAqL1xuICAgIGluaSgpIHtcbiAgICAgICAgbmV3IFN0b3JhZ2UoKTtcbiAgICAgICAgbmV3IFVzZXJJbnRlcmZhY2UoKTtcbiAgICAgICAgdGhpcy5zZXRFdmVudHMoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBDb25maWd1cmVzIGVkaXRvciBmdW5jdGlvbnMgKi9cbiAgICBzZXRFdmVudHMoKSB7XG4gICAgICAgIG5ldyBDb250ZXh0TWVudTtcbiAgICAgICAgbmV3IERvY3VtZW50U3R5bGVzKCk7XG4gICAgICAgIG5ldyBFZGl0b3JGdW5jdGlvbnMoKTtcbiAgICAgICAgbmV3IFNldHRpbmdzKCk7XG4gICAgICAgIG5ldyBTdGF0aWN0aWNzKCk7XG4gICAgICAgIG5ldyBUZXh0Q29ycmVjdGlvbigpO1xuICAgICAgICBuZXcgVHJhbnNsYXRpb25zKCk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIGEgY3VzdG9tIGNvbnRleHQgbWVudVxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dE1lbnUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZXh0LW1lbnVcIik7XG4gICAgICAgIHRoaXMuY3R4Q292ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tY292ZXJcIik7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVDb250ZXh0TWVudSgpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyBtZXRob2RzIHRvIG1hbmlwdWxhdGUgdGhlIGNvbnRleHQgbWVudSAqL1xuICAgIGluc3RhbnRpYXRlQ29udGV4dE1lbnUoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3R4Q292ZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMubW92ZU1lbnUoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oYW5kbGVDbG9zZU1lbnUoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBtb3ZlIHRoZSBtZW51IHRvIGEgc3BlY2lmaWMgcG9zaXRpb24gKi9cbiAgICBtb3ZlTWVudSh4LCB5KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUuc3R5bGUubGVmdCA9IGAke3h9cHhgO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LnN0eWxlLnRvcCA9IGAke3l9cHhgO1xuICAgIH1cbiAgICAvKiogQ2xvc2VzIHRoZSBtZW51IG9uIGV4aXQgb2YgdGhlIGNvdmVyICovXG4gICAgaGFuZGxlQ2xvc2VNZW51KCkge1xuICAgICAgICB0aGlzLmN0eENvdmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN0eENvdmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBkb2N1bWVudCBzdHlsZXMsIHN1Y2ggYXMgYm9sZCwgaXRhbGljcywgc3VwZXJzY3JpcHQsIGZvbnRzLFxuICogdGV4dCBqdXN0aWZpY2F0aW9uLCBldGMuXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudFN0eWxlcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0b3JcIik7XG4gICAgICAgIHRoaXMuYm9sZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWJvbGRcIik7XG4gICAgICAgIHRoaXMuaXRhbGljQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtaXRhbGljc1wiKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5TGVmdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWp1c3RpZnktbGVmdFwiKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5Q2VudGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtanVzdGlmeS1jZW50ZXJcIik7XG4gICAgICAgIHRoaXMuanVzdGlmeVJpZ2h0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtanVzdGlmeS1yaWdodFwiKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5RXZlbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWp1c3RpZnktZXZlblwiKTtcbiAgICAgICAgdGhpcy51bmRlcmxpbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC11bmRlcmxpbmVcIik7XG4gICAgICAgIHRoaXMuc3RyaWtlQnV0dG9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtc3RyaWtlXCIpO1xuICAgICAgICB0aGlzLnN1cFNjcmlwdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LXN1cFwiKTtcbiAgICAgICAgdGhpcy5zdWJTY3JpcHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC1zdWJcIik7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVEb2N1bWVudFN0eWxlcygpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyBkb2N1bWVudCBzdHlsZXMgKi9cbiAgICBpbnN0YW50aWF0ZURvY3VtZW50U3R5bGVzKCkge1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlVGV4dFN0eWxlcygpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlVGV4dEp1c3RpZmljYXRpb24oKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBJbnN0YW50aWF0ZSB0ZXh0IHN0eWxlcyAoYm9sZCwgaXRhbGljcywgZm9udC4uLikgKi9cbiAgICBpbnN0YW50aWF0ZVRleHRTdHlsZXMoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGSVhNRTogVEhJUyBJUyBERVBFQ1JFQ0FURUQgQU5EIENPVUxEIFNUT1AgV09SS0lORyBBVCBBTlkgTU9NRU5UXG4gICAgICAgICAqIFRPRE86IFRISVMgSVMgRkVBVFVSRSBESUZGRVJTIEZST00gQlJPV1NFUlMgVE8gQlJPV1NFUlNcbiAgICAgICAgICogKi9cbiAgICAgICAgdGhpcy5ib2xkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcImJvbGRcIiwgZmFsc2UpKTtcbiAgICAgICAgdGhpcy5pdGFsaWNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaXRhbGljXCIsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMudW5kZXJsaW5lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcInVuZGVybGluZVwiLCBmYWxzZSkpO1xuICAgICAgICB0aGlzLnN0cmlrZUJ1dHRvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJzdHJpa2VUaHJvdWdoXCIsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMuc3VwU2NyaXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcInN1cGVyU2NyaXB0XCIsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMuc3ViU2NyaXB0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcInN1YlNjcmlwdFwiLCBmYWxzZSkpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNldHMgZXZlbnRzIGZvciB0ZXh0IGp1c3RpZmljYXRpb24gYnkgdGhlIGNsaWNrIG9mIGEgYnV0dG9uICovXG4gICAgaW5zdGFudGlhdGVUZXh0SnVzdGlmaWNhdGlvbigpIHtcbiAgICAgICAgdGhpcy5qdXN0aWZ5Q2VudGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUp1c3RpZmljYXRpb24oXCJjZW50ZXJcIikpO1xuICAgICAgICB0aGlzLmp1c3RpZnlMZWZ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUp1c3RpZmljYXRpb24oXCJsZWZ0XCIpKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5UmlnaHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlSnVzdGlmaWNhdGlvbihcInJpZ2h0XCIpKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5RXZlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVKdXN0aWZpY2F0aW9uKFwianVzdGlmeVwiKSk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0ZXh0IGp1c3RpZmljYXRpb24gZXZlbnRzICovXG4gICAgaGFuZGxlSnVzdGlmaWNhdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBzZWxlY3Rpb24uZm9jdXNOb2RlO1xuICAgICAgICAgICAgLyogcmVjdXJzaXZlbHkgdHJhdmVyc2UgcGFyZW50cyB0byBmaW5kIHRoZSBvbmVzIHRoYXQgYXJlIHBhcmFncmFwaCBsZXZlbGVkICovXG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLnBhcmVudEVsZW1lbnQgIT09IHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudE5vZGUgIT09IG51bGwgJiYgcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50ICE9PSB0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZSA9PT0gbnVsbCB8fCBwYXJlbnROb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgcGFyYWdyYXBoTm9kZSA9IHBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmFuY2hvck5vZGUgPT09IHNlbGVjdGlvbi5mb2N1c05vZGUpIHtcbiAgICAgICAgICAgICAgICBwYXJhZ3JhcGhOb2RlLnNldEF0dHJpYnV0ZShcImRhdGEtdGV4dC1hbGlnblwiLCBwb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZW5kTm9kZSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICAgICAgICAgIGlmIChlbmROb2RlICYmIGVuZE5vZGUucGFyZW50RWxlbWVudCAhPT0gdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGVuZE5vZGUgIT09IG51bGwgJiYgZW5kTm9kZS5wYXJlbnRFbGVtZW50ICE9PSB0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kTm9kZSA9IGVuZE5vZGUgPT09IG51bGwgfHwgZW5kTm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZW5kTm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZW5kTm9kZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkRW5kUG9zaXRpb24gPSBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmNoaWxkcmVuKS5pbmRleE9mKGVuZE5vZGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkU3RhcnRQb3NpdGlvbiA9IEFycmF5LmZyb20odGhpcy5lZGl0b3IuY2hpbGRyZW4pLmluZGV4T2YocGFyYWdyYXBoTm9kZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25TZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBjaGlsZFN0YXJ0UG9zaXRpb24gPCBjaGlsZEVuZFBvc2l0aW9uID8gY2hpbGRTdGFydFBvc2l0aW9uIDogY2hpbGRFbmRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAoY2hpbGRTdGFydFBvc2l0aW9uIDwgY2hpbGRFbmRQb3NpdGlvbiA/IGNoaWxkRW5kUG9zaXRpb24gOiBjaGlsZFN0YXJ0UG9zaXRpb24pICsgMSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBwb3NpdGlvblNldC5zdGFydDsgaSA8IHBvc2l0aW9uU2V0LmVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5lZGl0b3IuY2hpbGRyZW5baV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IuY2hpbGRyZW5baV0uc2V0QXR0cmlidXRlKFwiZGF0YS10ZXh0LWFsaWduXCIsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uIENvbmZpZ3VyZXMgZXZlbnRzIHJlbGF0aXZlIHRvIHRoZSBmdW5jdGlvbnMgb2YgdGhlIHRleHQgZWRpdGluZ1xuICogd2l0aGluIHRoZSBlZGl0b3JcbiAqXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JGdW5jdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdG9yXCIpO1xuICAgICAgICB0aGlzLmZvcm1hdEZvbnRTaXplSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC1mb250LXNpemVcIik7XG4gICAgICAgIHRoaXMuaW5pdGlhbERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5pdGlhbC1jb250ZW50XCIpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZUVkaXRvckZ1bmN0aW9ucygpO1xuICAgIH1cbiAgICBjb25maWd1cmVFZGl0b3JGdW5jdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMuaGFuZGxlRW1wdHlFZGl0b3IoKSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXN0ZVwiLCAoZSkgPT4gdGhpcy5oYW5kbGVQYXN0ZShlKSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmVpbnB1dFwiLCAoZSkgPT4gdGhpcy5oYW5kbGVFZGl0b3JJbnB1dChlKSk7XG4gICAgICAgIHRoaXMuZm9ybWF0Rm9udFNpemVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4gdGhpcy5lbmZvcmVEaWdpdE9ubHkoZSkpO1xuICAgICAgICB0aGlzLmZvcm1hdEZvbnRTaXplSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuaGFuZGxlSW5wdXRGb2N1cyh0aGlzLmZvcm1hdEZvbnRTaXplSW5wdXQpKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHRoaXMucmVzdHJpY3RJbml0aWFsRGl2KGUpKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBDbGVhcnMgdGhlIGVkaXRvciB3aGVuIGVtcHR5IChyZW1haW5pbmcgPGRpdj4sIDxicj4gZWxlbWVudHMpICovXG4gICAgaGFuZGxlRW1wdHlFZGl0b3IoKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5pbm5lclRleHQucmVwbGFjZSgvXFxzKy9nLCBcIlwiKS5sZW5ndGggIT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaW5pdGlhbERpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH1cbiAgICBoYW5kbGVFZGl0b3JJbnB1dChlKSB7XG4gICAgICAgIHN3aXRjaCAoZS5pbnB1dFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpbnNlcnRQYXJhZ3JhcGhcIjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlUGFyYWdyYXBoSW5zZXJ0aW9uKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIE92ZXJyaWRlcyB0aGUgZGVmYXVsdCBrZXlkb3duIGV2ZW50IGZvciBhIGNvbnRlbnRlZGl0YWJsZSA8ZGl2PiBlbGVtZW50ICovXG4gICAgaGFuZGxlUGFyYWdyYXBoSW5zZXJ0aW9uKGUpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZU5vZGUgPSAoX2EgPSBzZWxlY3Rpb24uZm9jdXNOb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKGFjdGl2ZU5vZGUgPT09IHRoaXMuaW5pdGlhbERpdikge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBzZWNvbmROb2RlLmlubmVyVGV4dCA9IFwiXFx1MjAwQlwiO1xuICAgICAgICAgICAgY29uc3QgYWxpZ24gPSB0aGlzLmluaXRpYWxEaXYuZ2V0QXR0cmlidXRlKFwiZGF0YS10ZXh0LWFsaWduXCIpO1xuICAgICAgICAgICAgY29uc3QgcG9zc2libGVBbGlnbm1lbnRzID0gW1wibGVmdFwiLCBcImNlbnRlclwiLCBcInJpZ2h0XCIsIFwianVzdGlmeVwiXTtcbiAgICAgICAgICAgIGlmIChhbGlnbiAmJiBwb3NzaWJsZUFsaWdubWVudHMuaW5jbHVkZXMoYWxpZ24pKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kTm9kZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRleHQtYWxpZ25cIiwgYWxpZ24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbml0aWFsRGl2LmFmdGVyKHNlY29uZE5vZGUpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBuZXcgUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZXRTdGFydChzZWNvbmROb2RlLCAwKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZXRFbmQoc2Vjb25kTm9kZSwgMCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIHBhc3RlIGV2ZW50LCB0byBvbmx5IGtlZXAgdGV4dCAqL1xuICAgIGhhbmRsZVBhc3RlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBjbGlwYm9hcmREYXRhID0gZS5jbGlwYm9hcmREYXRhID8gZS5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJ0ZXh0XCIpIDogbnVsbDtcbiAgICAgICAgaWYgKCFjbGlwYm9hcmREYXRhKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIGNvbnN0IHRleHRDb250ZW50Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNsaXBib2FyZERhdGEpO1xuICAgICAgICByYW5nZS5pbnNlcnROb2RlKHRleHRDb250ZW50Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNldFN0YXJ0QWZ0ZXIodGV4dENvbnRlbnROb2RlKTtcbiAgICAgICAgcmFuZ2Uuc2V0RW5kQWZ0ZXIodGV4dENvbnRlbnROb2RlKTtcbiAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFByZXZlbnRzIHRoZSBpbml0aWFsIGRpdiBmcm9tIGJlaW5nIGRlbGV0ZWQgKi9cbiAgICByZXN0cmljdEluaXRpYWxEaXYoZSkge1xuICAgICAgICBpZiAoZS5rZXkgPT09IFwiQmFja3NwYWNlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxEaXYuaW5uZXJUZXh0LnJlcGxhY2UoL1xcbnxcXHMvZywgXCJcIikgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICAgICAgICAgIC8qKiByZWN1cnNpdmVseSB0cmF2ZXJzZSAqL1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlICYmIHBhcmVudE5vZGUucGFyZW50RWxlbWVudCAhPT0gdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudE5vZGUgIT09IG51bGwgJiYgcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50ICE9PSB0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgPT09IG51bGwgfHwgcGFyZW50Tm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlID09PSB0aGlzLmluaXRpYWxEaXYpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNlbGVjdHMgZW50aXJlIGlucHV0IGNvbnRlbnQgb25mb2N1cyAqL1xuICAgIGhhbmRsZUlucHV0Rm9jdXMoaW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gRW5mb3JjZXMgZGlnaXQgb25seSBpbnB1dCAqL1xuICAgIGVuZm9yZURpZ2l0T25seShlKSB7XG4gICAgICAgIGlmICghL0JhY2tzcGFjZXxcXGQvZy50ZXN0KGUua2V5KSlcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gSW5zdGFudGlhdGVzIFVzZXIgSW50ZXJmYWNlIGV2ZW50cyBhbmQgZnVuY3Rpb25hbGl0eVxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0b3JcIik7XG4gICAgICAgIHRoaXMubWFpblZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcFwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2V0dGluZy1idXR0b25cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2Utc2V0dGluZ3NcIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZXR0aW5ncy12aWV3XCIpO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlLWlucHV0XCIpO1xuICAgICAgICB0aGlzLnpvb21SYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN6b29tLXJhbmdlXCIpO1xuICAgICAgICB0aGlzLnpvb21JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjem9vbS1jb250cm9sLWlucHV0XCIpO1xuICAgICAgICAvKlxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiem9vbUxldmVsXCIpIGlzIGEgbm9uLW51bGxpc2ggdmFsdWUgc2luY2UgaXQgaGFzIGJlZW4gaW5zdGFudGlhdGVkXG4gICAgICAgICAgd2l0aGluIHRoZSBTdG9yYWdlIGNsYXNzLlxuICAgICAgICAqL1xuICAgICAgICB0aGlzLnpvb21DdXJyID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ6b29tTGV2ZWxcIiksIDEwKSAvIDEwMDtcbiAgICAgICAgdGhpcy5NQVhfQUxMT1dFRF9aT09NID0gcGFyc2VJbnQodGhpcy56b29tUmFuZ2VJbnB1dC5tYXgpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlVUlFdmVudHMoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBpbnN0YW5jaWF0ZXMgYSBncm91cCBvZiB1bnJlbGF0ZWQgVUlFdmVudHMgKi9cbiAgICBpbnN0YW50aWF0ZVVJRXZlbnRzKCkge1xuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiQXp1IC0gRG9jdW1lbnQgMVwiO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHRoaXMuaGFuZGxlVGl0bGVJbnB1dCgpKTtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMuaGFuZGxlVGl0bGVCbHVyKCkpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlU2V0dGluZ3NVSSgpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlWm9vbSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdpbmRvdyB6b29tIHRocm91Z2ggZG9jdW1lbnQgc2NhbGluZ1xuICAgICAqXG4gICAgICoqL1xuICAgIC8qKiBAZGVzY3JpcHRpb24gaW5zdGFudGlhdGVzIHRoZSB6b29tIGZ1bmN0aW9uICovXG4gICAgaW5zdGFudGlhdGVab29tKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGUpID0+IHRoaXMuaGFuZGxlV2hlZWxab29tKGUpLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4gdGhpcy5oYW5kbGVLZXlab29tKGUpKTtcbiAgICAgICAgdGhpcy56b29tUmFuZ2VJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHRoaXMuaGFuZGxlUmFuZ2Vab29tKGUpKTtcbiAgICAgICAgdGhpcy56b29tSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4gdGhpcy5oYW5kbGVJbnB1dFpvb20oKSk7XG4gICAgICAgIHRoaXMuem9vbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhhbmRsZUlucHV0Rm9jdXModGhpcy56b29tSW5wdXQpKTtcbiAgICAgICAgdGhpcy56b29tSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHRoaXMuZW5mb3JlRGlnaXRPbmx5KGUpKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBab29tcyBvbmx5IHRoZSBpbm5lciBkb2N1bWVudCBwb3J0aW9uIG9ud2hlZWwgKi9cbiAgICBoYW5kbGVXaGVlbFpvb20oZSkge1xuICAgICAgICBpZiAoIWUuY3RybEtleSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvKiBEaWZmZXJlbnQgYnJvd3NlcnMgdXN1YWxseSBoYXZlIGEgZGlmZmVyZW50IGluY3JlbWVudCBvbiB6b29tICovXG4gICAgICAgIGNvbnN0IGFkZGVkWm9vbSA9IChlLmRlbHRhWSAqIC0xIDwgMCA/IC0xIDogMSkgKiAwLjI1O1xuICAgICAgICBpZiAodGhpcy56b29tQ3VyciArIGFkZGVkWm9vbSA+IHRoaXMuTUFYX0FMTE9XRURfWk9PTSB8fFxuICAgICAgICAgICAgdGhpcy56b29tQ3VyciArIGFkZGVkWm9vbSA8IHBhcnNlRmxvYXQodGhpcy56b29tUmFuZ2VJbnB1dC5taW4pKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnpvb21DdXJyICs9IGFkZGVkWm9vbTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc3R5bGUuc2NhbGUgPSBgJHt0aGlzLnpvb21DdXJyfWA7XG4gICAgICAgIHRoaXMuem9vbVJhbmdlSW5wdXQudmFsdWUgPSBgJHt0aGlzLnpvb21DdXJyfWA7XG4gICAgICAgIHRoaXMuem9vbUlucHV0LnZhbHVlID0gYCR7TWF0aC5mbG9vcihwYXJzZUZsb2F0KCh0aGlzLnpvb21DdXJyICogMTAwKS50b0ZpeGVkKDIpKSl9YDtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBab29tcyBvbmx5IHRoZSBpbm5lciBkb2N1bWVudCBwb3J0aW9uIG9uIGBDVFJMYCArIGArYCwgYENUUkxgICsgYC1gICovXG4gICAgaGFuZGxlS2V5Wm9vbShlKSB7XG4gICAgICAgIGlmICghZS5jdHJsS2V5KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBpc1pvb21pbmdJbiA9IGUua2V5ID09PSBcIitcIiB8fCBlLmtleSA9PT0gXCI9XCI7XG4gICAgICAgIGNvbnN0IGlzWm9vbWluZ091dCA9IGUua2V5ID09PSBcIi1cIiB8fCBlLmtleSA9PT0gXCJfXCI7XG4gICAgICAgIGlmIChpc1pvb21pbmdJbiB8fCBpc1pvb21pbmdPdXQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFkZGVkWm9vbSA9IGlzWm9vbWluZ0luID8gMC4yNSA6IC0wLjI1O1xuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUN1cnIgKyBhZGRlZFpvb20gPD0gMCB8fCB0aGlzLnpvb21DdXJyICsgYWRkZWRab29tID4gdGhpcy5NQVhfQUxMT1dFRF9aT09NKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuem9vbUN1cnIgKz0gYWRkZWRab29tO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc3R5bGUuc2NhbGUgPSBgJHt0aGlzLnpvb21DdXJyfWA7XG4gICAgICAgICAgICB0aGlzLnpvb21SYW5nZUlucHV0LnZhbHVlID0gYCR7dGhpcy56b29tQ3Vycn1gO1xuICAgICAgICAgICAgdGhpcy56b29tSW5wdXQudmFsdWUgPSBgJHt0aGlzLnpvb21DdXJyICogMTAwfWA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHRoZSB6b29tIHdpdGggYSBzbGlkZXIgKHJhbmdlIGlucHV0KSAqL1xuICAgIGhhbmRsZVJhbmdlWm9vbShlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCB6b29tVmFsdWUgPSBwYXJzZUZsb2F0KHRhcmdldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuem9vbUlucHV0LnZhbHVlID0gYCR7em9vbVZhbHVlICogMTAwfWA7XG4gICAgICAgIHRoaXMuZWRpdG9yLnN0eWxlLnNjYWxlID0gYCR7em9vbVZhbHVlfWA7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgem9vbSB0aHJvdWdoIGlucHV0ICovXG4gICAgaGFuZGxlSW5wdXRab29tKCkge1xuICAgICAgICBsZXQgcHJldmlvdXNab29tID0gdGhpcy56b29tQ3VycjtcbiAgICAgICAgY29uc3Qgem9vbUFtb3VudCA9IHBhcnNlSW50KHRoaXMuem9vbUlucHV0LnZhbHVlLCAxMCkgLyAxMDA7XG4gICAgICAgIGNvbnN0IG1pblpvb20gPSBwYXJzZUZsb2F0KHRoaXMuem9vbVJhbmdlSW5wdXQubWluKTtcbiAgICAgICAgdGhpcy56b29tQ3VyciA9IHpvb21BbW91bnQgPj0gdGhpcy5NQVhfQUxMT1dFRF9aT09NID8gdGhpcy5NQVhfQUxMT1dFRF9aT09NIDogem9vbUFtb3VudDtcbiAgICAgICAgaWYgKHRoaXMuem9vbUN1cnIgPCBtaW5ab29tKSB7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNab29tIDwgbWluWm9vbSlcbiAgICAgICAgICAgICAgICBwcmV2aW91c1pvb20gPSAxO1xuICAgICAgICAgICAgdGhpcy56b29tSW5wdXQudmFsdWUgPSBgJHtwcmV2aW91c1pvb20gKiAxMDB9YDtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnN0eWxlLnNjYWxlID0gYCR7cHJldmlvdXNab29tfWA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy56b29tSW5wdXQudmFsdWUgPSBgJHt0aGlzLnpvb21DdXJyICogMTAwfWA7XG4gICAgICAgIHRoaXMuZWRpdG9yLnN0eWxlLnNjYWxlID0gYCR7dGhpcy56b29tQ3Vycn1gO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNlbGVjdHMgZW50aXJlIGlucHV0IGNvbnRlbnQgb25mb2N1cyAqL1xuICAgIGhhbmRsZUlucHV0Rm9jdXMoaW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gRW5mb3JjZXMgZGlnaXQgb25seSBpbnB1dCAqL1xuICAgIGVuZm9yZURpZ2l0T25seShlKSB7XG4gICAgICAgIGlmICghL0JhY2tzcGFjZXxcXGQvZy50ZXN0KGUua2V5KSlcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBkb2N1bWVudCB0aXRsZSBjaGFuZ2VcbiAgICAgKlxuICAgICAqL1xuICAgIC8qKiBAZGVzY3JpcHRpb24gSWYgdGhlIHRpdGxlIHZhbHVlIGlzIGludmFsaWQsIHNldCB0aGUgZG9jdW1lbnQgdGl0bGUgdG8gXCJVbm5hbWVkXCIgKi9cbiAgICBoYW5kbGVUaXRsZUJsdXIoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnRpdGxlSW5wdXQudmFsdWU7XG4gICAgICAgIGlmIChjb250ZW50LnJlcGxhY2UoL1xccyovZywgXCJcIikgIT09IFwiXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dC52YWx1ZSA9IFwiVW5uYW1lZFwiO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIE9uIHRpdGxlIGNoYW5nZSwgc2V0IGRvY3VtZW50LnRpdGxlICovXG4gICAgaGFuZGxlVGl0bGVJbnB1dCgpIHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLnRpdGxlSW5wdXQudmFsdWU7XG4gICAgICAgIGlmICh0aXRsZS5yZXBsYWNlKC9cXHMqL2csIFwiXCIpID09PSBcIlwiKSB7XG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IFwiQXp1IC0gVW5uYW1lZFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgTUFYX1RJVExFX0xFTkdUSCA9IDUwO1xuICAgICAgICAgICAgY29uc3QgZWxsaWRlZFN0cmluZyA9IHRpdGxlLmxlbmd0aCA+PSBNQVhfVElUTEVfTEVOR1RIID8gYCR7dGl0bGUuc3Vic3RyaW5nKDAsIE1BWF9USVRMRV9MRU5HVEggLSAzKX0uLi5gIDogdGl0bGU7XG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IGBBenUgLSAke2VsbGlkZWRTdHJpbmd9YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGV2ZW50cyByZWxhdGVkIHRvIHNldHRpbmcgY29uZmlndXJhdGlvblxuICAgICAqXG4gICAgICovXG4gICAgaW5zdGFudGlhdGVTZXR0aW5nc1VJKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLm9wZW5TZXR0aW5ncygpKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0Nsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlU2V0dGluZ3MoKSk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gT3BlbnMgdGhlIHNldHRpbmdzIHZpZXcsIHdoaWxlIGNsb3NpbmcgdGhlIG1haW4gdmlldyAqL1xuICAgIG9wZW5TZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5tYWluVmlldy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NWaWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBPcGVucyB0aGUgbWFpbiB2aWV3LCB3aGlsZSBjbG9zaW5nIHRoZSBzZXR0aW5ncyB2aWV3ICovXG4gICAgY2xvc2VTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1ZpZXcuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLm1haW5WaWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3dZID0gXCJoaWRkZW5cIjtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gQ29uZmlndXJlcyBzZXR0aW5nc1xuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1zeXN0ZW0tc2NoZW1lXCIpO1xuICAgICAgICB0aGlzLnRoZW1lc0dyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NldHRpbmdzLWFwcHJlYXJhbmNlLXRoZW1lc1wiKTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVNldHRpbmdzKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSW5pdGlhbGlzZXMgc2V0dGluZyBvcHRpb25zICovXG4gICAgaW5zdGFudGlhdGVTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVRoZW1lU2VsZWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSW5zdGFudGlhdGVzIGV2ZW50cyByZWxhdGVkIHRvIHRoZW1lIGNoYW5nZSovXG4gICAgaW5zdGFudGlhdGVUaGVtZVNlbGVjdGlvbigpIHtcbiAgICAgICAgZm9yIChjb25zdCB0aGVtZSBvZiB0aGlzLnRoZW1lc0dyaWQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IHRoZW1lQ29udGVudCA9IHRoZW1lLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICAgICAgaWYgKHRoZW1lQ29udGVudCAhPT0gXCJjdXN0b21cIikge1xuICAgICAgICAgICAgICAgIHRoZW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgdGhlbWVDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2xvclNjaGVtZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKTtcbiAgICAgICAgY29uc3QgZGV0ZWN0VGhlbWVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGhlbWVDb250YWluZXIudGV4dENvbnRlbnQgPSBlLm1hdGNoZXMgPyBcImRhcmtcIiA6IFwibGlnaHRcIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGhlbWVDb250YWluZXIuaW5uZXJUZXh0ID0gY29sb3JTY2hlbWUubWF0Y2hlcyA/IFwiZGFya1wiIDogXCJsaWdodFwiO1xuICAgICAgICBjb2xvclNjaGVtZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiBkZXRlY3RUaGVtZUNoYW5nZShlKSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uIGluaXRpYWxpc2VzIGV2ZW50cyByZWxhdGl2ZSB0byB3b3JkIGNvdW50LCB3b3JkIGxlbmd0aCwgbWlzdGFrZXMsXG4gKiBvciBhYm91dCB0aGUgZG9jdW1lbnQgaXRzZWxmIDtcbiAqXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWN0aWNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXRvclwiKTtcbiAgICAgICAgdGhpcy53b3JkQ291bnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dvcmQtY291bnRcIik7XG4gICAgICAgIHRoaXMuQ09VTlRfSU5URVJWQUwgPSA1MDAwO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVTdGF0aXN0aWNzKCk7XG4gICAgfVxuICAgIGluaXRpYWxpemVTdGF0aXN0aWNzKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZVdvcmRDb3VudCgpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIENvdW50IHdvcmRzIGF0IGFuIGludGVydmFsICovXG4gICAgY29uZmlndXJlV29yZENvdW50KCkge1xuICAgICAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHsgfSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gdGhpcy5lZGl0b3IuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TGVuZ3RoID0gdGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgvXFxzKy9nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoeCkgPT4geCAhPT0gXCJcIikubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmRDb3VudENvbnRhaW5lci5pbm5lclRleHQgPSBgJHt0ZXh0TGVuZ3RoID09PSAwID8gXCJub1wiIDogdGV4dExlbmd0aH0gd29yZCR7dGV4dExlbmd0aCA9PT0gMSA/IFwiXCIgOiBcInNcIn1gO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy5DT1VOVF9JTlRFUlZBTCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvbiBNYW5hZ2VzIHRoZSBzdG9yYWdlLCBzdG9yZXMgc29tZSB2YWx1ZXMgc3VjaCBhcyBwcmV2aW91cyBzZXNzaW9uIHpvb21cbiAqXG4gKiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXRvclwiKTtcbiAgICAgICAgdGhpcy56b29tUmFuZ2VJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjem9vbS1yYW5nZVwiKTtcbiAgICAgICAgdGhpcy56b29tSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3pvb20tY29udHJvbC1pbnB1dFwiKTtcbiAgICAgICAgdGhpcy56b29tQW1vdW50ID0gMTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVN0b3JhZ2UoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBJbnN0YXRpYXRlcyBhbGwgc3RvcmFnZSBtZXRob2RzICovXG4gICAgaW5zdGFudGlhdGVTdG9yYWdlKCkge1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSW5zdGFudGlhdGVzIGxvY2FsU3RvcmFnZSAqL1xuICAgIGluc3RhbnRpYXRlTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgdGhlbWU6IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIiksXG4gICAgICAgICAgICAgICAgbGFuZzogZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiem9vbUxldmVsXCIsIHRoaXMuem9vbUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiU2V0dGluZ3NcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFNldHRpbmdzKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgem9vbUxldmVsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ6b29tTGV2ZWxcIik7XG4gICAgICAgICAgICBpZiAoem9vbUxldmVsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tQW1vdW50ID0gcGFyc2VJbnQoem9vbUxldmVsLCAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tUmFuZ2VJbnB1dC52YWx1ZSA9IGAke3RoaXMuem9vbUFtb3VudCAvIDEwMH1gO1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbUlucHV0LnZhbHVlID0gYCR7dGhpcy56b29tQW1vdW50fWA7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc3R5bGUuc2NhbGUgPSBgJHt0aGlzLnpvb21BbW91bnQgLyAxMDB9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZldGNoZWRTZXR0aW5ncyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU2V0dGluZ3NcIik7XG4gICAgICAgICAgICBpZiAoZmV0Y2hlZFNldHRpbmdzID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzID0gSlNPTi5wYXJzZShmZXRjaGVkU2V0dGluZ3MpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc2V0dGluZ3MpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRoZW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHt2YWx1ZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGFuZ1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gSW1wbGVtZW50cyB0ZXh0IGNvcnJlY3Rpb25cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRDb3JyZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGV4dC1tZW51XCIpO1xuICAgICAgICB0aGlzLmVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdG9yXCIpO1xuICAgICAgICB0aGlzLmN1cnJlbnRXb3JkTGlzdExhbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLndvcmRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuQ09SUkVDVElPTl9JTlRFUlZBTCA9IDIwMDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRleHRDb3JyZWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gaW5zdGFudGlhdGVzIGFsbCBtZXRob2RzIHJlbGF0ZWQgdG8gdGV4dCBjb3JyZWN0aW9uICovXG4gICAgaW5pdGlhbGl6ZVRleHRDb3JyZWN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyZVRleHRDb3JyZWN0aW9uKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gQXR0ZW1wdHMgdG8gZmluZCBlcnJvcnMgd2l0aGluIHRoZSBkb2N1bWVudCAqL1xuICAgIGNvbmZpZ3VyZVRleHRDb3JyZWN0aW9uKCkge1xuICAgICAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHsgfSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBxdWV1ZU1pY3JvdGFzaygoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRXb3JkTGlzdExhbmcgPT09IFwiXCIgfHwgdGhpcy53b3JkTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFdvcmRMaXN0TGFuZyA9IFwiZnJlbmNoXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmxvYWREaWN0aW9ubmFyeShcImZyZW5jaFwiKS50aGVuKChqc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREaWN0aW9ubmFyeShqc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVyaWZ5VGV4dCgpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0sIHRoaXMuQ09SUkVDVElPTl9JTlRFUlZBTCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIExvYWRzIGEgc3BlY2lmaWVkIGRpY3Rpb25uYXJ5ICovXG4gICAgbG9hZERpY3Rpb25uYXJ5KGxhbmcpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYC4vanNvbi8ke2xhbmd9Lmpzb25gKTtcbiAgICAgICAgICAgIGNvbnN0IGRpY3Rpb25uYXJ5ID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25uYXJ5O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBzZXRzIHZhbHVlIHRoaXMud29yZExpc3QgKi9cbiAgICBzZXREaWN0aW9ubmFyeShkaWN0aW9ubmFyeSkge1xuICAgICAgICB0aGlzLndvcmRMaXN0ID0gZGljdGlvbm5hcnk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gRmluZHMgZXJyb3JzIGluIHRleHQgKi9cbiAgICB2ZXJpZnlUZXh0KCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMud29yZExpc3QubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGxldCBwYXJhSW5kZXggPSAwO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhIG9mIHRoaXMuZWRpdG9yLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBwYXJhLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIC8qIFRyaW1pbmcgYSBwbGFjZWhvbGRlciBcXHUyMDBCLCBaZXJvLXdpZHRoIHNwYWNlIGluIG9yZGVyIHRvIHJlbW92ZSBpdCBmcm9tIHRva2VucyAqL1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0Q29udGVudCA9PT0gbnVsbCB8fCB0ZXh0Q29udGVudC5yZXBsYWNlKC9cXHUyMDBCL2csIFwiXCIpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuc2NhblRleHQocGFyYSwgcGFyYUluZGV4KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYUluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNjYW5zIHRleHQgY29udGVudCBmb3IgZXJyb3JzLCB0aGVuIHN0cnVjdHVyZXMgZXJyb3JzIGluIGFuIG9iamVjdCAqL1xuICAgIHNjYW5UZXh0KHBhcmFncmFwaCwgcGFyYUluZGV4KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltzY2FubmluZy4uLl1cIik7XG4gICAgICAgICAgICBjb25zdCB0ZXh0Q29udGVudCA9IHBhcmFncmFwaC50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFx1MjAwQi9nLCBcIlwiKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHUwMEEwL2csIFwiXCIpO1xuICAgICAgICAgICAgY29uc3QgdG9rZW5zID0gdGV4dENvbnRlbnQuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgY29uc3QgZXJyb3JBcnJheSA9IFtdO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRXb3JkTGlzdExhbmcpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZnJlbmNoXCI6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yVGVybSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYUluZGV4OiBwYXJhSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG50aE9jY3VyZW5jZTogZXJyb3JBcnJheS5maWx0ZXIoKHgpID0+IHgudGVybSA9PT0gdG9rZW4gfHwgeC5wYXJhSW5kZXggPT09IHBhcmFJbmRleCkubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJtOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWRkVGVybSA9ICh0ZXJtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnJvclRlcm0sIFwidGVybVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGVybSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckFycmF5LnB1c2goZXJyb3JUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB0b2tlbi5pbmNsdWRlcyhcIidcIikgPyB0b2tlbi5zcGxpdChcIidcIikgOiB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdvcmQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyV29yZCA9IHdvcmQucmVwbGFjZSgvW15cXHdcXHNdKy9nLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogZXhjbHVkZSBudW1iZXJzLCBkZWNpbWFsIG51bWJlcnMsIGV4cG9uZW50aWFsIG5vdGF0aW9uLCBpbWFnaW5hcnkgZm9ybXMgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cldvcmQubWF0Y2goLygtP1xcZCsoLlxcZCspPygoZXxFKShcXCt8LSlcXGQrKT9pPykoPyFbYS16QS1aXSkvZykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLndvcmRMaXN0LmluY2x1ZGVzKHN0cldvcmQudG9Mb3dlckNhc2UoKSkgfHwgc3RyV29yZC5yZXBsYWNlKC9cXHMrfFxcdTIwMEIvZywgXCJcIikgPT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRlcm0oc3RyV29yZC50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHdvcmQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGNhc2UgZm9yIHRlcm1zIGNvbXBvc2VkIGJ5IGVsaXNpb24gc3VjaCBhcyBcImMnZXN0XCIgb3IgXCJwcmVzcXUnw65sZVwiICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQuZm9yRWFjaCgocGFydCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBwYXJ0LnJlcGxhY2UoL1teXFx3XFxzXSsvZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgXCJjJ2VzdFwiIGlzIGJyb2tlbiBpbnRvIFwiY1wiIGFuZCBcImVzdFwiLCBidXQgXCJjXCIgaXMgbm90IGEgdmFsaWQgdGVybSwgYnV0IGJ5IGVsaXNpb24sIFwiY2VcIiBpcyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLndvcmRMaXN0LmluY2x1ZGVzKChwICsgXCJlXCIpLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGVybSgocCArIFwiZVwiKS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMud29yZExpc3QuaW5jbHVkZXMocC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRlcm0ocC50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckFycmF5Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcmtJbmNvcnJlY3RUZXJtKGVycm9yQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBtYXJrcyBpbmNvcnJlY3QgdGVybXMgd2l0aGluIHRoZSBET00sIGFuZCBzdWdnZXN0aW9ucyBhbG9uZyB3aXRoIGl0ICovXG4gICAgbWFya0luY29ycmVjdFRlcm0oZXJyb3JBcnJheSkge1xuICAgICAgICAvLyBcXHUyMDBDLCBcXHVGRUZGXG4gICAgICAgIGVycm9yQXJyYXkuZm9yRWFjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhZ3JhcGggPSB0aGlzLmVkaXRvci5jaGlsZHJlbltlcnIucGFyYUluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHRlcm1SZWdleCA9IG5ldyBSZWdFeHAoYFxcXFxiKCR7ZXJyLnRlcm19KVxcXFxiYCwgXCJnXCIpO1xuICAgICAgICAgICAgaWYgKCFwYXJhZ3JhcGgudGV4dENvbnRlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgcGFyYWdyYXBoLnRleHRDb250ZW50ID0gcGFyYWdyYXBoLnRleHRDb250ZW50LnJlcGxhY2UodGVybVJlZ2V4LCBcIlxcdUZFRkYkMVxcdTIwMENcIik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVkaXRvci5pbm5lckhUTUwgPSB0aGlzLmVkaXRvci5pbm5lckhUTUwucmVwbGFjZSgvXFx1RkVGRiguKj8pXFx1MjAwQy9nLCBcIjxzcGFuIGRhdGEtdGVtcC1lcnI+JDE8L3NwYW4+XCIpO1xuICAgICAgICBjb25zdCBlcnJvck5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXRlbXAtZXJyXVwiKTtcbiAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiBlcnJvck5vZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9IGVycm9yLmlubmVySFRNTDtcbiAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgICAgIGVycm9yLnJlcGxhY2VXaXRoKHNwYW4pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGxvb3BpbmcgYWdhaW4gc2luY2UgbG9vcGluZyBwYXJhZ3JhcGggYnkgcGFyYWdyYXBoIG9ubHkgcHJlc2VydmVzIHRoZSBsYXN0IHBhcmFncmFwaCdzIGV2ZW50cyAqL1xuICAgICAgICBjb25zdCBlcnJvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXJyb3JcIik7XG4gICAgICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICAgICAgICBlcnJvci5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGUpID0+IHRoaXMuc2hvd1N1Z2dlc3Rpb25zKGUpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNob3dzIHN1Z2dlc3Rpb25zIHVzaW5nIHRoZSBMZXZlbnN0aGVpbiBkaXN0YW5jZSBhbGdvcml0aG0qL1xuICAgIHNob3dTdWdnZXN0aW9ucyhlKSB7XG4gICAgICAgIGNvbnN0IHNwYW4gPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3QgdGVybSA9IHNwYW4udGV4dENvbnRlbnQ7XG4gICAgICAgIGlmICghdGVybSB8fCB0ZXJtLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgbGV0IGZpbHRlcmVkTGlzdCA9IFtdO1xuICAgICAgICBpZiAodGVybS5sZW5ndGggPD0gMykge1xuICAgICAgICAgICAgZmlsdGVyZWRMaXN0ID0gdGhpcy53b3JkTGlzdC5maWx0ZXIoKHgpID0+IHguc3RhcnRzV2l0aCh0ZXJtKSAmJiB4Lmxlbmd0aCA8IHRlcm0ubGVuZ3RoICsgMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmaWx0ZXJlZExpc3QgPSB0aGlzLndvcmRMaXN0LmZpbHRlcigoeCkgPT4geC5zdGFydHNXaXRoKHRlcm0uc2xpY2UoMCwgMykpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhY2N1bXVsYXRvciA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHdvcmQgb2YgZmlsdGVyZWRMaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBlZGl0RGlzdGFuY2UgPSB0aGlzLmNvbXB1dGVMZXZlbnN0aGVpbkRpc3RhbmNlKHdvcmQsIHRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICBhY2N1bXVsYXRvci5wdXNoKHsgd29yZDogd29yZCwgZWRpdDogZWRpdERpc3RhbmNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1Z2dlc3Rpb25zID0gYWNjdW11bGF0b3JcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLmVkaXQgLSBiLmVkaXQpXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAuc2xpY2UoMCwgMyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHN1Z2dlc3Rpb25zKTtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBpZiAoc3VnZ2VzdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gYFske3RoaXMuY3VycmVudFdvcmRMaXN0TGFuZ31dIE5vIHN1Z2dlc3Rpb25zIGZvciB0ZXJtIFwiJHt0ZXJtfVwiYDtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBtZXNzYWdlLnRleHRDb250ZW50ID0gYFske3RoaXMuY3VycmVudFdvcmRMaXN0TGFuZ31dIENvcnJlY3Qgb3J0aG9ncmFwaCBmb3IgdGVybSBcIiR7dGVybX1cImA7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgICAgICAgICAgc3VnZ2VzdGlvbnMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gcy53b3JkO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzLndvcmQpO1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnJlcGxhY2VXaXRoKHRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBjb21wdXRlcyBMZXZlbnN0aGVpbiBkaXN0YW5jZVxuICAgICAqIEBzZWUgaHR0cHM6Ly9yb3NldHRhY29kZS5vcmcvd2lraS9MZXZlbnNodGVpbl9kaXN0YW5jZSNUeXBlU2NyaXB0XG4gICAgICovXG4gICAgY29tcHV0ZUxldmVuc3RoZWluRGlzdGFuY2UoZmlyc3QsIHNlY29uZCkge1xuICAgICAgICBjb25zdCBtID0gZmlyc3QubGVuZ3RoLCBuID0gc2Vjb25kLmxlbmd0aDtcbiAgICAgICAgbGV0IHQgPSBbLi4uQXJyYXkobiArIDEpLmtleXMoKV0sIHUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtOyBpKyspIHtcbiAgICAgICAgICAgIHUgPSBbaSArIDFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHtcbiAgICAgICAgICAgICAgICB1W2ogKyAxXSA9IGZpcnN0W2ldID09PSBzZWNvbmRbal0gPyB0W2pdIDogTWF0aC5taW4odFtqXSwgdFtqICsgMV0sIHVbal0pICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQgPSB1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxIC0gdVtuXSAvIE1hdGgubWF4KG0sIG4pO1xuICAgIH1cbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uIGNvbmZpZ3VyYXRlcyBhdXRvbWF0aWMgLyBtYW51YWwgdHJhbnNsYXRpb25zXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2xhdGlvbnMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdG9yXCIpO1xuICAgICAgICB0aGlzLmZvcm1hdEJvbGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC1ib2xkXCIpO1xuICAgICAgICB0aGlzLmZvcm1hdEl0YWxpY0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWl0YWxpY3NcIik7XG4gICAgICAgIHRoaXMuZm9ybWF0VW5kZXJsaW5lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtdW5kZXJsaW5lXCIpO1xuICAgICAgICB0aGlzLmZvcm1hdFN0cmlrZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LXN0cmlrZVwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0FjY2Vzc2liaWxpdHlUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci1hY2NdXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzQXBwZWFyYW5jZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLWFwcGVhcmFuY2VdXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdHItZGVzY3JpcHRpb25dXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzSW50ZXJmYWNlTGFuZ3VhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdHItaW50bF1cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUaGVtZXNUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci10aGVtZXNdXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzRGFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci10aC1kYXJrXVwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc0xpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLXRoLWxpZ2h0XVwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc1N5c3RlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci10aC1zeXNdXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzQ3VzdG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLXRoLWN1c11cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci1zZXR0aW5nc11cIik7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGUtaW5wdXRcIik7XG4gICAgICAgIHRoaXMuaW5pdGlhbENvbnRlbnREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luaXRpYWwtY29udGVudFwiKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZVNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGFuZ3VhZ2Utb3B0aW9uc1wiKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVRyYW5zbGF0aW9ucygpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyBldmVudHMgZm9yIHRyYW5zbGF0aW9ucyAqL1xuICAgIGluc3RhbnRpYXRlVHJhbnNsYXRpb25zKCkge1xuICAgICAgICAoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgdGhpcy5mZXRjaFRyYW5zbGF0aW9ucygpLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9ucyA9IGpzb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKCk7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVMYW5ndWFnZVNlbGVjdGlvbigpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIHNldHMgdGhlIGludGVyZmFjZSBsYW5ndWFnZSwgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZSAqL1xuICAgIHNldEludGVyZmFjZUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykubGVuZ3RoID09PSAwIHx8IHRoaXMudHJhbnNsYXRpb25zW2xhbmd1YWdlXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbm9iaiA9IHRoaXMudHJhbnNsYXRpb25zW2xhbmd1YWdlXTtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0LnBsYWNlaG9sZGVyID0gdHJhbnNsYXRpb25vYmouZG9jdW1lbnRfbm9fdGl0bGVfcGxhY2Vob2xkZXI7XG4gICAgICAgIGlmICh0aGlzLnRpdGxlSW5wdXQudmFsdWUgPT09IFwiRG9jdW1lbnQgMVwiKSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlSW5wdXQudmFsdWUgPSB0cmFuc2xhdGlvbm9iai5kb2N1bWVudF9pbml0aWFsX3RpdGxlO1xuICAgICAgICB9XG4gICAgICAgIC8qIEZJWE1FOiBUaGlzIGlzIHZlcnkgdWdseSBidXQgaXQgd29ya3Mgwq9cXF8o44OEKV8vwq8gKi9cbiAgICAgICAgdGhpcy5pbml0aWFsQ29udGVudERpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBsYWNlaG9sZGVyXCIsIHRyYW5zbGF0aW9ub2JqLmRvY3VtZW50X3BsYWNlX2hvbGRlcik7XG4gICAgICAgIHRoaXMuZm9ybWF0Qm9sZEJ1dHRvbi5jaGlsZHJlblswXS5pbm5lckhUTUwgPSB0cmFuc2xhdGlvbm9iai5mb3JtYXRfdGV4dF9idXR0b24uYm9sZDtcbiAgICAgICAgdGhpcy5mb3JtYXRJdGFsaWNCdXR0b24uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gdHJhbnNsYXRpb25vYmouZm9ybWF0X3RleHRfYnV0dG9uLml0YWxpYztcbiAgICAgICAgdGhpcy5mb3JtYXRVbmRlcmxpbmVCdXR0b24uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gdHJhbnNsYXRpb25vYmouZm9ybWF0X3RleHRfYnV0dG9uLnVuZGVybGluZTtcbiAgICAgICAgdGhpcy5mb3JtYXRTdHJpa2VCdXR0b24uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gdHJhbnNsYXRpb25vYmouZm9ybWF0X3RleHRfYnV0dG9uLnN0cmlrZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RpdGxlLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MudGl0bGU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9ub2JqLnNldHRpbmdzLmRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnNldHRpbmdzQWNjZXNzaWJpbGl0eVRpdGxlLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYWNjZXNzaWJpbGl0eS50aXRsZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0ludGVyZmFjZUxhbmd1YWdlLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYWNjZXNzaWJpbGl0eS5pbnRlcmZhY2VfbGFuZ3VhZ2UudGl0bGU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NBcHBlYXJhbmNlVGl0bGUudGV4dENvbnRlbnQgPSB0cmFuc2xhdGlvbm9iai5zZXR0aW5ncy5hcHBlYXJhbmNlLnRpdGxlO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzVGl0bGUudGV4dENvbnRlbnQgPSB0cmFuc2xhdGlvbm9iai5zZXR0aW5ncy5hcHBlYXJhbmNlLnRoZW1lX3RpdGxlO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzTGlnaHQudGV4dENvbnRlbnQgPSB0cmFuc2xhdGlvbm9iai5zZXR0aW5ncy5hcHBlYXJhbmNlLnRoZW1lcy5saWdodDtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc0RhcmsudGV4dENvbnRlbnQgPSB0cmFuc2xhdGlvbm9iai5zZXR0aW5ncy5hcHBlYXJhbmNlLnRoZW1lcy5kYXJrO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzU3lzdGVtLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYXBwZWFyYW5jZS50aGVtZXMuc3lzdGVtO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzQ3VzdG9tLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYXBwZWFyYW5jZS50aGVtZXMuY3VzdG9tO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGZldGNoZXMgdGhlIC5qc29uIGZpbGUgY29udGFpbmluZyBhbGwgdHJhbnNsYXRpb25zICovXG4gICAgZmV0Y2hUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKFwiLi9qc29uL3RyYW5zbGF0aW9ucy5qc29uXCIpO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRpb25zID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9ucztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gQWxsb3dzIGZvciB0aGUgdXNlciB0byBjaGFuZ2UgdGhlaXIgbGFuZ3VhZ2UgKi9cbiAgICBpbnN0YW50aWF0ZUxhbmd1YWdlU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLmxhbmd1YWdlU2VsZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRMYW5nID0gdGhpcy5sYW5ndWFnZVNlbGVjdGlvbi5jaGlsZHJlblt0aGlzLmxhbmd1YWdlU2VsZWN0aW9uLnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZShcImxhbmdcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZExhbmcpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGFuZyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRBdHRyaWJ1dGUoXCJsYW5nXCIsIFwiemgtaGFuc1wiKTtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZWN0ZWRMYW5nKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImphXCI6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldEF0dHJpYnV0ZShcImxhbmdcIiwgXCJqYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiemgtaGFudFwiOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRBdHRyaWJ1dGUoXCJsYW5nXCIsIFwiemgtaGFudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKFwibGFuZ1wiLCBzZWxlY3RlZExhbmcpO1xuICAgICAgICAgICAgdGhpcy5zZXRJbnRlcmZhY2VMYW5ndWFnZShzZWxlY3RlZExhbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEVkaXRvciBmcm9tIFwiLi9tb2R1bGVzL2VkaXRvclwiO1xuY2xhc3MgTWFpbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSW5pdGlhbGl6ZXMgdGhlIEFwcCAqL1xuICAgIGluaSgpIHtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVNlcnZpY2VXb3JrZXIoKTtcbiAgICAgICAgbmV3IEVkaXRvcigpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyBhIFNlcnZpY2Ugd29ya2VyICovXG4gICAgaW5zdGFudGlhdGVTZXJ2aWNlV29ya2VyKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKCEoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbU2VydmljZSB3b3JrZXJdIDogVW5hdmFpbGFibGVcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWllbGQgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIuL3N3LmpzXCIsIHtcbiAgICAgICAgICAgICAgICBzY29wZTogXCIuL3NyYy9cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5uZXcgTWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
