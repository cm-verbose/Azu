/**
 *
 * @description Configures settings
 *
 */

export default class Settings {
  appView: HTMLDivElement;
  closeSettingsButton: HTMLButtonElement;
  openSettingsButton: HTMLButtonElement;
  settingsView: HTMLDivElement;
  themeSelectContainer: HTMLUListElement;

  constructor() {
    this.appView = document.querySelector("#app") as HTMLDivElement;
    this.closeSettingsButton = document.querySelector("#close-settings-button") as HTMLButtonElement;
    this.openSettingsButton = document.querySelector("#setting-button") as HTMLButtonElement;
    this.settingsView = document.querySelector("#settings-view") as HTMLDivElement;
    this.themeSelectContainer = document.querySelector("#theme-option-select-ul") as HTMLUListElement;
    this.initialise_settings();
  }

  private initialise_settings() {
    this.iniChangeView();
  }

  /** @description instantiates events relating to opening and closing the settings*/
  private iniChangeView() {
    this.openSettingsButton.addEventListener("click", () => this.setSettingView("open"));
    this.closeSettingsButton.addEventListener("click", () => this.setSettingView("close"));
    this.instantiateThemeSelect();
  }

  /** @description opens or closes the settings view */
  private setSettingView(state: "open" | "close") {
    this.appView.style.display = state === "open" ? "none" : "block";
    this.settingsView.style.display = state === "open" ? "block" : "none";
  }

  /** @description Changes the current theme of the document based on the user option */
  private instantiateThemeSelect() {
    for (let i = 0; i < this.themeSelectContainer.childElementCount; i++) {
      const children = this.themeSelectContainer.children.item(i) as HTMLLIElement;

      if (["light-theme-option", "dark-theme-option", "system-theme-option"].includes(children.id)) {
        children.addEventListener("click", () => {
          const activeThemeLabel = "active-theme";
          if (document.querySelector(`.${activeThemeLabel}`) !== null) {
            const element = this.themeSelectContainer.querySelector(`.${activeThemeLabel}`) as HTMLLIElement;
            element.classList.remove(activeThemeLabel);
          }
          children.classList.add(activeThemeLabel);
          document.body.setAttribute("class", children.id.replace("-theme-option", ""));
        });
      }
    }
  }
}
