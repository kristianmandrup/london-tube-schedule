import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, timer } from "rxjs";
import { map } from "rxjs/operators";
import { Arrival, ApiResponse } from "../../model/station.model";

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
    return this.http.get<Arrival[]>(this.url).pipe(
      map((data: ApiResponse[]) => {
        return data
          .map((dApi: ApiResponse) => {
            const d: Arrival = {
              stationName: dApi.stationName,
              platformName: dApi.platformName,
              towards: dApi.towards,
              expectedArrival: dApi.expectedArrival,
              lineId: dApi.lineId
            };
            return d;
          })
          .sort(this.compareByTime);
      })
    );
  }

  private compareByTime(a: Arrival, b: Arrival) {
    const adate = new Date(a.expectedArrival);
    const bdate = new Date(b.expectedArrival);
    return adate.getTime() > bdate.getTime() ? 1 : -1;
  }
}
