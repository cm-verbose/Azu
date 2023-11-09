/**
 *
 * @description Configures settings
 *
 */

export default class Settings {
  currentThemeContainer: HTMLDivElement;
  themesGrid: HTMLDivElement;

  constructor() {
    this.currentThemeContainer = document.querySelector("#current-system-scheme") as HTMLDivElement;
    this.themesGrid = document.querySelector("#settings-apprearance-themes") as HTMLDivElement;
    this.instantiateSettings();
  }

  /** @description Initialises setting options */
  private instantiateSettings() {
    this.instantiateThemeSelection();
  }

  /** @description Instantiates events related to theme change*/
  private instantiateThemeSelection() {
    for (const theme of this.themesGrid.children) {
      const themeContent: string = theme.getAttribute("id") as string;
      if (themeContent !== "custom") {
        theme.addEventListener("click", () => {
          document.body.setAttribute("class", themeContent);
        });
      }
    }
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const detectThemeChange = (e: MediaQueryListEvent) => {
      this.currentThemeContainer.textContent = e.matches ? "dark" : "light";
    };
    this.currentThemeContainer.innerText = colorScheme.matches ? "dark" : "light";
    colorScheme.addEventListener("change", () => detectThemeChange);
  }
}
