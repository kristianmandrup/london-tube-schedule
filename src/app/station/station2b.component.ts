import { Component, Input, OnInit } from "@angular/core";
import { StationService } from "./service/station.service";
import { Arrival } from "./model/station.model";

interface KeyedPlatformsMap {
  [key: string]: any[];
}

export const addNamedItem = obj => (name: string, item: any) => {
  obj[name] = obj[name] || [];
  obj[name].push(item);
  return obj;
};

@Component({
  selector: "app-station",
  templateUrl: "./station.component.html",
  styleUrls: ["./station.component.scss"]
})
export class StationComponent implements OnInit {
  /**
   * The station's name
   */
  @Input()
  stationName: string;

  /**
   * Expected trains
   */
  arrivals: Arrival[];

  /**
   * Eastbound platform
   */
  eastbound: Arrival[];

  /**
   * Westbound platform
   */
  westbound: Arrival[];

  platformMap: KeyedPlatformsMap;

  constructor(private stationService: StationService) {}

  ngOnInit() {
    /**
     * Subscription to the arrivals observable
     * When a new value is emitted, the array of arrivals is replaced
     */
    this.stationService.arrivals$.subscribe(data => {
      this.arrivals = data;

      data.reduce(
        (acc: KeyedPlatformsMap, arrival: Arrival) =>
          addNamedItem(acc)(arrival.platformName, arrival),
        {} as KeyedPlatformsMap
      );
    });
  }
}
