// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {EoCoreModule} from '@eo-sdk/core';
import {EoClientModule} from '@eo-sdk/client';
import {EoFrameworkCoreModule} from '@eo-sdk/client';
import {EoCustomClientModule} from './eo-custom-client';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    // temporary: extra import to provide ToastrService in production mode (https://github.com/scttcper/ngx-toastr/issues/549)
    ToastrModule.forRoot(),
    EoCoreModule.forRoot({
      main: ['assets/_default/config/main.json', 'assets/config/main.json'],
      translations: ['assets/_default/i18n/', 'assets/i18n/']
    }),
    EoFrameworkCoreModule.forRoot(),
    EoCustomClientModule.forRoot(),
    EoClientModule.forRoot()
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}