/**
 *
 * @description initialises events relative to word count, word length, mistakes,
 * or about the document itself
 *
 **/

import { StatisticsObjectInterface } from "../../types";

export default class Statictics {
  editor: HTMLDivElement;
  statisticsContainer: HTMLDivElement;
  statisticsCover: HTMLDivElement;
  statisticsView: HTMLDivElement;
  wordCountContainer: HTMLDivElement;
  readonly COUNT_INTERVAL: number;

  constructor() {
    this.editor = document.querySelector("#editor") as HTMLDivElement;
    this.statisticsContainer = document.querySelector("#statistics-container") as HTMLDivElement;
    this.statisticsCover = document.querySelector("#close-statistics") as HTMLDivElement;
    this.statisticsView = document.querySelector("#statitics-view") as HTMLDivElement;
    this.wordCountContainer = document.querySelector("#word-count") as HTMLDivElement;
    this.COUNT_INTERVAL = 5_000;
    this.initializeStatistics();
  }

  private initializeStatistics() {
    this.wordCountContainer.addEventListener("click", () => this.openStatisticsView());
    this.statisticsCover.addEventListener("click", () => this.closeStatisticsView());
    this.configureWordCount();
  }

  /** @description Count words at an interval TODO: Fix count*/
  private configureWordCount() {
    let timer = setTimeout(() => {});
    this.editor.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        queueMicrotask(() => {
          const textContent: string = this.editor.innerText;
          const textLength = textContent
            .trim()
            .split(/\s+/g)
            .filter((x) => x !== "").length;
          this.wordCountContainer.innerText = `${textLength === 0 ? "No" : textLength} word${
            textLength === 1 ? "" : "s"
          }`;
        });
      }, this.COUNT_INTERVAL);
    });
  }

  /** @description Opens a window related to statistics of the document */
  private openStatisticsView() {
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
  private async countWords(text: string): Promise<Array<string>> {
    const words = text.split(" ");
    return words;
  }

  /** @description computes statistics */
  private computeStatistics(words: string[]) {
    const wordCount = words.length;
    const averageWordLength = words.length === 0 ? 0 : words.join("").length / words.length;
    const longestTerm = words.reduce((a, b) => (a.length > b.length ? a : b));

    const distribution = [];

    const lengthArray = words.map((x) => x.length);
    for (let i = 1; i < longestTerm.length + 1; i++) {
      const filteredList = lengthArray.filter((x) => x === i);
      distribution.push({ [i]: filteredList.length });
    }

    const distributionImage = this.drawDistribution(
      distribution.filter((x) => Object.values(x)[0] !== 0),
      wordCount,
      { width: 1000, height: 500 }
    );
    const statsObj = {
      wordCount: wordCount,
      wordAverageLength: parseFloat(averageWordLength.toFixed(2)),
      wordLengthDistributionImage: distributionImage,
    } as StatisticsObjectInterface;
    this.displayStatistics(statsObj);
  }

  private closeStatisticsView() {
    this.statisticsView.style.display = "none";
    this.statisticsCover.style.display = "none";
  }

  /** @description draws the distribution on a canvas element used for plotting */
  private drawDistribution(
    distribution: Array<{ [x: number]: number }>,
    distributionLength: number,
    dimensions: { width: number; height: number }
  ): URL | null {
    if (distribution.length === 0) return null;
    const graph = document.createElement("canvas") as HTMLCanvasElement;
    const context = graph.getContext("2d") as CanvasRenderingContext2D;
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
  private displayStatistics(statisticsObject: StatisticsObjectInterface) {
    this.statisticsContainer.innerHTML = "";
    const statsFrag = document.createDocumentFragment();
    const statsList = document.createElement("ul");
    for (const entry of Object.entries(statisticsObject)) {
      switch (entry[0] as keyof StatisticsObjectInterface) {
        case "wordCount":
          {
            const wordCount = entry[1] as number;
            const li = document.createElement("li");
            li.innerText = `Number of words : ${wordCount}`;
            statsList.appendChild(li);
            console.log(wordCount);
          }
          break;

        case "wordAverageLength":
          {
            const averageWordLength = entry[1] as number;
            const li = document.createElement("li");
            li.innerText = `Average word length : ${averageWordLength}`;
            statsList.appendChild(li);
            console.log(averageWordLength);
          }
          break;

        case "wordLengthDistributionImage":
          {
            if (entry[1] === null) return;
            const imageURL: URL = entry[1] as URL;
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
