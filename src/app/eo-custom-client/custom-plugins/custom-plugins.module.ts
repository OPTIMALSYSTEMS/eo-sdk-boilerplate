import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {PluginsModule} from '@eo-sdk/client';
import {EoPlugin} from '@eo-sdk/client';
import {links} from '../custom-states/custom-states.module';
import { MapFrameComponent } from './map-frame/map-frame.component';

export const entryComponents: EoPlugin[] = [
MapFrameComponent,
  ];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    PluginsModule.forRoot(entryComponents, links)
  ],
  declarations: [MapFrameComponent],
  exports: [PluginsModule]
})
export class CustomPluginsModule {
}
