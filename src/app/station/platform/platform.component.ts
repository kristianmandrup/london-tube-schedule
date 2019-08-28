import { Component, OnInit, Input } from '@angular/core';
import { Arrival } from '../model/station.model';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  /**
   * Expected trains for the platform
   */
  @Input()
  trains: Arrival[];

  /**
   * Platform Name
   */
  @Input()
  platformName: string;

  constructor() { }

  ngOnInit() {
  }


}
