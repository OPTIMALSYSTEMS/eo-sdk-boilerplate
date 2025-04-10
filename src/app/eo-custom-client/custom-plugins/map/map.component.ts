import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  static id = 'eo.custom.plugin.map';
  static matchType = new RegExp('object-details-tab.*');
  map;

  ngAfterViewInit() {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 10
    });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    const southWest = new L.LatLng(46.0, 10.2), northEast = new L.LatLng(54.0, 17.0);
    const bounds = new L.LatLngBounds(southWest, northEast);
    this.map.fitBounds(bounds);

    const optimalSystemsHeadQuarter = {latitude: 52.4911007, longitude: 13.300701};

    navigator.geolocation.getCurrentPosition((l) => {
      this.map.flyTo([optimalSystemsHeadQuarter.latitude, optimalSystemsHeadQuarter.longitude + 0.5], 10);

      const icon_os = L.icon({
        iconUrl: 'assets/icons/os_icon.png',
        iconSize: [50, 50]
      });

      const icon_home = L.icon({
        iconUrl: 'assets/icons/home_icon.svg',
        iconSize: [50, 50]
      });

      L.marker([l.coords.latitude, l.coords.longitude], {icon: icon_home}).addTo(this.map);
      L.marker([optimalSystemsHeadQuarter.latitude, optimalSystemsHeadQuarter.longitude], {icon: icon_os}).addTo(this.map);

      const lineCoords = [
        [l.coords.latitude, l.coords.longitude],
        [optimalSystemsHeadQuarter.latitude, optimalSystemsHeadQuarter.longitude]
      ];

      setTimeout(() => {
        L.polyline(lineCoords, {color: 'red'}).addTo(this.map);
      }, 1800);
    });
  }
}
