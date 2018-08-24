import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {PluginsModule} from '@eo-sdk/client';
import {EoPlugin} from '@eo-sdk/client';
import {links} from '../custom-states/custom-states.module';

export const entryComponents: EoPlugin[] = [
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    PluginsModule.forRoot(entryComponents, links)
  ],
  declarations: [],
  exports: [PluginsModule]
})
export class CustomPluginsModule {
}
