import {Component} from '@angular/core';
import {of as observableOf} from 'rxjs';
import {Router} from '@angular/router';
import {DmsObjectTarget, SelectionRange, SimpleAction} from '@eo-sdk/client';
import {DmsObject, TranslateService} from '@eo-sdk/core';

@Component({
  selector: 'eo-open-in-gallery',
  template: ``,
  styles: []
})
export class OpenInGalleryComponent extends DmsObjectTarget implements SimpleAction {

  label: string;
  description: string;
  priority = 0;
  iconSrc = 'assets/_default/svg/ic_finalized.svg';
  group = 'common';
  range = SelectionRange.MULTI_SELECT;

  constructor(private translate: TranslateService,
              private router: Router) {
    super();
    this.label = this.translate.instant('eo.custom.action.gallery');
    this.description = this.translate.instant('eo.custom.action.gallery');
  }

  isExecutable(item: DmsObject) {
    return observableOf(item.content && item.content.contents && item.content.contents[0].mimetype.match(/^image/));
  }

  run(selection: DmsObject[]) {
    const queryParams = selection.map(i => i.id).join(',');
    this.router.navigate(['custom/gallery'], {queryParams: {files: queryParams}});
  }

}
