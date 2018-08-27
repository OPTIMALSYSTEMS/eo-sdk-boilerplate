import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {ActionModule} from '@eo-sdk/client';
import {BaseAction} from '@eo-sdk/client';
import { FinalizeObjectActionComponent } from './finalize-object-action/finalize-object-action.component';

export const entryComponents: BaseAction[] = [
FinalizeObjectActionComponent,
  ];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    ActionModule.forRoot(entryComponents)
  ],
  declarations: [FinalizeObjectActionComponent],
  exports: [ActionModule]
})
export class CustomActionsModule {
}
