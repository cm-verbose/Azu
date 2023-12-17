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
              this.ctxCover.style.display = "block";
              this.contextMenu.style.display = "block";
              this.moveMenu(e.clientX, e.clientY, e);
            });
            this.handleCloseMenu();
          }
          /** @description move the menu to a specific position */
          moveMenu(x, y, event) {
            this.contextMenu.style.left = `${x}px`;
            this.contextMenu.style.top = `${y}px`;
            switch (event.target) {
              default:
                {
                  console.log(event.target);
                }
                break;
            }
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
          /** @description Show dropdown indicating the font list under the font select menu */
          instantiateDropdown() {
            return __awaiter(this, void 0, void 0, function* () {
              const boundBox = this.fontFamilyJoiner.getBoundingClientRect();
              this.fontFamilyDropdown.style.width = `${boundBox.width}px`;
              this.fontFamilyDropdown.style.height = `${boundBox.height}px`;
              this.fontFamilyDropdown.style.left = `${boundBox.left}px`;
              this.fontFamilyDropdown.style.top = `${boundBox.top + boundBox.height}px`;
              this.fontFamilyInput.addEventListener("focus", () => {
                this.fontFamilyDropdown.style.display = "block";
              });
              this.fontFamilyInput.addEventListener("blur", () => {
                this.fontFamilyDropdown.style.display = "none";
              });
            });
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
            console.log(clipboardData);
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
            this.MAX_TITLE_LENGTH = 50;
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
              const ellidedString =
                title.length >= this.MAX_TITLE_LENGTH
                  ? `${title.substring(0, this.MAX_TITLE_LENGTH - 3)}...`
                  : title;
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
                    document.body.setAttribute("lang", `${value}`);
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
          /** FIXME: Revert user cursor position on edit */
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
              this.observeErrorChange(error);
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
              message.innerHTML = `<b>${this.currentWordListLang}</b> No suggestions for term "${term}"`;
              this.contextMenu.appendChild(message);
            } else {
              const message = document.createElement("span");
              message.innerHTML = `<b>${this.currentWordListLang}</b> Correct orthograph for term "${term}"`;
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
                console.log(mutation);
                const textContent = mutation.target.textContent;
                if (mutation.type !== "characterData" || !textContent) return;
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
            this.documentNames = new Set();
            this.translations = {};
            this.instantiateTranslations();
          }
          /** @description instantiates events for translations */
          instantiateTranslations() {
            (() =>
              __awaiter(this, void 0, void 0, function* () {
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
              const translations = yield response.json();
              return translations;
            });
          }
          /** @description sets the interface language, to the specified value */
          setInterfaceLanguage(language) {
            if (Object.keys(this.translations).length === 0 || this.translations[language] === undefined) return;
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
            this.settingsInterfaceLanguage.textContent =
              translationobj.settings.accessibility.interface_language.title;
            this.settingsAppearanceTitle.textContent = translationobj.settings.appearance.title;
            this.settingsThemesTitle.textContent = translationobj.settings.appearance.theme_title;
            this.settingsThemesLight.textContent = translationobj.settings.appearance.themes.light;
            this.settingsThemesDark.textContent = translationobj.settings.appearance.themes.dark;
            this.settingsThemesSystem.textContent = translationobj.settings.appearance.themes.system;
            this.settingsThemesCustom.textContent = translationobj.settings.appearance.themes.custom;
          }
          /** @description Allows for the user to change their language */
          instantiateLanguageSelection() {
            this.languageSelection.addEventListener("change", () => {
              const selectedLang =
                this.languageSelection.children[this.languageSelection.selectedIndex].getAttribute("lang");
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
            console.error("[Service worker] : Unavailable, please upgrade your browser");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksdURBQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2VkaXRvci50cyIsIndlYnBhY2s6Ly9henUvLi9zcmMvdHMvbW9kdWxlcy9mdW5jdGlvbnMvY29udGV4dF9tZW51LnRzIiwid2VicGFjazovL2F6dS8uL3NyYy90cy9tb2R1bGVzL2Z1bmN0aW9ucy9kb2N1bWVudF9zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL2VkaXRvcl9mdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL2ludGVyZmFjZS50cyIsIndlYnBhY2s6Ly9henUvLi9zcmMvdHMvbW9kdWxlcy9mdW5jdGlvbnMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL3N0YXRpc3RpY3MudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vYXp1Ly4vc3JjL3RzL21vZHVsZXMvZnVuY3Rpb25zL3RleHRfY29ycmVjdGlvbi50cyIsIndlYnBhY2s6Ly9henUvLi9zcmMvdHMvbW9kdWxlcy9mdW5jdGlvbnMvdHJhbnNsYXRpb25zLnRzIiwid2VicGFjazovL2F6dS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9henUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2F6dS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2F6dS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2F6dS8uL3NyYy90cy9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVkaXRvckZ1bmN0aW9ucyBmcm9tIFwiLi9mdW5jdGlvbnMvZWRpdG9yX2Z1bmN0aW9uc1wiO1xuaW1wb3J0IFNldHRpbmdzIGZyb20gXCIuL2Z1bmN0aW9ucy9zZXR0aW5nc1wiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vZnVuY3Rpb25zL3N0b3JhZ2VcIjtcbmltcG9ydCBTdGF0aWN0aWNzIGZyb20gXCIuL2Z1bmN0aW9ucy9zdGF0aXN0aWNzXCI7XG5pbXBvcnQgVXNlckludGVyZmFjZSBmcm9tIFwiLi9mdW5jdGlvbnMvaW50ZXJmYWNlXCI7XG5pbXBvcnQgVGV4dENvcnJlY3Rpb24gZnJvbSBcIi4vZnVuY3Rpb25zL3RleHRfY29ycmVjdGlvblwiO1xuaW1wb3J0IERvY3VtZW50U3R5bGVzIGZyb20gXCIuL2Z1bmN0aW9ucy9kb2N1bWVudF9zdHlsZXNcIjtcbmltcG9ydCBUcmFuc2xhdGlvbnMgZnJvbSBcIi4vZnVuY3Rpb25zL3RyYW5zbGF0aW9uc1wiO1xuaW1wb3J0IENvbnRleHRNZW51IGZyb20gXCIuL2Z1bmN0aW9ucy9jb250ZXh0X21lbnVcIjtcbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvbiBSZXByZW5zZW50cyB0aGUgZWRpdG9yIGl0c2VsZiwgaW5zdGFudGlhdGVzIGZ1bmN0aW9ucyB1bmRlciBzdWItY2xhc3Nlc1xuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbmkoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBpbml0aWFsaXplcyB0aGUgZWRpdG9yICovXG4gICAgaW5pKCkge1xuICAgICAgICBuZXcgU3RvcmFnZSgpO1xuICAgICAgICBuZXcgVXNlckludGVyZmFjZSgpO1xuICAgICAgICB0aGlzLnNldEV2ZW50cygpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIENvbmZpZ3VyZXMgZWRpdG9yIGZ1bmN0aW9ucyAqL1xuICAgIHNldEV2ZW50cygpIHtcbiAgICAgICAgbmV3IENvbnRleHRNZW51KCk7XG4gICAgICAgIG5ldyBEb2N1bWVudFN0eWxlcygpO1xuICAgICAgICBuZXcgRWRpdG9yRnVuY3Rpb25zKCk7XG4gICAgICAgIG5ldyBTZXR0aW5ncygpO1xuICAgICAgICBuZXcgU3RhdGljdGljcygpO1xuICAgICAgICBuZXcgVGV4dENvcnJlY3Rpb24oKTtcbiAgICAgICAgbmV3IFRyYW5zbGF0aW9ucygpO1xuICAgIH1cbn1cbiIsIi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHRoZSBhIGN1c3RvbSBjb250ZXh0IG1lbnVcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRleHRNZW51IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGV4dC1tZW51XCIpO1xuICAgICAgICB0aGlzLmN0eENvdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWNvdmVyXCIpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlQ29udGV4dE1lbnUoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBpbnN0YW50aWF0ZXMgbWV0aG9kcyB0byBtYW5pcHVsYXRlIHRoZSBjb250ZXh0IG1lbnUgKi9cbiAgICBpbnN0YW50aWF0ZUNvbnRleHRNZW51KCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4Q292ZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMubW92ZU1lbnUoZS5jbGllbnRYLCBlLmNsaWVudFksIGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5oYW5kbGVDbG9zZU1lbnUoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBtb3ZlIHRoZSBtZW51IHRvIGEgc3BlY2lmaWMgcG9zaXRpb24gKi9cbiAgICBtb3ZlTWVudSh4LCB5LCBldmVudCkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LnN0eWxlLmxlZnQgPSBgJHt4fXB4YDtcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zdHlsZS50b3AgPSBgJHt5fXB4YDtcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQ2xvc2VzIHRoZSBtZW51IG9uIGV4aXQgb2YgdGhlIGNvdmVyICovXG4gICAgaGFuZGxlQ2xvc2VNZW51KCkge1xuICAgICAgICB0aGlzLmN0eENvdmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN0eENvdmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGRvY3VtZW50IHN0eWxlcywgc3VjaCBhcyBib2xkLCBpdGFsaWNzLCBzdXBlcnNjcmlwdCwgZm9udHMsXG4gKiB0ZXh0IGp1c3RpZmljYXRpb24sIGV0Yy5cbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50U3R5bGVzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mb250RmFtaWx5Sm9pbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0LWZvcm1hdC1mb250XCIpO1xuICAgICAgICB0aGlzLmZvbnRGYW1pbHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWZvbnQtZmFtaWx5XCIpO1xuICAgICAgICB0aGlzLmZvbnRGYW1pbHlEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9udC1mYW1pbHktZHJvcGRvd25cIik7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0b3JcIik7XG4gICAgICAgIHRoaXMuYm9sZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWJvbGRcIik7XG4gICAgICAgIHRoaXMuaXRhbGljQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtaXRhbGljc1wiKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5TGVmdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWp1c3RpZnktbGVmdFwiKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5Q2VudGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtanVzdGlmeS1jZW50ZXJcIik7XG4gICAgICAgIHRoaXMuanVzdGlmeVJpZ2h0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtanVzdGlmeS1yaWdodFwiKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5RXZlbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWp1c3RpZnktZXZlblwiKTtcbiAgICAgICAgdGhpcy51bmRlcmxpbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC11bmRlcmxpbmVcIik7XG4gICAgICAgIHRoaXMuc3RyaWtlQnV0dG9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtc3RyaWtlXCIpO1xuICAgICAgICB0aGlzLnN1cFNjcmlwdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LXN1cFwiKTtcbiAgICAgICAgdGhpcy5zdWJTY3JpcHRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC1zdWJcIik7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVEb2N1bWVudFN0eWxlcygpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyBkb2N1bWVudCBzdHlsZXMgKi9cbiAgICBpbnN0YW50aWF0ZURvY3VtZW50U3R5bGVzKCkge1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlVGV4dFN0eWxlcygpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlVGV4dEp1c3RpZmljYXRpb24oKTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZURyb3Bkb3duKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSW5zdGFudGlhdGUgdGV4dCBzdHlsZXMgKGJvbGQsIGl0YWxpY3MsIGZvbnQuLi4pICovXG4gICAgaW5zdGFudGlhdGVUZXh0U3R5bGVzKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogRklYTUU6IFRISVMgSVMgREVQRUNSRUNBVEVEIEFORCBDT1VMRCBTVE9QIFdPUktJTkcgQVQgQU5ZIE1PTUVOVFxuICAgICAgICAgKiBUT0RPOiBUSElTIElTIEZFQVRVUkUgRElGRkVSUyBGUk9NIEJST1dTRVJTIFRPIEJST1dTRVJTXG4gICAgICAgICAqICovXG4gICAgICAgIHRoaXMuYm9sZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJib2xkXCIsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMuaXRhbGljQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkb2N1bWVudC5leGVjQ29tbWFuZChcIml0YWxpY1wiLCBmYWxzZSkpO1xuICAgICAgICB0aGlzLnVuZGVybGluZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJ1bmRlcmxpbmVcIiwgZmFsc2UpKTtcbiAgICAgICAgdGhpcy5zdHJpa2VCdXR0b25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwic3RyaWtlVGhyb3VnaFwiLCBmYWxzZSkpO1xuICAgICAgICB0aGlzLnN1cFNjcmlwdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJzdXBlclNjcmlwdFwiLCBmYWxzZSkpO1xuICAgICAgICB0aGlzLnN1YlNjcmlwdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJzdWJTY3JpcHRcIiwgZmFsc2UpKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBTZXRzIGV2ZW50cyBmb3IgdGV4dCBqdXN0aWZpY2F0aW9uIGJ5IHRoZSBjbGljayBvZiBhIGJ1dHRvbiAqL1xuICAgIGluc3RhbnRpYXRlVGV4dEp1c3RpZmljYXRpb24oKSB7XG4gICAgICAgIHRoaXMuanVzdGlmeUNlbnRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVKdXN0aWZpY2F0aW9uKFwiY2VudGVyXCIpKTtcbiAgICAgICAgdGhpcy5qdXN0aWZ5TGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5oYW5kbGVKdXN0aWZpY2F0aW9uKFwibGVmdFwiKSk7XG4gICAgICAgIHRoaXMuanVzdGlmeVJpZ2h0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmhhbmRsZUp1c3RpZmljYXRpb24oXCJyaWdodFwiKSk7XG4gICAgICAgIHRoaXMuanVzdGlmeUV2ZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaGFuZGxlSnVzdGlmaWNhdGlvbihcImp1c3RpZnlcIikpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGV4dCBqdXN0aWZpY2F0aW9uIGV2ZW50cyAqL1xuICAgIGhhbmRsZUp1c3RpZmljYXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGxldCBwYXJlbnROb2RlID0gc2VsZWN0aW9uLmZvY3VzTm9kZTtcbiAgICAgICAgICAgIC8qIHJlY3Vyc2l2ZWx5IHRyYXZlcnNlIHBhcmVudHMgdG8gZmluZCB0aGUgb25lcyB0aGF0IGFyZSBwYXJhZ3JhcGggbGV2ZWxlZCAqL1xuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50ICE9PSB0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnROb2RlICE9PSBudWxsICYmIHBhcmVudE5vZGUucGFyZW50RWxlbWVudCAhPT0gdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgPT09IG51bGwgfHwgcGFyZW50Tm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFncmFwaE5vZGUgPSBwYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5hbmNob3JOb2RlID09PSBzZWxlY3Rpb24uZm9jdXNOb2RlKSB7XG4gICAgICAgICAgICAgICAgcGFyYWdyYXBoTm9kZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRleHQtYWxpZ25cIiwgcG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGVuZE5vZGUgPSBzZWxlY3Rpb24uYW5jaG9yTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAoZW5kTm9kZSAmJiBlbmROb2RlLnBhcmVudEVsZW1lbnQgIT09IHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChlbmROb2RlICE9PSBudWxsICYmIGVuZE5vZGUucGFyZW50RWxlbWVudCAhPT0gdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZE5vZGUgPSBlbmROb2RlID09PSBudWxsIHx8IGVuZE5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVuZE5vZGUucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWVuZE5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZEVuZFBvc2l0aW9uID0gQXJyYXkuZnJvbSh0aGlzLmVkaXRvci5jaGlsZHJlbikuaW5kZXhPZihlbmROb2RlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFN0YXJ0UG9zaXRpb24gPSBBcnJheS5mcm9tKHRoaXMuZWRpdG9yLmNoaWxkcmVuKS5pbmRleE9mKHBhcmFncmFwaE5vZGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uU2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogY2hpbGRTdGFydFBvc2l0aW9uIDwgY2hpbGRFbmRQb3NpdGlvbiA/IGNoaWxkU3RhcnRQb3NpdGlvbiA6IGNoaWxkRW5kUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGVuZDogKGNoaWxkU3RhcnRQb3NpdGlvbiA8IGNoaWxkRW5kUG9zaXRpb24gPyBjaGlsZEVuZFBvc2l0aW9uIDogY2hpbGRTdGFydFBvc2l0aW9uKSArIDEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gcG9zaXRpb25TZXQuc3RhcnQ7IGkgPCBwb3NpdGlvblNldC5lbmQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmNoaWxkcmVuW2ldKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZShcImRhdGEtdGV4dC1hbGlnblwiLCBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNob3cgZHJvcGRvd24gaW5kaWNhdGluZyB0aGUgZm9udCBsaXN0IHVuZGVyIHRoZSBmb250IHNlbGVjdCBtZW51ICovXG4gICAgaW5zdGFudGlhdGVEcm9wZG93bigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kQm94ID0gdGhpcy5mb250RmFtaWx5Sm9pbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5mb250RmFtaWx5RHJvcGRvd24uc3R5bGUud2lkdGggPSBgJHtib3VuZEJveC53aWR0aH1weGA7XG4gICAgICAgICAgICB0aGlzLmZvbnRGYW1pbHlEcm9wZG93bi5zdHlsZS5oZWlnaHQgPSBgJHtib3VuZEJveC5oZWlnaHR9cHhgO1xuICAgICAgICAgICAgdGhpcy5mb250RmFtaWx5RHJvcGRvd24uc3R5bGUubGVmdCA9IGAke2JvdW5kQm94LmxlZnR9cHhgO1xuICAgICAgICAgICAgdGhpcy5mb250RmFtaWx5RHJvcGRvd24uc3R5bGUudG9wID0gYCR7Ym91bmRCb3gudG9wICsgYm91bmRCb3guaGVpZ2h0fXB4YDtcbiAgICAgICAgICAgIHRoaXMuZm9udEZhbWlseUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb250RmFtaWx5RHJvcGRvd24uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5mb250RmFtaWx5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9udEZhbWlseURyb3Bkb3duLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gQ29uZmlndXJlcyBldmVudHMgcmVsYXRpdmUgdG8gdGhlIGZ1bmN0aW9ucyBvZiB0aGUgdGV4dCBlZGl0aW5nXG4gKiB3aXRoaW4gdGhlIGVkaXRvclxuICpcbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckZ1bmN0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0b3JcIik7XG4gICAgICAgIHRoaXMuZm9ybWF0Rm9udFNpemVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWZvbnQtc2l6ZVwiKTtcbiAgICAgICAgdGhpcy5pbml0aWFsRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbml0aWFsLWNvbnRlbnRcIik7XG4gICAgICAgIHRoaXMuY29uZmlndXJlRWRpdG9yRnVuY3Rpb25zKCk7XG4gICAgfVxuICAgIGNvbmZpZ3VyZUVkaXRvckZ1bmN0aW9ucygpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4gdGhpcy5oYW5kbGVFbXB0eUVkaXRvcigpKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcInBhc3RlXCIsIChlKSA9PiB0aGlzLmhhbmRsZVBhc3RlKGUpKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZWlucHV0XCIsIChlKSA9PiB0aGlzLmhhbmRsZUVkaXRvcklucHV0KGUpKTtcbiAgICAgICAgdGhpcy5mb3JtYXRGb250U2l6ZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB0aGlzLmVuZm9yZURpZ2l0T25seShlKSk7XG4gICAgICAgIHRoaXMuZm9ybWF0Rm9udFNpemVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5oYW5kbGVJbnB1dEZvY3VzKHRoaXMuZm9ybWF0Rm9udFNpemVJbnB1dCkpO1xuICAgICAgICB0aGlzLmVkaXRvci5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4gdGhpcy5yZXN0cmljdEluaXRpYWxEaXYoZSkpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIENsZWFycyB0aGUgZWRpdG9yIHdoZW4gZW1wdHkgKHJlbWFpbmluZyA8ZGl2PiwgPGJyPiBlbGVtZW50cykgKi9cbiAgICBoYW5kbGVFbXB0eUVkaXRvcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLmlubmVyVGV4dC5yZXBsYWNlKC9cXHMrL2csIFwiXCIpLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5pbml0aWFsRGl2LmlubmVySFRNTCA9IFwiXCI7XG4gICAgfVxuICAgIGhhbmRsZUVkaXRvcklucHV0KGUpIHtcbiAgICAgICAgc3dpdGNoIChlLmlucHV0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImluc2VydFBhcmFncmFwaFwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVQYXJhZ3JhcGhJbnNlcnRpb24oZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gT3ZlcnJpZGVzIHRoZSBkZWZhdWx0IGtleWRvd24gZXZlbnQgZm9yIGEgY29udGVudGVkaXRhYmxlIDxkaXY+IGVsZW1lbnQgKi9cbiAgICBoYW5kbGVQYXJhZ3JhcGhJbnNlcnRpb24oZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgYWN0aXZlTm9kZSA9IChfYSA9IHNlbGVjdGlvbi5mb2N1c05vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAoYWN0aXZlTm9kZSA9PT0gdGhpcy5pbml0aWFsRGl2KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHNlY29uZE5vZGUuaW5uZXJUZXh0ID0gXCJcXHUyMDBCXCI7XG4gICAgICAgICAgICBjb25zdCBhbGlnbiA9IHRoaXMuaW5pdGlhbERpdi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRleHQtYWxpZ25cIik7XG4gICAgICAgICAgICBjb25zdCBwb3NzaWJsZUFsaWdubWVudHMgPSBbXCJsZWZ0XCIsIFwiY2VudGVyXCIsIFwicmlnaHRcIiwgXCJqdXN0aWZ5XCJdO1xuICAgICAgICAgICAgaWYgKGFsaWduICYmIHBvc3NpYmxlQWxpZ25tZW50cy5pbmNsdWRlcyhhbGlnbikpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmROb2RlLnNldEF0dHJpYnV0ZShcImRhdGEtdGV4dC1hbGlnblwiLCBhbGlnbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxEaXYuYWZ0ZXIoc2Vjb25kTm9kZSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IG5ldyBSYW5nZSgpO1xuICAgICAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlY29uZE5vZGUsIDApO1xuICAgICAgICAgICAgICAgIHJhbmdlLnNldEVuZChzZWNvbmROb2RlLCAwKTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgcGFzdGUgZXZlbnQsIHRvIG9ubHkga2VlcCB0ZXh0ICovXG4gICAgaGFuZGxlUGFzdGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGNsaXBib2FyZERhdGEgPSBlLmNsaXBib2FyZERhdGEgPyBlLmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHRcIikgOiBudWxsO1xuICAgICAgICBpZiAoIWNsaXBib2FyZERhdGEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgY29uc29sZS5sb2coY2xpcGJvYXJkRGF0YSk7XG4gICAgICAgIGNvbnN0IHRleHRDb250ZW50Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNsaXBib2FyZERhdGEpO1xuICAgICAgICByYW5nZS5pbnNlcnROb2RlKHRleHRDb250ZW50Tm9kZSk7XG4gICAgICAgIHJhbmdlLnNldFN0YXJ0QWZ0ZXIodGV4dENvbnRlbnROb2RlKTtcbiAgICAgICAgcmFuZ2Uuc2V0RW5kQWZ0ZXIodGV4dENvbnRlbnROb2RlKTtcbiAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFByZXZlbnRzIHRoZSBpbml0aWFsIGRpdiBmcm9tIGJlaW5nIGRlbGV0ZWQgKi9cbiAgICByZXN0cmljdEluaXRpYWxEaXYoZSkge1xuICAgICAgICBpZiAoZS5rZXkgPT09IFwiQmFja3NwYWNlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxEaXYuaW5uZXJUZXh0LnJlcGxhY2UoL1xcbnxcXHMvZywgXCJcIikgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHNlbGVjdGlvbi5hbmNob3JOb2RlO1xuICAgICAgICAgICAgICAgIC8qKiByZWN1cnNpdmVseSB0cmF2ZXJzZSAqL1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlICYmIHBhcmVudE5vZGUucGFyZW50RWxlbWVudCAhPT0gdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudE5vZGUgIT09IG51bGwgJiYgcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50ICE9PSB0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUgPT09IG51bGwgfHwgcGFyZW50Tm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50Tm9kZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlID09PSB0aGlzLmluaXRpYWxEaXYpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIFNlbGVjdHMgZW50aXJlIGlucHV0IGNvbnRlbnQgb25mb2N1cyAqL1xuICAgIGhhbmRsZUlucHV0Rm9jdXMoaW5wdXRFbGVtZW50KSB7XG4gICAgICAgIGlucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpbnB1dEVsZW1lbnQuc2VsZWN0KCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gRW5mb3JjZXMgZGlnaXQgb25seSBpbnB1dCAqL1xuICAgIGVuZm9yZURpZ2l0T25seShlKSB7XG4gICAgICAgIGlmICghL0JhY2tzcGFjZXxcXGQvZy50ZXN0KGUua2V5KSlcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gSW5zdGFudGlhdGVzIFVzZXIgSW50ZXJmYWNlIGV2ZW50cyBhbmQgZnVuY3Rpb25hbGl0eVxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0b3JcIik7XG4gICAgICAgIHRoaXMubWFpblZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcFwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2V0dGluZy1idXR0b25cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2Utc2V0dGluZ3NcIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NWaWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZXR0aW5ncy12aWV3XCIpO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlLWlucHV0XCIpO1xuICAgICAgICB0aGlzLnpvb21SYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN6b29tLXJhbmdlXCIpO1xuICAgICAgICB0aGlzLnpvb21JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjem9vbS1jb250cm9sLWlucHV0XCIpO1xuICAgICAgICAvKlxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiem9vbUxldmVsXCIpIGlzIGEgbm9uLW51bGxpc2ggdmFsdWUgc2luY2UgaXQgaGFzIGJlZW4gaW5zdGFudGlhdGVkXG4gICAgICAgICAgd2l0aGluIHRoZSBTdG9yYWdlIGNsYXNzLlxuICAgICAgICAqL1xuICAgICAgICB0aGlzLnpvb21DdXJyID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ6b29tTGV2ZWxcIiksIDEwKSAvIDEwMDtcbiAgICAgICAgdGhpcy5NQVhfQUxMT1dFRF9aT09NID0gcGFyc2VJbnQodGhpcy56b29tUmFuZ2VJbnB1dC5tYXgpO1xuICAgICAgICB0aGlzLk1BWF9USVRMRV9MRU5HVEggPSA1MDtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVVJRXZlbnRzKCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gaW5zdGFuY2lhdGVzIGEgZ3JvdXAgb2YgdW5yZWxhdGVkIFVJRXZlbnRzICovXG4gICAgaW5zdGFudGlhdGVVSUV2ZW50cygpIHtcbiAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIkF6dSAtIERvY3VtZW50IDFcIjtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB0aGlzLmhhbmRsZVRpdGxlSW5wdXQoKSk7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB0aGlzLmhhbmRsZVRpdGxlQmx1cigpKTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVNldHRpbmdzVUkoKTtcbiAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVpvb20oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aW5kb3cgem9vbSB0aHJvdWdoIGRvY3VtZW50IHNjYWxpbmdcbiAgICAgKlxuICAgICAqKi9cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyB0aGUgem9vbSBmdW5jdGlvbiAqL1xuICAgIGluc3RhbnRpYXRlWm9vbSgpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIChlKSA9PiB0aGlzLmhhbmRsZVdoZWVsWm9vbShlKSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHRoaXMuaGFuZGxlS2V5Wm9vbShlKSk7XG4gICAgICAgIHRoaXMuem9vbVJhbmdlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIChlKSA9PiB0aGlzLmhhbmRsZVJhbmdlWm9vbShlKSk7XG4gICAgICAgIHRoaXMuem9vbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMuaGFuZGxlSW5wdXRab29tKCkpO1xuICAgICAgICB0aGlzLnpvb21JbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5oYW5kbGVJbnB1dEZvY3VzKHRoaXMuem9vbUlucHV0KSk7XG4gICAgICAgIHRoaXMuem9vbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB0aGlzLmVuZm9yZURpZ2l0T25seShlKSk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gWm9vbXMgb25seSB0aGUgaW5uZXIgZG9jdW1lbnQgcG9ydGlvbiBvbndoZWVsICovXG4gICAgaGFuZGxlV2hlZWxab29tKGUpIHtcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLyogRGlmZmVyZW50IGJyb3dzZXJzIHVzdWFsbHkgaGF2ZSBhIGRpZmZlcmVudCBpbmNyZW1lbnQgb24gem9vbSAqL1xuICAgICAgICBjb25zdCBhZGRlZFpvb20gPSAoZS5kZWx0YVkgKiAtMSA8IDAgPyAtMSA6IDEpICogMC4yNTtcbiAgICAgICAgaWYgKHRoaXMuem9vbUN1cnIgKyBhZGRlZFpvb20gPiB0aGlzLk1BWF9BTExPV0VEX1pPT00gfHxcbiAgICAgICAgICAgIHRoaXMuem9vbUN1cnIgKyBhZGRlZFpvb20gPCBwYXJzZUZsb2F0KHRoaXMuem9vbVJhbmdlSW5wdXQubWluKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy56b29tQ3VyciArPSBhZGRlZFpvb207XG4gICAgICAgIHRoaXMuZWRpdG9yLnN0eWxlLnNjYWxlID0gYCR7dGhpcy56b29tQ3Vycn1gO1xuICAgICAgICB0aGlzLnpvb21SYW5nZUlucHV0LnZhbHVlID0gYCR7dGhpcy56b29tQ3Vycn1gO1xuICAgICAgICB0aGlzLnpvb21JbnB1dC52YWx1ZSA9IGAke01hdGguZmxvb3IocGFyc2VGbG9hdCgodGhpcy56b29tQ3VyciAqIDEwMCkudG9GaXhlZCgyKSkpfWA7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gWm9vbXMgb25seSB0aGUgaW5uZXIgZG9jdW1lbnQgcG9ydGlvbiBvbiBgQ1RSTGAgKyBgK2AsIGBDVFJMYCArIGAtYCAqL1xuICAgIGhhbmRsZUtleVpvb20oZSkge1xuICAgICAgICBpZiAoIWUuY3RybEtleSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaXNab29taW5nSW4gPSBlLmtleSA9PT0gXCIrXCIgfHwgZS5rZXkgPT09IFwiPVwiO1xuICAgICAgICBjb25zdCBpc1pvb21pbmdPdXQgPSBlLmtleSA9PT0gXCItXCIgfHwgZS5rZXkgPT09IFwiX1wiO1xuICAgICAgICBpZiAoaXNab29taW5nSW4gfHwgaXNab29taW5nT3V0KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBhZGRlZFpvb20gPSBpc1pvb21pbmdJbiA/IDAuMjUgOiAtMC4yNTtcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21DdXJyICsgYWRkZWRab29tIDw9IDAgfHwgdGhpcy56b29tQ3VyciArIGFkZGVkWm9vbSA+IHRoaXMuTUFYX0FMTE9XRURfWk9PTSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnpvb21DdXJyICs9IGFkZGVkWm9vbTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnN0eWxlLnNjYWxlID0gYCR7dGhpcy56b29tQ3Vycn1gO1xuICAgICAgICAgICAgdGhpcy56b29tUmFuZ2VJbnB1dC52YWx1ZSA9IGAke3RoaXMuem9vbUN1cnJ9YDtcbiAgICAgICAgICAgIHRoaXMuem9vbUlucHV0LnZhbHVlID0gYCR7dGhpcy56b29tQ3VyciAqIDEwMH1gO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgem9vbSB3aXRoIGEgc2xpZGVyIChyYW5nZSBpbnB1dCkgKi9cbiAgICBoYW5kbGVSYW5nZVpvb20oZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3Qgem9vbVZhbHVlID0gcGFyc2VGbG9hdCh0YXJnZXQudmFsdWUpO1xuICAgICAgICB0aGlzLnpvb21JbnB1dC52YWx1ZSA9IGAke3pvb21WYWx1ZSAqIDEwMH1gO1xuICAgICAgICB0aGlzLmVkaXRvci5zdHlsZS5zY2FsZSA9IGAke3pvb21WYWx1ZX1gO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIHpvb20gdGhyb3VnaCBpbnB1dCAqL1xuICAgIGhhbmRsZUlucHV0Wm9vbSgpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzWm9vbSA9IHRoaXMuem9vbUN1cnI7XG4gICAgICAgIGNvbnN0IHpvb21BbW91bnQgPSBwYXJzZUludCh0aGlzLnpvb21JbnB1dC52YWx1ZSwgMTApIC8gMTAwO1xuICAgICAgICBjb25zdCBtaW5ab29tID0gcGFyc2VGbG9hdCh0aGlzLnpvb21SYW5nZUlucHV0Lm1pbik7XG4gICAgICAgIHRoaXMuem9vbUN1cnIgPSB6b29tQW1vdW50ID49IHRoaXMuTUFYX0FMTE9XRURfWk9PTSA/IHRoaXMuTUFYX0FMTE9XRURfWk9PTSA6IHpvb21BbW91bnQ7XG4gICAgICAgIGlmICh0aGlzLnpvb21DdXJyIDwgbWluWm9vbSkge1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzWm9vbSA8IG1pblpvb20pXG4gICAgICAgICAgICAgICAgcHJldmlvdXNab29tID0gMTtcbiAgICAgICAgICAgIHRoaXMuem9vbUlucHV0LnZhbHVlID0gYCR7cHJldmlvdXNab29tICogMTAwfWA7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zdHlsZS5zY2FsZSA9IGAke3ByZXZpb3VzWm9vbX1gO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuem9vbUlucHV0LnZhbHVlID0gYCR7dGhpcy56b29tQ3VyciAqIDEwMH1gO1xuICAgICAgICB0aGlzLmVkaXRvci5zdHlsZS5zY2FsZSA9IGAke3RoaXMuem9vbUN1cnJ9YDtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBTZWxlY3RzIGVudGlyZSBpbnB1dCBjb250ZW50IG9uZm9jdXMgKi9cbiAgICBoYW5kbGVJbnB1dEZvY3VzKGlucHV0RWxlbWVudCkge1xuICAgICAgICBpbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaW5wdXRFbGVtZW50LnNlbGVjdCgpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEVuZm9yY2VzIGRpZ2l0IG9ubHkgaW5wdXQgKi9cbiAgICBlbmZvcmVEaWdpdE9ubHkoZSkge1xuICAgICAgICBpZiAoIS9CYWNrc3BhY2V8XFxkL2cudGVzdChlLmtleSkpXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgZG9jdW1lbnQgdGl0bGUgY2hhbmdlXG4gICAgICpcbiAgICAgKi9cbiAgICAvKiogQGRlc2NyaXB0aW9uIElmIHRoZSB0aXRsZSB2YWx1ZSBpcyBpbnZhbGlkLCBzZXQgdGhlIGRvY3VtZW50IHRpdGxlIHRvIFwiVW5uYW1lZFwiICovXG4gICAgaGFuZGxlVGl0bGVCbHVyKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy50aXRsZUlucHV0LnZhbHVlO1xuICAgICAgICBpZiAoY29udGVudC5yZXBsYWNlKC9cXHMqL2csIFwiXCIpICE9PSBcIlwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXQudmFsdWUgPSBcIlVubmFtZWRcIjtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBPbiB0aXRsZSBjaGFuZ2UsIHNldCBkb2N1bWVudC50aXRsZSAqL1xuICAgIGhhbmRsZVRpdGxlSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy50aXRsZUlucHV0LnZhbHVlO1xuICAgICAgICBpZiAodGl0bGUucmVwbGFjZSgvXFxzKi9nLCBcIlwiKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBcIkF6dSAtIFVubmFtZWRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsbGlkZWRTdHJpbmcgPSB0aXRsZS5sZW5ndGggPj0gdGhpcy5NQVhfVElUTEVfTEVOR1RIID8gYCR7dGl0bGUuc3Vic3RyaW5nKDAsIHRoaXMuTUFYX1RJVExFX0xFTkdUSCAtIDMpfS4uLmAgOiB0aXRsZTtcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gYEF6dSAtICR7ZWxsaWRlZFN0cmluZ31gO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgZXZlbnRzIHJlbGF0ZWQgdG8gc2V0dGluZyBjb25maWd1cmF0aW9uXG4gICAgICpcbiAgICAgKi9cbiAgICBpbnN0YW50aWF0ZVNldHRpbmdzVUkoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMub3BlblNldHRpbmdzKCkpO1xuICAgICAgICB0aGlzLnNldHRpbmdzQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2VTZXR0aW5ncygpKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBPcGVucyB0aGUgc2V0dGluZ3Mgdmlldywgd2hpbGUgY2xvc2luZyB0aGUgbWFpbiB2aWV3ICovXG4gICAgb3BlblNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLm1haW5WaWV3LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1ZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIE9wZW5zIHRoZSBtYWluIHZpZXcsIHdoaWxlIGNsb3NpbmcgdGhlIHNldHRpbmdzIHZpZXcgKi9cbiAgICBjbG9zZVNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzVmlldy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMubWFpblZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvd1kgPSBcImhpZGRlblwiO1xuICAgIH1cbn1cbiIsIi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvbiBDb25maWd1cmVzIHNldHRpbmdzXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5ncyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRoZW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LXN5c3RlbS1zY2hlbWVcIik7XG4gICAgICAgIHRoaXMudGhlbWVzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2V0dGluZ3MtYXBwcmVhcmFuY2UtdGhlbWVzXCIpO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlU2V0dGluZ3MoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBJbml0aWFsaXNlcyBzZXR0aW5nIG9wdGlvbnMgKi9cbiAgICBpbnN0YW50aWF0ZVNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlVGhlbWVTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBJbnN0YW50aWF0ZXMgZXZlbnRzIHJlbGF0ZWQgdG8gdGhlbWUgY2hhbmdlKi9cbiAgICBpbnN0YW50aWF0ZVRoZW1lU2VsZWN0aW9uKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHRoZW1lIG9mIHRoaXMudGhlbWVzR3JpZC5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgdGhlbWVDb250ZW50ID0gdGhlbWUuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgICAgICBpZiAodGhlbWVDb250ZW50ICE9PSBcImN1c3RvbVwiKSB7XG4gICAgICAgICAgICAgICAgdGhlbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGVtZUNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbG9yU2NoZW1lID0gd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpO1xuICAgICAgICBjb25zdCBkZXRlY3RUaGVtZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IGUubWF0Y2hlcyA/IFwiZGFya1wiIDogXCJsaWdodFwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZUNvbnRhaW5lci5pbm5lclRleHQgPSBjb2xvclNjaGVtZS5tYXRjaGVzID8gXCJkYXJrXCIgOiBcImxpZ2h0XCI7XG4gICAgICAgIGNvbG9yU2NoZW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IGRldGVjdFRoZW1lQ2hhbmdlKGUpKTtcbiAgICB9XG59XG4iLCIvKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gaW5pdGlhbGlzZXMgZXZlbnRzIHJlbGF0aXZlIHRvIHdvcmQgY291bnQsIHdvcmQgbGVuZ3RoLCBtaXN0YWtlcyxcbiAqIG9yIGFib3V0IHRoZSBkb2N1bWVudCBpdHNlbGYgO1xuICpcbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY3RpY3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdG9yXCIpO1xuICAgICAgICB0aGlzLndvcmRDb3VudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd29yZC1jb3VudFwiKTtcbiAgICAgICAgdGhpcy5DT1VOVF9JTlRFUlZBTCA9IDUwMDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVN0YXRpc3RpY3MoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZVN0YXRpc3RpY3MoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJlV29yZENvdW50KCk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gQ291bnQgd29yZHMgYXQgYW4gaW50ZXJ2YWwgKi9cbiAgICBjb25maWd1cmVXb3JkQ291bnQoKSB7XG4gICAgICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4geyB9KTtcbiAgICAgICAgdGhpcy5lZGl0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSB0aGlzLmVkaXRvci5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHRMZW5ndGggPSB0ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KC9cXHMrL2cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh4KSA9PiB4ICE9PSBcIlwiKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29yZENvdW50Q29udGFpbmVyLmlubmVyVGV4dCA9IGAke3RleHRMZW5ndGggPT09IDAgPyBcIm5vXCIgOiB0ZXh0TGVuZ3RofSB3b3JkJHt0ZXh0TGVuZ3RoID09PSAxID8gXCJcIiA6IFwic1wifWA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLkNPVU5UX0lOVEVSVkFMKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uIE1hbmFnZXMgdGhlIHN0b3JhZ2UsIHN0b3JlcyBzb21lIHZhbHVlcyBzdWNoIGFzIHByZXZpb3VzIHNlc3Npb24gem9vbVxuICpcbiAqKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdG9yXCIpO1xuICAgICAgICB0aGlzLnpvb21SYW5nZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN6b29tLXJhbmdlXCIpO1xuICAgICAgICB0aGlzLnpvb21JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjem9vbS1jb250cm9sLWlucHV0XCIpO1xuICAgICAgICB0aGlzLnpvb21BbW91bnQgPSAxO1xuICAgICAgICB0aGlzLmluc3RhbnRpYXRlU3RvcmFnZSgpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEluc3RhdGlhdGVzIGFsbCBzdG9yYWdlIG1ldGhvZHMgKi9cbiAgICBpbnN0YW50aWF0ZVN0b3JhZ2UoKSB7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVMb2NhbFN0b3JhZ2UoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBJbnN0YW50aWF0ZXMgbG9jYWxTdG9yYWdlICovXG4gICAgaW5zdGFudGlhdGVMb2NhbFN0b3JhZ2UoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICB0aGVtZTogZG9jdW1lbnQuYm9keS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSxcbiAgICAgICAgICAgICAgICBsYW5nOiBkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZShcImxhbmdcIiksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ6b29tTGV2ZWxcIiwgdGhpcy56b29tSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTZXR0aW5nc1wiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50U2V0dGluZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB6b29tTGV2ZWwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInpvb21MZXZlbFwiKTtcbiAgICAgICAgICAgIGlmICh6b29tTGV2ZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21BbW91bnQgPSBwYXJzZUludCh6b29tTGV2ZWwsIDEwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnpvb21SYW5nZUlucHV0LnZhbHVlID0gYCR7dGhpcy56b29tQW1vdW50IC8gMTAwfWA7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tSW5wdXQudmFsdWUgPSBgJHt0aGlzLnpvb21BbW91bnR9YDtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zdHlsZS5zY2FsZSA9IGAke3RoaXMuem9vbUFtb3VudCAvIDEwMH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmV0Y2hlZFNldHRpbmdzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTZXR0aW5nc1wiKTtcbiAgICAgICAgICAgIGlmIChmZXRjaGVkU2V0dGluZ3MgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBKU09OLnBhcnNlKGZldGNoZWRTZXR0aW5ncyk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzZXR0aW5ncykpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGhlbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke3ZhbHVlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsYW5nXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShcImxhbmdcIiwgYCR7dmFsdWV9YCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLyoqXG4gKlxuICogQGRlc2NyaXB0aW9uIEltcGxlbWVudHMgdGV4dCBjb3JyZWN0aW9uXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0Q29ycmVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRleHQtbWVudVwiKTtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXRvclwiKTtcbiAgICAgICAgdGhpcy5jdXJyZW50V29yZExpc3RMYW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy53b3JkTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLkNPUlJFQ1RJT05fSU5URVJWQUwgPSAyMDAwO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVUZXh0Q29ycmVjdGlvbigpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIGluc3RhbnRpYXRlcyBhbGwgbWV0aG9kcyByZWxhdGVkIHRvIHRleHQgY29ycmVjdGlvbiAqL1xuICAgIGluaXRpYWxpemVUZXh0Q29ycmVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVUZXh0Q29ycmVjdGlvbigpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEF0dGVtcHRzIHRvIGZpbmQgZXJyb3JzIHdpdGhpbiB0aGUgZG9jdW1lbnQgKi9cbiAgICBjb25maWd1cmVUZXh0Q29ycmVjdGlvbigpIHtcbiAgICAgICAgbGV0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7IH0pO1xuICAgICAgICB0aGlzLmVkaXRvci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V29yZExpc3RMYW5nID09PSBcIlwiIHx8IHRoaXMud29yZExpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRXb3JkTGlzdExhbmcgPSBcImZyZW5jaFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5sb2FkRGljdGlvbm5hcnkoXCJmcmVuY2hcIikudGhlbigoanNvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGljdGlvbm5hcnkoanNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcmlmeVRleHQoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9LCB0aGlzLkNPUlJFQ1RJT05fSU5URVJWQUwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBMb2FkcyBhIHNwZWNpZmllZCBkaWN0aW9ubmFyeSAqL1xuICAgIGxvYWREaWN0aW9ubmFyeShsYW5nKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAuL2pzb24vJHtsYW5nfS5qc29uYCk7XG4gICAgICAgICAgICBjb25zdCBkaWN0aW9ubmFyeSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9ubmFyeTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gc2V0cyB2YWx1ZSB0aGlzLndvcmRMaXN0ICovXG4gICAgc2V0RGljdGlvbm5hcnkoZGljdGlvbm5hcnkpIHtcbiAgICAgICAgdGhpcy53b3JkTGlzdCA9IGRpY3Rpb25uYXJ5O1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEZpbmRzIGVycm9ycyBpbiB0ZXh0ICovXG4gICAgdmVyaWZ5VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndvcmRMaXN0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBsZXQgcGFyYUluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYSBvZiB0aGlzLmVkaXRvci5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gcGFyYS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAvKiBUcmltaW5nIGEgcGxhY2Vob2xkZXIgXFx1MjAwQiwgWmVyby13aWR0aCBzcGFjZSBpbiBvcmRlciB0byByZW1vdmUgaXQgZnJvbSB0b2tlbnMgKi9cbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbnRlbnQgPT09IG51bGwgfHwgdGV4dENvbnRlbnQucmVwbGFjZSgvXFx1MjAwQi9nLCBcIlwiKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYUluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLnNjYW5UZXh0KHBhcmEsIHBhcmFJbmRleCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFJbmRleCArPSAxO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBTY2FucyB0ZXh0IGNvbnRlbnQgZm9yIGVycm9ycywgdGhlbiBzdHJ1Y3R1cmVzIGVycm9ycyBpbiBhbiBvYmplY3QgKi9cbiAgICBzY2FuVGV4dChwYXJhZ3JhcGgsIHBhcmFJbmRleCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbc2Nhbm5pbmcuLi5dXCIpO1xuICAgICAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBwYXJhZ3JhcGgudGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcdTIwMEIvZywgXCJcIilcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFx1MDBBMC9nLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHRva2VucyA9IHRleHRDb250ZW50LnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50V29yZExpc3RMYW5nKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImZyZW5jaFwiOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvclRlcm0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFJbmRleDogcGFyYUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudGhPY2N1cmVuY2U6IGVycm9yQXJyYXkuZmlsdGVyKCh4KSA9PiB4LnRlcm0gPT09IHRva2VuIHx8IHgucGFyYUluZGV4ID09PSBwYXJhSW5kZXgpLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFkZFRlcm0gPSAodGVybSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyb3JUZXJtLCBcInRlcm1cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRlcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JBcnJheS5wdXNoKGVycm9yVGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JkID0gdG9rZW4uaW5jbHVkZXMoXCInXCIpID8gdG9rZW4uc3BsaXQoXCInXCIpIDogdG9rZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3b3JkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cldvcmQgPSB3b3JkLnJlcGxhY2UoL1teXFx3XFxzXSsvZywgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIGV4Y2x1ZGUgbnVtYmVycywgZGVjaW1hbCBudW1iZXJzLCBleHBvbmVudGlhbCBub3RhdGlvbiwgaW1hZ2luYXJ5IGZvcm1zICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJXb3JkLm1hdGNoKC8oLT9cXGQrKC5cXGQrKT8oKGV8RSkoXFwrfC0pXFxkKyk/aT8pKD8hW2EtekEtWl0pL2cpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy53b3JkTGlzdC5pbmNsdWRlcyhzdHJXb3JkLnRvTG93ZXJDYXNlKCkpIHx8IHN0cldvcmQucmVwbGFjZSgvXFxzK3xcXHUyMDBCL2csIFwiXCIpID09PSBcIlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRUZXJtKHN0cldvcmQudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh3b3JkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBjYXNlIGZvciB0ZXJtcyBjb21wb3NlZCBieSBlbGlzaW9uIHN1Y2ggYXMgXCJjJ2VzdFwiIG9yIFwicHJlc3F1J8OubGVcIiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JkLmZvckVhY2goKHBhcnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gcGFydC5yZXBsYWNlKC9bXlxcd1xcc10rL2csIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogIFwiYydlc3RcIiBpcyBicm9rZW4gaW50byBcImNcIiBhbmQgXCJlc3RcIiwgYnV0IFwiY1wiIGlzIG5vdCBhIHZhbGlkIHRlcm0sIGJ1dCBieSBlbGlzaW9uLCBcImNlXCIgaXMgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy53b3JkTGlzdC5pbmNsdWRlcygocCArIFwiZVwiKS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRlcm0oKHAgKyBcImVcIikudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLndvcmRMaXN0LmluY2x1ZGVzKHAudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRUZXJtKHAudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JBcnJheS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrSW5jb3JyZWN0VGVybShlcnJvckFycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBGSVhNRTogUmV2ZXJ0IHVzZXIgY3Vyc29yIHBvc2l0aW9uIG9uIGVkaXQgKi9cbiAgICAvKiogQGRlc2NyaXB0aW9uIG1hcmtzIGluY29ycmVjdCB0ZXJtcyB3aXRoaW4gdGhlIERPTSwgYW5kIHN1Z2dlc3Rpb25zIGFsb25nIHdpdGggaXQgKi9cbiAgICBtYXJrSW5jb3JyZWN0VGVybShlcnJvckFycmF5KSB7XG4gICAgICAgIC8vIFxcdTIwMEMsIFxcdUZFRkZcbiAgICAgICAgZXJyb3JBcnJheS5mb3JFYWNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFncmFwaCA9IHRoaXMuZWRpdG9yLmNoaWxkcmVuW2Vyci5wYXJhSW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgdGVybVJlZ2V4ID0gbmV3IFJlZ0V4cChgXFxcXGIoJHtlcnIudGVybX0pXFxcXGJgLCBcImdcIik7XG4gICAgICAgICAgICBpZiAoIXBhcmFncmFwaC50ZXh0Q29udGVudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSBwYXJhZ3JhcGgudGV4dENvbnRlbnQucmVwbGFjZSh0ZXJtUmVnZXgsIFwiXFx1RkVGRiQxXFx1MjAwQ1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLmlubmVySFRNTCA9IHRoaXMuZWRpdG9yLmlubmVySFRNTC5yZXBsYWNlKC9cXHVGRUZGKC4qPylcXHUyMDBDL2csIFwiPHNwYW4gZGF0YS10ZW1wLWVycj4kMTwvc3Bhbj5cIik7XG4gICAgICAgIGNvbnN0IGVycm9yTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtdGVtcC1lcnJdXCIpO1xuICAgICAgICBmb3IgKGNvbnN0IGVycm9yIG9mIGVycm9yTm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gZXJyb3IuaW5uZXJIVE1MO1xuICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgZXJyb3IucmVwbGFjZVdpdGgoc3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgLyogbG9vcGluZyBhZ2FpbiBzaW5jZSBsb29waW5nIHBhcmFncmFwaCBieSBwYXJhZ3JhcGggb25seSBwcmVzZXJ2ZXMgdGhlIGxhc3QgcGFyYWdyYXBoJ3MgZXZlbnRzICovXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlcnJvclwiKTtcbiAgICAgICAgZm9yIChjb25zdCBlcnJvciBvZiBlcnJvcnMpIHtcbiAgICAgICAgICAgIGVycm9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCAoZSkgPT4gdGhpcy5zaG93U3VnZ2VzdGlvbnMoZSkpO1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlRXJyb3JDaGFuZ2UoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAZGVzY3JpcHRpb24gU2hvd3Mgc3VnZ2VzdGlvbnMgdXNpbmcgdGhlIExldmVuc3RoZWluIGRpc3RhbmNlIGFsZ29yaXRobSovXG4gICAgc2hvd1N1Z2dlc3Rpb25zKGUpIHtcbiAgICAgICAgY29uc3Qgc3BhbiA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCB0ZXJtID0gc3Bhbi50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKCF0ZXJtIHx8IHRlcm0ubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgZmlsdGVyZWRMaXN0ID0gW107XG4gICAgICAgIGlmICh0ZXJtLmxlbmd0aCA8PSAzKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZExpc3QgPSB0aGlzLndvcmRMaXN0LmZpbHRlcigoeCkgPT4geC5zdGFydHNXaXRoKHRlcm0pICYmIHgubGVuZ3RoIDwgdGVybS5sZW5ndGggKyAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZpbHRlcmVkTGlzdCA9IHRoaXMud29yZExpc3QuZmlsdGVyKCh4KSA9PiB4LnN0YXJ0c1dpdGgodGVybS5zbGljZSgwLCAzKSkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjY3VtdWxhdG9yID0gW107XG4gICAgICAgIGZvciAoY29uc3Qgd29yZCBvZiBmaWx0ZXJlZExpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGVkaXREaXN0YW5jZSA9IHRoaXMuY29tcHV0ZUxldmVuc3RoZWluRGlzdGFuY2Uod29yZCwgdGVybS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yLnB1c2goeyB3b3JkOiB3b3JkLCBlZGl0OiBlZGl0RGlzdGFuY2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBhY2N1bXVsYXRvclxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEuZWRpdCAtIGIuZWRpdClcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5zbGljZSgwLCAzKTtcbiAgICAgICAgY29uc29sZS5sb2coc3VnZ2VzdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGlmIChzdWdnZXN0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYDxiPiR7dGhpcy5jdXJyZW50V29yZExpc3RMYW5nfTwvYj4gTm8gc3VnZ2VzdGlvbnMgZm9yIHRlcm0gXCIke3Rlcm19XCJgO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5hcHBlbmRDaGlsZChtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYDxiPiR7dGhpcy5jdXJyZW50V29yZExpc3RMYW5nfTwvYj4gQ29ycmVjdCBvcnRob2dyYXBoIGZvciB0ZXJtIFwiJHt0ZXJtfVwiYDtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XG4gICAgICAgICAgICBzdWdnZXN0aW9ucy5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHMud29yZDtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocy53b3JkKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5yZXBsYWNlV2l0aCh0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIENoYW5nZXMgdGhlIGNvbnRlbnQgb2YgdGhlIGVycm9yIGVsZW1lbnQgaWYgdGhlIHVwZGF0ZWQgdGV4dCBpcyB2YWxpZCAqL1xuICAgIG9ic2VydmVFcnJvckNoYW5nZShlcnJvcikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtdXRhdGlvbiBvZiBtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBtdXRhdGlvbi50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKG11dGF0aW9uLnR5cGUgIT09IFwiY2hhcmFjdGVyRGF0YVwiIHx8ICF0ZXh0Q29udGVudClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLndvcmRMaXN0LmluY2x1ZGVzKHRleHRDb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBlcnJvci5yZXBsYWNlV2l0aCh0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVycm9yLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIGNvbXB1dGVzIExldmVuc3RoZWluIGRpc3RhbmNlXG4gICAgICogQHNlZSBodHRwczovL3Jvc2V0dGFjb2RlLm9yZy93aWtpL0xldmVuc2h0ZWluX2Rpc3RhbmNlI1R5cGVTY3JpcHRcbiAgICAgKi9cbiAgICBjb21wdXRlTGV2ZW5zdGhlaW5EaXN0YW5jZShmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIGNvbnN0IG0gPSBmaXJzdC5sZW5ndGgsIG4gPSBzZWNvbmQubGVuZ3RoO1xuICAgICAgICBsZXQgdCA9IFsuLi5BcnJheShuICsgMSkua2V5cygpXSwgdSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG07IGkrKykge1xuICAgICAgICAgICAgdSA9IFtpICsgMV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG47IGorKykge1xuICAgICAgICAgICAgICAgIHVbaiArIDFdID0gZmlyc3RbaV0gPT09IHNlY29uZFtqXSA/IHRbal0gOiBNYXRoLm1pbih0W2pdLCB0W2ogKyAxXSwgdVtqXSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IHU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDEgLSB1W25dIC8gTWF0aC5tYXgobSwgbik7XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vKipcbiAqXG4gKiBAZGVzY3JpcHRpb24gY29uZmlndXJhdGVzIGF1dG9tYXRpYyAvIG1hbnVhbCB0cmFuc2xhdGlvbnNcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zbGF0aW9ucyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0b3JcIik7XG4gICAgICAgIHRoaXMuZm9ybWF0Qm9sZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybWF0LWJvbGRcIik7XG4gICAgICAgIHRoaXMuZm9ybWF0SXRhbGljQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtaXRhbGljc1wiKTtcbiAgICAgICAgdGhpcy5mb3JtYXRVbmRlcmxpbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1hdC11bmRlcmxpbmVcIik7XG4gICAgICAgIHRoaXMuZm9ybWF0U3RyaWtlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtYXQtc3RyaWtlXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzQWNjZXNzaWJpbGl0eVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLWFjY11cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NBcHBlYXJhbmNlVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdHItYXBwZWFyYW5jZV1cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci1kZXNjcmlwdGlvbl1cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NJbnRlcmZhY2VMYW5ndWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10ci1pbnRsXVwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLXRoZW1lc11cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUaGVtZXNEYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLXRoLWRhcmtdXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzTGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdHItdGgtbGlnaHRdXCIpO1xuICAgICAgICB0aGlzLnNldHRpbmdzVGhlbWVzU3lzdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLXRoLXN5c11cIik7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUaGVtZXNDdXN0b20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdHItdGgtY3VzXVwiKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXRyLXNldHRpbmdzXVwiKTtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZS1pbnB1dFwiKTtcbiAgICAgICAgdGhpcy5pbml0aWFsQ29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5pdGlhbC1jb250ZW50XCIpO1xuICAgICAgICB0aGlzLmxhbmd1YWdlU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYW5ndWFnZS1vcHRpb25zXCIpO1xuICAgICAgICB0aGlzLmRvY3VtZW50TmFtZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25zID0ge307XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVUcmFuc2xhdGlvbnMoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBpbnN0YW50aWF0ZXMgZXZlbnRzIGZvciB0cmFuc2xhdGlvbnMgKi9cbiAgICBpbnN0YW50aWF0ZVRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuZmV0Y2hUcmFuc2xhdGlvbnMoKS50aGVuKChqc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGlvbnMgPSBqc29uO1xuICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoanNvbikuZm9yRWFjaCgodHJhbnNsYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdCA9IHRyYW5zbGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50TmFtZXMuYWRkKHQuZG9jdW1lbnRfaW5pdGlhbF90aXRsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8qKiB0aGlzLnRyYW5zbGF0aW9ucyBhbmQgdGhpcy5kb2N1bWVudE5hbWVzIG1pZ2h0IG5vdCBleGlzdCB5ZXQgKi9cbiAgICAgICAgICAgIHRoaXMuaW5zdGFudGlhdGVMYW5ndWFnZVNlbGVjdGlvbigpO1xuICAgICAgICB9KSkoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBmZXRjaGVzIHRoZSAuanNvbiBmaWxlIGNvbnRhaW5pbmcgYWxsIHRyYW5zbGF0aW9ucyAqL1xuICAgIGZldGNoVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChcIi4vanNvbi90cmFuc2xhdGlvbnMuanNvblwiKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2xhdGlvbnM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIHNldHMgdGhlIGludGVyZmFjZSBsYW5ndWFnZSwgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZSAqL1xuICAgIHNldEludGVyZmFjZUxhbmd1YWdlKGxhbmd1YWdlKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnRyYW5zbGF0aW9ucykubGVuZ3RoID09PSAwIHx8IHRoaXMudHJhbnNsYXRpb25zW2xhbmd1YWdlXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbm9iaiA9IHRoaXMudHJhbnNsYXRpb25zW2xhbmd1YWdlXTtcbiAgICAgICAgdGhpcy50aXRsZUlucHV0LnBsYWNlaG9sZGVyID0gdHJhbnNsYXRpb25vYmouZG9jdW1lbnRfbm9fdGl0bGVfcGxhY2Vob2xkZXI7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TmFtZXMuaGFzKHRoaXMudGl0bGVJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGVJbnB1dC52YWx1ZSA9IHRyYW5zbGF0aW9ub2JqLmRvY3VtZW50X2luaXRpYWxfdGl0bGU7XG4gICAgICAgICAgICBkb2N1bWVudC50aXRsZSA9IGBBenUgLSAke3RyYW5zbGF0aW9ub2JqLmRvY3VtZW50X2luaXRpYWxfdGl0bGV9YDtcbiAgICAgICAgfVxuICAgICAgICAvKiBGSVhNRTogVGhpcyBpcyB2ZXJ5IHVnbHkgYnV0IGl0IHdvcmtzIMKvXFxfKOODhClfL8KvICovXG4gICAgICAgIHRoaXMuaW5pdGlhbENvbnRlbnREaXYuc2V0QXR0cmlidXRlKFwiZGF0YS1wbGFjZWhvbGRlclwiLCB0cmFuc2xhdGlvbm9iai5kb2N1bWVudF9wbGFjZV9ob2xkZXIpO1xuICAgICAgICB0aGlzLmZvcm1hdEJvbGRCdXR0b24uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gdHJhbnNsYXRpb25vYmouZm9ybWF0X3RleHRfYnV0dG9uLmJvbGQ7XG4gICAgICAgIHRoaXMuZm9ybWF0SXRhbGljQnV0dG9uLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IHRyYW5zbGF0aW9ub2JqLmZvcm1hdF90ZXh0X2J1dHRvbi5pdGFsaWM7XG4gICAgICAgIHRoaXMuZm9ybWF0VW5kZXJsaW5lQnV0dG9uLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IHRyYW5zbGF0aW9ub2JqLmZvcm1hdF90ZXh0X2J1dHRvbi51bmRlcmxpbmU7XG4gICAgICAgIHRoaXMuZm9ybWF0U3RyaWtlQnV0dG9uLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IHRyYW5zbGF0aW9ub2JqLmZvcm1hdF90ZXh0X2J1dHRvbi5zdHJpa2U7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUaXRsZS50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9ub2JqLnNldHRpbmdzLnRpdGxlO1xuICAgICAgICB0aGlzLnNldHRpbmdzRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0cmFuc2xhdGlvbm9iai5zZXR0aW5ncy5kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5zZXR0aW5nc0FjY2Vzc2liaWxpdHlUaXRsZS50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9ub2JqLnNldHRpbmdzLmFjY2Vzc2liaWxpdHkudGl0bGU7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NJbnRlcmZhY2VMYW5ndWFnZS50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9ub2JqLnNldHRpbmdzLmFjY2Vzc2liaWxpdHkuaW50ZXJmYWNlX2xhbmd1YWdlLnRpdGxlO1xuICAgICAgICB0aGlzLnNldHRpbmdzQXBwZWFyYW5jZVRpdGxlLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYXBwZWFyYW5jZS50aXRsZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc1RpdGxlLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYXBwZWFyYW5jZS50aGVtZV90aXRsZTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc0xpZ2h0LnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYXBwZWFyYW5jZS50aGVtZXMubGlnaHQ7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUaGVtZXNEYXJrLnRleHRDb250ZW50ID0gdHJhbnNsYXRpb25vYmouc2V0dGluZ3MuYXBwZWFyYW5jZS50aGVtZXMuZGFyaztcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc1N5c3RlbS50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9ub2JqLnNldHRpbmdzLmFwcGVhcmFuY2UudGhlbWVzLnN5c3RlbTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RoZW1lc0N1c3RvbS50ZXh0Q29udGVudCA9IHRyYW5zbGF0aW9ub2JqLnNldHRpbmdzLmFwcGVhcmFuY2UudGhlbWVzLmN1c3RvbTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBBbGxvd3MgZm9yIHRoZSB1c2VyIHRvIGNoYW5nZSB0aGVpciBsYW5ndWFnZSAqL1xuICAgIGluc3RhbnRpYXRlTGFuZ3VhZ2VTZWxlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZWxlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZExhbmcgPSB0aGlzLmxhbmd1YWdlU2VsZWN0aW9uLmNoaWxkcmVuW3RoaXMubGFuZ3VhZ2VTZWxlY3Rpb24uc2VsZWN0ZWRJbmRleF0uZ2V0QXR0cmlidXRlKFwibGFuZ1wiKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZExhbmcgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0QXR0cmlidXRlKFwibGFuZ1wiLCBcInpoLWhhbnNcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGVjdGVkTGFuZykge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJqYVwiOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRBdHRyaWJ1dGUoXCJsYW5nXCIsIFwiamFcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInpoLWhhbnRcIjpcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0QXR0cmlidXRlKFwibGFuZ1wiLCBcInpoLWhhbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShcImxhbmdcIiwgc2VsZWN0ZWRMYW5nKTtcbiAgICAgICAgICAgIHRoaXMuc2V0SW50ZXJmYWNlTGFuZ3VhZ2Uoc2VsZWN0ZWRMYW5nKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBFZGl0b3IgZnJvbSBcIi4vbW9kdWxlcy9lZGl0b3JcIjtcbmNsYXNzIE1haW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaSgpO1xuICAgIH1cbiAgICAvKiogQGRlc2NyaXB0aW9uIEluaXRpYWxpemVzIHRoZSBBcHAgKi9cbiAgICBpbmkoKSB7XG4gICAgICAgIHRoaXMuaW5zdGFudGlhdGVTZXJ2aWNlV29ya2VyKCk7XG4gICAgICAgIG5ldyBFZGl0b3IoKTtcbiAgICB9XG4gICAgLyoqIEBkZXNjcmlwdGlvbiBpbnN0YW50aWF0ZXMgYSBTZXJ2aWNlIHdvcmtlciAqL1xuICAgIGluc3RhbnRpYXRlU2VydmljZVdvcmtlcigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghKFwic2VydmljZVdvcmtlclwiIGluIG5hdmlnYXRvcikpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW1NlcnZpY2Ugd29ya2VyXSA6IFVuYXZhaWxhYmxlLCBwbGVhc2UgdXBncmFkZSB5b3VyIGJyb3dzZXJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWllbGQgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIuL3N3LmpzXCIsIHtcbiAgICAgICAgICAgICAgICBzY29wZTogXCIuL3NyYy9cIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5uZXcgTWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
