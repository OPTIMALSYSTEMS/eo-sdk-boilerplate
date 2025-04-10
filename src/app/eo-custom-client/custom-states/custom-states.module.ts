import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';

import {CustomObjectDetailsComponent} from './custom-object-details/custom-object-details.component';

export const routes: Route[] = [
  {path: CustomObjectDetailsComponent.path, component: CustomObjectDetailsComponent, canActivate: [AuthGuard]},
];

export const links: EoLinkPlugin[] = [
  CustomObjectDetailsComponent
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes)
  ],

  declarations: [
    CustomObjectDetailsComponent
  ]
})
export class CustomStatesModule {
}
