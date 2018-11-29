import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {ActionModule} from '@eo-sdk/client';
import {BaseAction} from '@eo-sdk/client';
import { OpenInGalleryComponent } from './open-in-gallery/open-in-gallery.component';

export const entryComponents: BaseAction[] = [
OpenInGalleryComponent,
  ];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    ActionModule.forRoot(entryComponents)
  ],
  declarations: [OpenInGalleryComponent],
  exports: [ActionModule]
})
export class CustomActionsModule {
}
