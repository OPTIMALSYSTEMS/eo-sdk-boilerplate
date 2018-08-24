import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {ActionModule} from '@eo-sdk/client';
import {BaseAction} from '@eo-sdk/client';

export const entryComponents: BaseAction[] = [
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    ActionModule.forRoot(entryComponents)
  ],
  declarations: [],
  exports: [ActionModule]
})
export class CustomActionsModule {
}
