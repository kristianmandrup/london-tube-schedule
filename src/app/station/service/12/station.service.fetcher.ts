import { Injectable } from "@angular/core";
import { Arrival, ApiResponse } from "../model/station.model";
import { StationService } from "./station11.service";

interface DataClient {
  get<T>(location: string): T;
}

interface Options {
  compareBy?: (a: any, b: any) => number;
  mapBy?: (a: Arrival) => any[];
}

@Injectable({
  providedIn: "root"
})
export class FetchStationService extends StationService {
  compareBy: (a: any, b: any) => number;
  mapBy: (a: Arrival) => any[];

  constructor(
    private dataClient: DataClient,
    private location: string,
    options: Options = {}
  ) {
    super();
    this.configure(options);
    this.fetchArrivals();
  }

  // TODO: move to base class
  private configure(options: Options = {}) {
    this.compareBy = options.compareBy || this.compareByTime;
    this.mapBy = options.mapBy || this.displayData;
  }

  /**
   * When the service is loaded we create a pipe to the API
   * and call every 30s;
   * Could also be a websocket!
   */
  private fetchArrivals() {
    return this.transform(this.getData());
  }

  private getData(): Arrival[] {
    return this.dataClient.get<Arrival[]>(this.location);
  }

  public transform(data: Arrival[]): any[] {
    return data.map(this.mapBy).sort(this.compareBy);
  }
}
