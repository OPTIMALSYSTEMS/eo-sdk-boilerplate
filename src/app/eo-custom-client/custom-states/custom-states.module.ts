import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';
import {CustomComponent} from './custom/custom.component';
import {ChartsModule} from 'ng2-charts';

export const routes: Route[] = [
  {path: CustomComponent.path, component: CustomComponent, canActivate: [AuthGuard]},
];

export const links: EoLinkPlugin[] = [
  CustomComponent,
  // SampleComponent,
  // {path: '/dashboard', id: 'eo.custom.state.sample', matchType: /sidebar-navigation/, queryParams: {debug: true}},
  // {path: 'https://google.com/', id: 'eo.custom.state.sample', matchType: /sidebar-profile/}
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  declarations: [CustomComponent]
})
export class CustomStatesModule {
}
