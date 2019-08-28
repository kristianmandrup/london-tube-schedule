import { Arrival, ApiResponse } from "../model/station.model";

export interface DisplayData {
  stationName: string;
  platformName: string;
  towards: string;
  expectedArrival: string;
  lineId: string;
}

export class StationService {
  /**
   * The URL to call for Great Portland Station
   */

  displayDataFields = [
    "stationName",
    "platformName",
    "towards",
    "expectedArrival",
    "lineId"
  ];

  public displayData(dApi: ApiResponse): any {
    return this.displayDataFields.reduce(
      (acc, key): DisplayData => {
        acc[key] = dApi[key];
        return acc;
      },
      {} as DisplayData
    );
  }

  public arrivalDateFor(a: Arrival) {
    return new Date(a.expectedArrival);
  }

  public arrivalTimeFor(a: Arrival) {
    return this.arrivalDateFor(a).getTime();
  }

  public compareByTime(a: Arrival, b: Arrival) {
    return this.arrivalTimeFor(a) - this.arrivalTimeFor(b);
  }
}
