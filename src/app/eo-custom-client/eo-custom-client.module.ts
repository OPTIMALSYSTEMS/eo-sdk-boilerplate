import {ModuleWithProviders, NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EoFrameworkModule} from '@eo-sdk/client';
import {CustomPluginsModule} from './custom-plugins/custom-plugins.module';
import {CustomStatesModule} from './custom-states/custom-states.module';
import {CustomActionsModule} from './custom-actions/custom-actions.module';
import {EoCustomClientRoutingModule} from './eo-custom-client-routing.module';

/**
 * Applications core module. This module is supposed to be added to the root module
 * using the `forRoot()` method. This way we make sure that only one instance of the
 * core module exists. Every attempt to create another instance will result in an error.
 */


@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    CustomStatesModule,
    CustomActionsModule,
    CustomPluginsModule,
    EoCustomClientRoutingModule
  ],
  providers: [],
  exports: [CustomPluginsModule, CustomActionsModule],
  entryComponents: [],
  declarations: []
})
export class EoCustomClientModule {

  static forRoot(components: any[] = []): ModuleWithProviders {
    return {
      ngModule: EoCustomClientModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    };
  }
}
