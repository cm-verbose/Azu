/**
 *
 * @description Configures settings
 *
 */

export default class Settings {
  currentThemeContainer: HTMLDivElement;
  customThemeInput: HTMLInputElement;
  mainView: HTMLDivElement;
  themesGrid: HTMLDivElement;
  settingsButton: HTMLButtonElement;
  settingsCloseButton: HTMLButtonElement;
  settingsView: HTMLDivElement;

  constructor() {
    this.mainView = document.querySelector("#app") as HTMLDivElement;
    this.settingsButton = document.querySelector("#setting-button") as HTMLButtonElement;
    this.settingsView = document.querySelector("#settings-view") as HTMLDivElement;
    this.settingsCloseButton = document.querySelector("#close-settings") as HTMLButtonElement;
    this.currentThemeContainer = document.querySelector("#current-system-scheme") as HTMLDivElement;
    this.themesGrid = document.querySelector("#settings-apprearance-themes") as HTMLDivElement;
    this.customThemeInput = document.querySelector("#custom-theme-file-input") as HTMLInputElement;
    this.instantiateSettings();
  }

  /** @description Initialises setting options */
  private instantiateSettings() {
    this.setButtonEvents();
    this.instantiateThemeSelection();
  }

  /** @description sets events relative to opening and closing the settings view */
  private setButtonEvents() {
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
  private instantiateThemeSelection() {
    for (const theme of this.themesGrid.children) {
      const themeContent: string = theme.getAttribute("id") as string;
      if (themeContent !== "custom") {
        theme.addEventListener("click", () => {
          document.body.setAttribute("class", themeContent);
        });
      } else {
        this.handleCustomThemeInput();
      }
    }
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const detectThemeChange = (e: MediaQueryListEvent) => {
      this.currentThemeContainer.textContent = e.matches ? "dark" : "light";
    };
    this.currentThemeContainer.innerText = colorScheme.matches ? "dark" : "light";
    colorScheme.addEventListener("change", (e: MediaQueryListEvent) => detectThemeChange(e));
  }

  /** @description Instantiates events for the custom styles input */
  private handleCustomThemeInput() {
    this.customThemeInput.addEventListener("cancel", () => {
      console.log("Cancelled");
    });

    this.customThemeInput.addEventListener("change", () => {
      if (!this.customThemeInput.files || this.customThemeInput.files.length === 0) return;
      const file: File = this.customThemeInput.files[0];
      if (file.type !== "text/css") return; // not a CSS file

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        if (!e || !e.target) return;
        const result = e.target.result as string;
        const customElementLink = document.querySelector("#CustomCSSThemeLink");

        if (customElementLink === null) {
          const stylesElement = document.createElement("link");
          stylesElement.rel = "stylesheet";
          stylesElement.type = "text/css";
          stylesElement.href = result;
          stylesElement.id = "CustomCSSThemeLink";
          document.head.appendChild(stylesElement);
        } else {
          const styleElement = customElementLink as HTMLLinkElement;
          styleElement.setAttribute("href", result);
        }
      });
      reader.readAsDataURL(file);
    });
  }
}
