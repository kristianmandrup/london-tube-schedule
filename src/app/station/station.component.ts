import { Component, Input, OnInit } from "@angular/core";
import { StationService } from "./service/station.service";
import { Arrival } from "./model/station.model";

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

  constructor(private stationService: StationService) {}

  ngOnInit() {
    /**
     * Subscription to the arrivals observable
     * When a new value is emitted, the array of arrivals is replaced
     */
    this.stationService.arrivals$.subscribe(data => {
      this.arrivals = data;

      /**
       * Filter on platforms
       */
      this.eastbound = data.filter((arrival: Arrival) =>
        arrival.platformName.match(".*Eastbound.*")
      );
      this.westbound = data.filter((arrival: Arrival) =>
        arrival.platformName.match(".*Westbound.*")
      );
    });
  }
}
