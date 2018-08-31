import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import {EnaioEvent} from '@eo-sdk/core';
import {DmsObject} from '@eo-sdk/core';
import {DmsService} from '@eo-sdk/core';
import {EventService} from '@eo-sdk/core';
import {SelectionService, UnsubscribeOnDestroy} from '@eo-sdk/client';
import {filter, flatMap, map, takeUntil} from 'rxjs/operators';
import {LocationService} from '../../services/location.service';


@Component({
  selector: 'eo-map-frame',
  templateUrl: './map-frame.component.html',
  styleUrls: ['./map-frame.component.scss']
})
export class MapFrameComponent extends UnsubscribeOnDestroy implements AfterViewInit {

  static id = 'eo.custom.plugin.map-frame';
  static matchType: RegExp = /object-details-tab.*/;

  context;
  mapAvailable;
  @ViewChild('mapFrame') mapFrame: ElementRef;

  constructor(private selectionService: SelectionService,
              private dmsService: DmsService,
              private renderer: Renderer2,
              private eventService: EventService,
              private locationService: LocationService) {
    super();
  }

  private renderMap(location = {}) {
    this.locationService
      .mapsUrl(location)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(url => {
        this.mapAvailable = false;
        this.renderer.setAttribute(this.mapFrame.nativeElement, 'src', url);
      }, error => this.mapAvailable = error);
  }

  setupMap(dmsObj: DmsObject) {
    const {typeName, data} = dmsObj;
    const params = this.locationService.locationbData(typeName, data);
    this.context = dmsObj;
    this.renderMap(params);
  }

  ngAfterViewInit() {

    this.selectionService.focus$
      .pipe(
        takeUntil(this.componentDestroyed$),
        map(d => d.target || d.dmsItem || d),
        filter(d => d.id),
        flatMap(d => {
          return this.dmsService.getDmsObject(d.id, d.typeName || d.type, d.version);
        }),
      )
      .subscribe((data: DmsObject) => this.setupMap(data), error => this.renderMap());


    this.eventService
      .on(EnaioEvent.DMS_OBJECT_UPDATED)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(event => {
        if (this.context && this.context.id === event.data.id) {
          this.setupMap(event.data);
        }
      });
  }
}
