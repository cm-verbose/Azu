/**
 *
 * @description Handles file imports / exports.
 *
 */

export default class ImportExport {
  closeViewsBackground: HTMLDivElement;
  editor: HTMLDivElement;
  exportButton: HTMLButtonElement;
  importButton: HTMLButtonElement;
  exportView: HTMLDivElement;
  importView: HTMLDivElement;
  importDragZone: HTMLDivElement;

  constructor() {
    this.closeViewsBackground = document.querySelector("#close-import-export-view") as HTMLDivElement;
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.exportButton = document.querySelector("#export-button") as HTMLButtonElement;
    this.importButton = document.querySelector("#import-button") as HTMLButtonElement;
    this.exportView = document.querySelector("#export-document-view") as HTMLDivElement;
    this.importView = document.querySelector("#import-document-view") as HTMLDivElement;
    this.importDragZone = document.querySelector("#import-drag-zone") as HTMLDivElement;
    this.instantiateImportExport();
  }

  private instantiateImportExport() {
    this.handleViews();
    this.handleImports();
  }

  private handleImports() {
    this.importDragZone.addEventListener("click", () => this.handleDocumentImport());
  }

  private handleDocumentImport() {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.style.display = "none";
    fileInput.addEventListener("change", (e) => this.handleUpload(e));
    document.body.appendChild(fileInput);
    fileInput.click();
  }

  /** @description handles the uploaded files */
  private handleUpload(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files || files.length !== 1) return;
    const file: File = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (!reader.result || content.length === 0) return;
      console.log(file.type);
      this.importContent(content, file.type);
    };
    reader.readAsText(file);
  }

  /** @description imports the content from a file type to  */
  private importContent(content: string, type: string) {
    if (this.editor.textContent) {
      const textContent = this.editor.textContent as string;
      if(textContent.replace(/\s+/g, "").length !== 0){
        console.log("empty");
      }
    }


    switch (type) {
      /* no extension is interpreted as an alias of "text/plain" */
      case "":
      case "text/plain":
        {
          if(content.replace(/\s+/g, "")) return; // TODO: Better indications for the document being empty
        }
        break;

      default:
        {
          const span = this.importDragZone.querySelector("span") as HTMLSpanElement;
          const oldContent = span.textContent;
          span.textContent = `File type, ${type} not supported`;

          setTimeout(() => {
            span.textContent = oldContent;
          }, 2000);
        }
        break;
    }
  }

  private handleViews() {
    this.exportButton.addEventListener("click", () => this.handleExport());
    this.importButton.addEventListener("click", () => this.handleImport());
    this.closeViewsBackground.addEventListener("click", () => this.closeViews());
  }

  /** @description exports the current document as a file */
  private handleExport() {
    this.exportButton.addEventListener("click", () => {
      this.exportView.style.display = "block";
      this.closeViewsBackground.style.display = "block";
    });
  }

  /** @description imports content to the current document */
  private handleImport() {
    this.importButton.addEventListener("click", () => {
      this.importView.style.display = "block";
      this.closeViewsBackground.style.display = "block";
    });
  }

  private closeViews() {
    this.closeViewsBackground.style.display = "none";
    this.exportView.style.display = "none";
    this.importView.style.display = "none";
  }
}
