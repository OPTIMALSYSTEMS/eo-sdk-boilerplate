import { Component, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProcessDetailsComponent, SelectionService } from '@eo-sdk/client';
import { EnaioEvent, EventService, TranslateService } from '@eo-sdk/core';

@Component({
  selector: 'app-process-tab',
  templateUrl: './process-tab.component.html',
  styleUrl: './process-tab.component.scss'
})
export class ProcessTabComponent {

  static id = 'eo.custom.plugin.process-tab';
  static matchType = new RegExp('process-details-tab.process');
  
  // get the process from the parent component
  get process() {
    return this.parent?.item;
  }  
 
  // inject the parent component
  constructor(@Inject(ProcessDetailsComponent) private parent: ProcessDetailsComponent,
              public translate: TranslateService,
              private selectionService: SelectionService) { 

    // subscribe to the focus of process
    this.selectionService.find(this.parent.applySelection.in).focus$.pipe(takeUntilDestroyed()).subscribe((params) => {
      const processParams = params;
      const process = this.process;
      debugger;
    });

    // subscribe to the focus of process file
    this.selectionService.find(this.parent.applySelection.out).focus$.pipe(takeUntilDestroyed()).subscribe((params) => {
      const fileParams = params;
      const file = this.process.file?.[0];
      debugger;
    });

    // subscribe to the focus of process file via parent component
    this.parent.onDmsItemSelected.pipe(takeUntilDestroyed()).subscribe((params) => {
      const fileParams = params;
      const file = this.process.file?.[0];
      debugger;
    });

  }
}

