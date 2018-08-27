import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {PluginsModule} from '@eo-sdk/client';
import {EoPlugin} from '@eo-sdk/client';
import {links} from '../custom-states/custom-states.module';
import {MapComponent} from './map/map.component';
import {AgmCoreModule} from '@agm/core';

export const entryComponents: EoPlugin[] = [
  MapComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    AgmCoreModule.forRoot(),
    PluginsModule.forRoot(entryComponents, links)
  ],
  declarations: [MapComponent],
  exports: [PluginsModule]
})
export class CustomPluginsModule {
}
