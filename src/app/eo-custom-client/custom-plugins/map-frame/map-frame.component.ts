import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import {DmsService, DmsObject, EventService, EnaioEvent, Event} from '@eo-sdk/core';
import {SelectionService, UnsubscribeOnDestroy} from '@eo-sdk/client';
import {takeUntil} from 'rxjs/operators';
import {LocationService} from '../../services/location.service';


@Component({
  selector: 'eo-map-frame',
  templateUrl: './map-frame.component.html',
  styleUrls: ['./map-frame.component.scss']
})
export class MapFrameComponent extends UnsubscribeOnDestroy implements AfterViewInit {

  static id = 'eo.custom.plugin.map-frame';
  static matchType = new RegExp('object-details-tab.*');

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

  /**
   * Process dmsObject to get the url for map frame
   * @param dmsObj
   */
  setupMap(dmsObj: DmsObject) {
    if (dmsObj) {
      const {typeName, data} = dmsObj;
      const location = this.locationService.locationbData(typeName, data);
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
  }

  /**
   * Load & update current context/dmsObject
   * @param event
   */
  eventHandler(event: Event) {
    if (event.type === EnaioEvent.DMS_OBJECT_LOADED || (this.context && this.context.id === event.data.id)) {
      this.context = event.data;
      this.setupMap(event.data);
    }
  }

  ngAfterViewInit() {

    this.eventService
      .on(EnaioEvent.DMS_OBJECT_LOADED, EnaioEvent.DMS_OBJECT_UPDATED)
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(e => this.eventHandler(e));
  }
}
