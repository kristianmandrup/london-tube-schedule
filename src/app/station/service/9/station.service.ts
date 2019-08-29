import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, timer } from "rxjs";
import { map } from "rxjs/operators";
import { Arrival, ApiResponse } from "../../model/station.model";

interface DisplayData {
  stationName: string;
  platformName: string;
  towards: string;
  expectedArrival: string;
  lineId: string;
}

interface DataClient {
  observe<T>(location: string): Observable<T>;
  get<T>(location: string): T;
}

@Injectable({
  providedIn: "root"
})
export class StationService {
  /**
   * The URL to call for Great Portland Station
   */
  url = "https://api.tfl.gov.uk/StopPoint/940GZZLUGPS/arrivals";

  displayDataFields = [
    "stationName",
    "platformName",
    "towards",
    "expectedArrival",
    "lineId"
  ];

  /**
   * The Subject that contains all the values coming from the api
   */
  private arrivals: BehaviorSubject<Arrival[]> = new BehaviorSubject([]);
  /**
   * The corresponding observable
   */
  arrivals$: Observable<Arrival[]> = this.arrivals.asObservable();

  constructor(private dataClient: DataClient) {
    this.subscribeToArrivals();
  }

  /**
   * When the service is loaded we create a pipe to the API
   * and call every 30s;
   * Could also be a websocket!
   */
  private subscribeToArrivals() {
    timer(0, 30000).subscribe(() => {
      this.observeArrivals().subscribe(data => this.arrivals.next(data));
    });
  }

  private observeData(): Observable<Arrival[]> {
    return this.dataClient.observe<Arrival[]>(this.url);
  }

  private getData(): Arrival[] {
    return this.dataClient.get<Arrival[]>(this.url);
  }

  /**
   * The request to the API.
   * Plus modification of the objects into simplied objects
   * And sorted by time
   */
  private observeArrivals(): Observable<Arrival[]> {
    return this.observeData().pipe(
      map((data: ApiResponse[]) =>
        data.map(this.displayData).sort(this.compareByTime)
      )
    );
  }

  private getArrivals(): Arrival[] {
    return this.getData()
      .map(this.displayData)
      .sort(this.compareByTime);
  }

  private displayData(dApi: ApiResponse): DisplayData {
    return this.displayDataFields.reduce(
      (acc, key): DisplayData => {
        acc[key] = dApi[key];
        return acc;
      },
      {} as DisplayData
    );
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
