/**
 *
 * @description Configures settings
 *
 */
export default class Settings {
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
        colorScheme.addEventListener("change", () => detectThemeChange);
    }
}
