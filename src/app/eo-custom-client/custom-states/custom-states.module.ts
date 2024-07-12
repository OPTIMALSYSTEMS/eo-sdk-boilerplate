import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {EoFrameworkModule} from '@eo-sdk/client';
import {EoLinkPlugin} from '@eo-sdk/client';
import {AuthGuard} from '@eo-sdk/client';
import { MyProcessComponent } from './my-process/my-process.component';

export const routes: Route[] = [
{path: MyProcessComponent.path, component: MyProcessComponent.component, canActivate: [AuthGuard]},
  ];

export const links: EoLinkPlugin[] = [
MyProcessComponent,
  ];

@NgModule({
  imports: [
    CommonModule,
    EoFrameworkModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyProcessComponent
  ]
})
export class CustomStatesModule {
}
