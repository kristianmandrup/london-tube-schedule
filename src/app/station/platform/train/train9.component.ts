import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Arrival } from "../../model/station.model";
import { TrainDue } from "./train-due";

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

  dateFor(time?: any) {
    return new Date(time);
  }

  now() {
    return this.dateFor();
  }

  timeDiff = (from: Date, to: Date) => from.getMinutes() - to.getMinutes();

  timeSince = (to: Date) => this.now().getMinutes() - to.getMinutes();

  gapFor(expectedArrival: any): number {
    return this.timeSince(this.dateFor(expectedArrival));
  }

  /**
   * When the Arrival is updated we update the all the needed values
   * like colors, times
   * @param changes values
   */
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    const { train } = changes;
    const { currentValue } = train;
    const { expectedArrival, lineId, towards } = currentValue;

    this.setByGap(this.gapFor(expectedArrival));
    this.towards = towards;
    this.orderColors = OrderColors[lineId];
  }

  setByGap(gap: number) {
    new TrainDue(this, gap).setByGap();
  }
}
