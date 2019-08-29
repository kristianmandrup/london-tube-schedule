import { Injectable } from "@angular/core";
import { Arrival } from "../../model/station.model";
import { StationService } from "./station.service";

interface DataClient {
  get<T>(location: string): T;
}

@Injectable({
  providedIn: "root"
})
export class FetchStationService extends StationService {
  /**
   * The Subject that contains all the values coming from the api
   */
  private arrivals: Arrival[] = [];

  constructor(private dataClient: DataClient, private location: string) {
    super();
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

  private getArrivals(): Arrival[] {
    return this.getData()
      .map(this.displayData)
      .sort(this.compareByTime);
  }
}
