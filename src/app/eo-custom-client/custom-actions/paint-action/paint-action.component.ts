import {Component} from '@angular/core';
import {of as observableOf} from 'rxjs';
import {DmsObjectTarget} from '@eo-sdk/client';
import {DmsObject} from '@eo-sdk/core';
import {SelectionRange} from '@eo-sdk/client';
import {ExternalComponentAction} from '@eo-sdk/client';
import {PaintComponent} from './paint/paint.component';
import {TranslateService} from '@eo-sdk/core';

@Component({
  selector: 'eo-paint-action',
  template: ``
})
export class PaintActionComponent extends DmsObjectTarget implements ExternalComponentAction {
  extComponents = PaintComponent;
  // component = PaintComponent;
  label: string;
  description: string;
  priority = 0;
  iconSrc = 'assets/_default/svg/ic_edit.svg';
  group = 'common';
  range = SelectionRange.SINGLE_SELECT;
  api: any;

  constructor(private translate: TranslateService) {
    super();
    this.label = this.translate.instant('eo.custom.action.menu.edit.picture.label');
    this.description = this.translate.instant('eo.custom.action.menu.edit.picture.description');
  }

  isExecutable(element: DmsObject) {
    // enable action only if DmsObject can be edited
    return observableOf(!!element.content && !element.isFinalized && element.rights.edit);
  }
}
