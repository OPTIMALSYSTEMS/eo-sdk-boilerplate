import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import {EnaioEvent} from '@eo-sdk/core';
import {DmsObject} from '@eo-sdk/core';
import {DmsService, DmsParams} from '@eo-sdk/core';
import {EventService} from '@eo-sdk/core';
import {SelectionService} from '@eo-sdk/client';
import {filter, flatMap, map} from 'rxjs/operators';


@Component({
  selector: 'eo-map-frame',
  templateUrl: './map-frame.component.html',
  styleUrls: ['./map-frame.component.scss']
})
export class MapFrameComponent implements AfterViewInit {

  static id = 'eo.custom.plugin.map-frame';
  static matchType: RegExp = /object-details-tab.*/;

  context;
  @ViewChild('mapFrame') mapFrame: ElementRef;

  constructor(private selectionService: SelectionService, private dmsService: DmsService,
              private renderer: Renderer2, private eventService: EventService) {
  }

  private renderMap(address = '', city = '', country = '') {
    const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDX8znfh-d4u3spGhC1GvCjq6EA1pjPovQ&q=${address}+${city}+${country}`;
    this.renderer.setAttribute(this.mapFrame.nativeElement, 'src', url);
  }

  setupMap(data) {
    const {streethw, townhw, countryhw, strassehw, orthw, landhw} = data.data;
    this.context = data;
    this.renderMap(streethw || strassehw, townhw || orthw, countryhw || landhw);
  }

  ngAfterViewInit() {

    this.selectionService.focus$
      .pipe(
        map(d => d.target || d.dmsItem || d),
        filter(d => d.id),
        flatMap(d => this.dmsService.getDmsObjectByParams(d as DmsParams)),
      )
      .subscribe((data: DmsObject) => this.setupMap(data), error => this.renderMap());


    this.eventService
      .on(EnaioEvent.DMS_OBJECT_UPDATED)
      .subscribe(event => {
        if (this.context && this.context.id === event.data.id) {
          this.setupMap(event.data);
        }
      });
  }
}
