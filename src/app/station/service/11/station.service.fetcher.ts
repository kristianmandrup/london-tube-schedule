import { Injectable } from "@angular/core";
import { Arrival } from "../model/station.model";
import { StationService, StationServiceOptions } from "./station12.service";

interface DataClient {
  get<T>(location: string): T;
}

@Injectable({
  providedIn: "root"
})
export class FetchStationService extends StationService {
  constructor(
    private dataClient: DataClient,
    private location: string,
    options: StationServiceOptions = {}
  ) {
    super();
    this.configure(options);
    this.fetchArrivals();
  }

  /**
   * When the service is loaded we create a pipe to the API
   * and call every 30s;
   * Could also be a websocket!
   */
  private fetchArrivals() {
    return this.getArrivals();
  }

  private getData(): Arrival[] {
    return this.dataClient.get<Arrival[]>(this.location);
  }

  private getArrivals(): any[] {
    return this.getData()
      .map(this.mapBy)
      .sort(this.compareBy);
  }
}
