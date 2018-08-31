import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';

export const routes: Route[] = [
];

export const links: EoLinkPlugin[] = [
  {path: 'https://developer.enaio.org/display/DD/enaio+redline+4+client', id: 'eo.custom.link.developer.enaio', matchType: new RegExp('sidebar-profile')},
  {path: 'https://developer.enaio.org/display/DD/enaio+redline+4+client', id: 'eo.custom.link.developer.enaio', matchType: new RegExp('sidebar-navigation')}
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class CustomStatesModule {
}
