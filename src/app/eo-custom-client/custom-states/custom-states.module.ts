import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';
import {CustomComponent} from './custom/custom.component';
import {ChartsModule} from 'ng2-charts';
import {SimpleListComponent} from './simple-list/simple-list.component';
import {CanDeactivateListGuard} from './simple-list/can-deactivate-list.guard';
import {SimplePreviewComponent} from './simple-preview/simple-preview.component';
import {GalleryComponent} from './gallery/gallery.component';
import {GalleryModule} from '@ngx-gallery/core';
import 'hammerjs';

export const routes: Route[] = [
  {path: CustomComponent.path, component: CustomComponent, canActivate: [AuthGuard]},
  {path: SimplePreviewComponent.path, component: SimplePreviewComponent, canActivate: [AuthGuard]},
  {path: SimpleListComponent.path, component: SimpleListComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateListGuard]},
  {path: GalleryComponent.path, component: GalleryComponent, canActivate: [AuthGuard]},
];

export const links: EoLinkPlugin[] = [
  {
    path: 'https://developer.enaio.org/display/DD/enaio+redline+4+client',
    id: 'eo.custom.link.developer.enaio',
    matchType: new RegExp('sidebar-profile')
  },
  {
    path: 'https://developer.enaio.org/display/DD/enaio+redline+4+client',
    id: 'eo.custom.link.developer.enaio',
    matchType: new RegExp('sidebar-navigation')
  },
  CustomComponent,
  SimplePreviewComponent,
  SimpleListComponent,
  GalleryComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes),
    ChartsModule,
    GalleryModule.withConfig({
      gestures: false
    })
  ],
  declarations: [CustomComponent, SimpleListComponent, SimplePreviewComponent, GalleryComponent]
})
export class CustomStatesModule {
}
