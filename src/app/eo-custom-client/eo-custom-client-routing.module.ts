import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/**
 * Modules that contain own routing will be automatically applied by importing their module in eo-custom-client.module.ts
 * Example : {path: 'dashboard', component: CustomDashboardComponent, canActivate: [AuthGuard]}
 */

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EoCustomClientRoutingModule {
}
