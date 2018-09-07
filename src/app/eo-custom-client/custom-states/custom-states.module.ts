import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';
import {SimpleListComponent} from './simple-list/simple-list.component';
import {CanDeactivateListGuard} from './simple-list/can-deactivate-list.guard';
import {SimplePreviewComponent} from './simple-preview/simple-preview.component';

export const routes: Route[] = [
  {path: SimplePreviewComponent.path, component: SimplePreviewComponent, canActivate: [AuthGuard]},
  {path: SimpleListComponent.path, component: SimpleListComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateListGuard]},
];

export const links: EoLinkPlugin[] = [
  SimplePreviewComponent,
  SimpleListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SimpleListComponent, SimplePreviewComponent]
})
export class CustomStatesModule {
}
