import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoPageRoutingModule } from './geo-routing.module';

import { GeoPage } from './geo.page';
import { Geolocation } from '@ionic-native/geolocation';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoPageRoutingModule
  ],
  declarations: [GeoPage]
})
export class GeoPageModule {}
