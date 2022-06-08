import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoConsulPageRoutingModule } from './listado-consul-routing.module';

import { ListadoConsulPage } from './listado-consul.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ListadoConsulPageRoutingModule
  ],
  declarations: [ListadoConsulPage]
})
export class ListadoConsulPageModule {}
