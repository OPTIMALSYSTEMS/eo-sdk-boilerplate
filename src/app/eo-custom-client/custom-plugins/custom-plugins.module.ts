import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {PluginsModule} from '@eo-sdk/client';
import {EoPlugin} from '@eo-sdk/client';
import {links} from '../custom-states/custom-states.module';
import {MapComponent} from './map/map.component';
import {AgmCoreModule} from '@agm/core';
import {MapFrameComponent} from './map-frame/map-frame.component';
import {PersonalCoverComponent} from './personal-cover/personal-cover.component';

export const entryComponents: EoPlugin[] = [
  MapComponent,
  MapFrameComponent,
  PersonalCoverComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    AgmCoreModule.forRoot(),
    PluginsModule.forRoot(entryComponents, links)
  ],
  declarations: [MapComponent, MapFrameComponent, PersonalCoverComponent],
  exports: [PluginsModule]
})
export class CustomPluginsModule {
}
