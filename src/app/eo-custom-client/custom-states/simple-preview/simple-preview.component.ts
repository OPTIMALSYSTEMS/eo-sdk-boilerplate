import {Component, OnInit} from '@angular/core';
import {DmsObject, DmsParams, DmsService} from '@eo-sdk/core';
import {ActivatedRoute} from '@angular/router';
import {UnsubscribeOnDestroy} from '@eo-sdk/client';
import {takeUntil, filter} from 'rxjs/operators';

@Component({
  selector: 'eo-simple-preview',
  templateUrl: './simple-preview.component.html',
  styleUrls: ['./simple-preview.component.scss']
})
export class SimplePreviewComponent extends UnsubscribeOnDestroy implements OnInit {

  static id = 'eo.custom.state.simple-preview';
  static path = 'custom/simple-preview';
  static matchType = new RegExp('sidebar-navigation');

  /* set specific existing ID of DMS object to provide correct link */
  static queryParams = {id: '0000'};

  item: DmsObject;

  constructor(private dmsService: DmsService, private route: ActivatedRoute) {
    super();
  }

  loadDmsObject(params: DmsParams) {
    this.dmsService
      .getDmsObjectByParams(params)
      .subscribe(val => this.item = val)
  }

  ngOnInit() {
    this.route
      .queryParams
      .pipe(takeUntil(this.componentDestroyed$), filter(params => params.id))
      .subscribe(params => this.loadDmsObject(params as DmsParams));
  }

}
