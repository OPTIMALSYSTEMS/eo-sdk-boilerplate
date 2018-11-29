import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';
import {GalleryComponent} from './gallery/gallery.component';
import {GalleryModule} from '@ngx-gallery/core';
import 'hammerjs';

export const routes: Route[] = [
  {path: GalleryComponent.path, component: GalleryComponent, canActivate: [AuthGuard]},
];

export const links: EoLinkPlugin[] = [
  GalleryComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    GalleryModule.withConfig({
      gestures:false
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryComponent]
})
export class CustomStatesModule {
}
