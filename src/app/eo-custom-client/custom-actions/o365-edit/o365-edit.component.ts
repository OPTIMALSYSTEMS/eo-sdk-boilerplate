import { Component } from '@angular/core';
import { DmsObjectTarget, PluginsService, SelectionRange, SimpleAction } from '@eo-sdk/client';
import { TranslateService } from '@eo-sdk/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-o365-edit',
  template: ``,
  styles: ``
})
export class O365EditComponent extends DmsObjectTarget implements SimpleAction {

  label: string;
  description: string;
  iconSrc = 'assets/_default/svg/ic_edit.svg';
  priority = 15;
  group = 'common';
  range = SelectionRange.SINGLE_SELECT;

  constructor(private translate: TranslateService, private pluginsService: PluginsService) {
    super();
    this.label = this.translate.instant('o365-edit.action.label');
    this.description = this.translate.instant('o365-edit.action.description');
  }

  isExecutable(item: any | any[]): Observable<boolean | boolean[]> {
    return of(item.rights.edit && item.content?.contents[0].mimetype.match(/word|presentation|excel|powerpoint|spreadsheet/));
  }

  run(selection: any[]): void {
    const item = selection[0];
    const user = this.pluginsService.api.session.getUser();
    const win = window.open(location.origin + '/dashlet365/?id=' + item.id + '&version=' + item.version + '&type=' + item.typeName + '&locale=' + user.userSettings.clientlocale + '&action=editnew&mimeTypeGroup=WORD&conversion=none');
    win.addEventListener('beforeunload', () => window.postMessage(JSON.stringify({
      MessageId: 'Host_PostmessageObjectUpdating',
      Values: { osid: item.id }
    })));
  }
}
