import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { ClockServletService } from './clock-servlet.service';

import {  EmailComposer } from '@ionic-native/email-composer/ngx';
import { SMS } from '@ionic-native/sms/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [ 
    PipesModule, 
    StatusBar,
    SplashScreen,
    ClockServletService,
    EmailComposer,
    SMS,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
