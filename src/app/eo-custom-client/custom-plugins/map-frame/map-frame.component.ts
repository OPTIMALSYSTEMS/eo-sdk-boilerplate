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
import {SelectionService, UnsubscribeOnDestroy} from '@eo-sdk/client';
import {filter, flatMap, map, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'eo-map-frame',
  templateUrl: './map-frame.component.html',
  styleUrls: ['./map-frame.component.scss']
})
export class MapFrameComponent extends UnsubscribeOnDestroy implements AfterViewInit {

  static id = 'eo.custom.plugin.map-frame';
  static matchType: RegExp = /object-details-tab.*/;

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

  private renderMap(address = '', city = '', country = '') {
    const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDX8znfh-d4u3spGhC1GvCjq6EA1pjPovQ&q=${address}+${city}+${country}`;
    this.renderer.setAttribute(this.mapFrame.nativeElement, 'src', url);
  }

  setupMap(data) {
    const {streethw, townhw, countryhw} = this.normalize(data.data);
    this.context = data;
    this.renderMap(streethw, townhw, countryhw);
  }

  ngAfterViewInit() {

    this.selectionService.focus$
      .pipe(
        takeUntil(this.componentDestroyed$),
        map(d => d.target || d.dmsItem || d),
        filter(d => d.id),
        flatMap(d => this.dmsService.getDmsObject(d.id, d.typeName || d.type, d.version)),
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
