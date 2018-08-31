import {of as observableOf} from 'rxjs';
import {Component} from '@angular/core';
import {SimpleAction} from '@eo-sdk/client';
import {DmsObjectTarget, SelectionRange} from '@eo-sdk/client';
import {DmsService, TranslateService, DmsObject} from '@eo-sdk/core';

@Component({
  selector: 'eo-finalize-object-action',
  template: ``
})
export class FinalizeObjectActionComponent extends DmsObjectTarget implements SimpleAction {
  label: string;
  description: string;
  priority = 0;
  iconSrc = 'assets/_default/svg/ic_finalized.svg';
  group = 'common';
  range = SelectionRange.MULTI_SELECT;

  constructor(private translate: TranslateService, private dmsService: DmsService) {
    super();
    this.label = this.translate.instant('eo.custom.action.finalize-object-action.label');
    this.description = this.translate.instant('eo.custom.action.finalize-object-action.description');
  }

  isExecutable(item: DmsObject) {
    return observableOf((item.rights && item.rights.finalize) && !item.lock && !item.isFinalized);
  };

  run(selection: DmsObject[]) {
    selection.forEach(item => {
      this.dmsService.finalize(item).subscribe();
    });
  }
}
