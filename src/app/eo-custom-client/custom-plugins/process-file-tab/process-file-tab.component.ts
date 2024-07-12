import { Component, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ObjectDetailsComponent, SelectionService } from '@eo-sdk/client';
import { EnaioEvent, EventService, TranslateService } from '@eo-sdk/core';

@Component({
  selector: 'app-process-file-tab',
  templateUrl: './process-file-tab.component.html',
  styleUrl: './process-file-tab.component.scss'
})
export class ProcessFileTabComponent {

  static id = 'eo.custom.plugin.process-file-tab';
  static matchType = new RegExp('object-details-tab.process');

  // get the dmsObject from the parent component
  get dmsObject() {
    return this.parent?.item;
  }
 
  // inject the parent component
  constructor(@Inject(ObjectDetailsComponent) private parent: ObjectDetailsComponent,
              public translate: TranslateService,
              private selectionService: SelectionService,
              private eventService: EventService) { 

    // initial call 
    this.dmsObjectLoadedHandler({data: this.dmsObject});

    //subscribe to the dmsObject loaded event
    this.eventService
      .on(EnaioEvent.DMS_OBJECT_LOADED)
      .pipe(takeUntilDestroyed())
      .subscribe(e => this.dmsObjectLoadedHandler(e));
    
    // subscribe to the focus of dmsObject via selection service
    this.selectionService.find(this.parent.applySelection.in).focus$.pipe(takeUntilDestroyed()).subscribe((params) => {
      const objectParams = params;
      debugger;
    });

  }
 
  // loader function...
  dmsObjectLoadedHandler(event: any) {
    if (this.dmsObject && this.dmsObject.id === event.data?.id) { 
      // load additional data if needed
      debugger;
    }
  }

  }
