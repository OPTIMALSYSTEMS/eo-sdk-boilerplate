import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eo-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  static id = 'eo.custom.state.custom';
  static path =  'custom/custom';
  static matchType: RegExp = /sidebar-navigation/;

  constructor() { }

  ngOnInit() {
  }

}
