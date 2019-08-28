import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Arrival } from "../../model/station.model";

enum OrderColors {
  "circle" = "rgb(167, 207, 207)",
  "hammersmith-city" = "rgb(237, 240, 196)",
  "metropolitan" = "rgb(227, 211, 248)"
}

@Component({
  selector: "app-train",
  templateUrl: "./train.component.html",
  styleUrls: ["./train.component.scss"]
})
export class TrainComponent implements OnInit, OnChanges {
  /**
   * The expected train and its information
   */
  @Input()
  train: Arrival;

  /**
   * The order of the train within the expected trains for the platform
   */
  @Input()
  order: number;
  /**
   * The color for the div depends on the Line ID
   */
  orderColors: string;

  /**
   * The train direction
   */
  towards: string;

  /**
   * The expected arrival
   */
  due: string;
  /**
   * If it's due, green color
   */
  dueColors: string;

  constructor() {}

  ngOnInit() {}

  /**
   * When the Arrival is updated we update the all the needed values
   * like colors, times
   * @param changes values
   */
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    const now = new Date();
    const expected = new Date(changes.train.currentValue.expectedArrival);
    const gap = expected.getMinutes() - now.getMinutes();
    this.setByGap(gap);

    this.towards = changes.train.currentValue.towards;
    this.orderColors = OrderColors[changes.train.currentValue.lineId];
  }

  setByGap(gap: number) {
    if (gap > 0) {
      this.setPositiveGap(gap);
    } else {
    }
    this.setNegativeGap(gap);
  }

  setPositiveGap(gap: number) {
    if (gap < 2) {
      this.due = "due";
      this.dueColors = "rgba(210, 250, 191)";
    } else {
      this.due = `${gap} mins`;
      this.dueColors = "rgb(250, 230, 216)";
    }
  }

  setNegativeGap(gap: number) {
    this.due = `...`;
    this.dueColors = "rgb(250, 230, 216)";
  }
}
