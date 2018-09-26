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


@Component({
  selector: 'eo-map-frame',
  templateUrl: './map-frame.component.html',
  styleUrls: ['./map-frame.component.scss']
})
export class MapFrameComponent extends UnsubscribeOnDestroy implements AfterViewInit {

  static id = 'eo.custom.plugin.map-frame';
  static matchType = new RegExp('object-details-tab.*');

  context;
  @ViewChild('mapFrame') mapFrame: ElementRef;

  constructor(private selectionService: SelectionService, private dmsService: DmsService,
              private renderer: Renderer2, private eventService: EventService) {
    super();
  }

  /**
   * normalize Address data - map your data based on scheme properties
   * @param data
   * @returns
   */
  private normalize(data: any = {}): any {
    return {
      streethw: data.strassehw,
      townhw: data.orthw,
      countryhw: data.landhw,
      ...data
    };
  }

  /**
   * Process dmsObject to get the url for map frame
   * @param dmsObj
   */
  setupMap(dmsObj: DmsObject) {
    if (dmsObj) {
      const {streethw, townhw, countryhw} = this.normalize(dmsObj.data);
      const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDX8znfh-d4u3spGhC1GvCjq6EA1pjPovQ&q=${streethw}+${townhw}+${countryhw}`;
      this.renderer.setAttribute(this.mapFrame.nativeElement, 'src', url);
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
