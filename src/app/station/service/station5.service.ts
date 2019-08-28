import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, timer, concat, from } from "rxjs";
import { map, concatMap } from "rxjs/operators";
import { Arrival, ApiResponse } from "../model/station.model";

@Injectable({
  providedIn: "root"
})
export class StationService {
  /**
   * The URL to call for Great Portland Station
   */
  url = "https://api.tfl.gov.uk/StopPoint/940GZZLUGPS/arrivals";

  /**
   * The Subject that contains all the values coming from the api
   */
  private arrivals: BehaviorSubject<Arrival[]> = new BehaviorSubject([]);
  /**
   * The corresponding observable
   */
  arrivals$: Observable<Arrival[]> = this.arrivals.asObservable();

  constructor(private http: HttpClient) {
    this.subscribeToArrivals();
  }

  /**
   * When the service is loaded we create a pipe to the API
   * and call every 30s;
   * Could also be a websocket!
   */
  private subscribeToArrivals() {
    timer(0, 30000).subscribe(() => {
      this.getArrival().subscribe(data => this.arrivals.next(data));
    });
  }

  /**
   * The request to the API.
   * Plus modification of the objects into simplied objects
   * And sorted by time
   */
  private getArrival(): Observable<Arrival[]> {
    return this.http
      .get<Arrival[]>(this.url)
      .pipe(
        map((data: ApiResponse[]) =>
          data.map(this.displayData).sort(this.compareByTime)
        )
      );
  }

  private displayData(dApi: ApiResponse) {
    return {
      stationName: dApi.stationName,
      platformName: dApi.platformName,
      towards: dApi.towards,
      expectedArrival: dApi.expectedArrival,
      lineId: dApi.lineId
    };
  }

  private arrivalDateFor(a: Arrival) {
    return new Date(a.expectedArrival);
  }

  private arrivalTimeFor(a: Arrival) {
    return this.arrivalDateFor(a).getTime();
  }

  private compareByTime(a: Arrival, b: Arrival) {
    return this.arrivalTimeFor(a) - this.arrivalTimeFor(b);
  }
}
