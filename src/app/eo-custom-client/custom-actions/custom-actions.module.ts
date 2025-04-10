import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {ActionModule} from '@eo-sdk/client';
import {BaseAction} from '@eo-sdk/client';

import { O365EditComponent } from './o365-edit/o365-edit.component';

export const entryComponents: BaseAction[] = [
  O365EditComponent
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    ActionModule.forRoot(entryComponents)
  ],
  declarations: [
    O365EditComponent
  ],
  exports: [ActionModule]
})
export class CustomActionsModule {
}
