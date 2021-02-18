import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'eo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  static id = 'eo.custom.plugin.map';
  static matchType = new RegExp('object-details-tab.*');

  currentPosition;
  secureOriginIssue = false;

  constructor() {
  }

  private getCurrentPosition(): void {
    navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = position;
      }, failure => {
        if (failure.message.indexOf('Only secure origins are allowed') === 0) {
          this.secureOriginIssue = true;
        }
      });
  }


  ngOnInit() {
    this.getCurrentPosition();
  }
}
