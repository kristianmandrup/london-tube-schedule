import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, timer } from "rxjs";
import { map } from "rxjs/operators";
import { Arrival, ApiResponse } from "../model/station.model";
import { StationService } from "./station11.service";

interface DisplayData {
  stationName: string;
  platformName: string;
  towards: string;
  expectedArrival: string;
  lineId: string;
}

interface DataClient {
  observe<T>(location: string): Observable<T>;
}

@Injectable({
  providedIn: "root"
})
export class StationServiceObserver extends StationService {
  /**
   * The Subject that contains all the values coming from the api
   */
  private arrivals: BehaviorSubject<Arrival[]> = new BehaviorSubject([]);
  /**
   * The corresponding observable
   */
  arrivals$: Observable<Arrival[]> = this.arrivals.asObservable();

  constructor(private dataClient: DataClient, private location: string) {
    super();
    this.subscribeToArrivals();
  }

  /**
   * When the service is loaded we create a pipe to the API
   * and call every 30s;
   * Could also be a websocket!
   */
  private subscribeToArrivals() {
    timer(0, 30000).subscribe(() => {
      this.observeArrival().subscribe(data => this.arrivals.next(data));
    });
  }

  private observeData(): Observable<Arrival[]> {
    return this.dataClient.observe<Arrival[]>(this.location);
  }

  /**
   * The request to the API.
   * Plus modification of the objects into simplied objects
   * And sorted by time
   */
  private observeArrival(): Observable<Arrival[]> {
    return this.observeData().pipe(
      map((data: ApiResponse[]) =>
        data.map(this.displayData).sort(this.compareByTime)
      )
    );
  }
}
