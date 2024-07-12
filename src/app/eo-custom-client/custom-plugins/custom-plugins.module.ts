import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoFrameworkModule} from '@eo-sdk/client';
import {PluginsModule} from '@eo-sdk/client';
import {EoPlugin} from '@eo-sdk/client';
import {links} from '../custom-states/custom-states.module';
import { ProcessTabComponent } from './process-tab/process-tab.component';
import { ProcessFileTabComponent } from './process-file-tab/process-file-tab.component';

export const entryComponents: EoPlugin[] = [
  ProcessFileTabComponent,
  ProcessTabComponent
  ];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    PluginsModule.forRoot(entryComponents, links)
  ],
  declarations: [
    ProcessTabComponent,
    ProcessFileTabComponent
  ],
  exports: [PluginsModule]
})
export class CustomPluginsModule {
}
