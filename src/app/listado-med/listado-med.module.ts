import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoMedPageRoutingModule } from './listado-med-routing.module';

import { ListadoMedPage } from './listado-med.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ListadoMedPageRoutingModule
  ],
  declarations: [ListadoMedPage]
})
export class ListadoMedPageModule {}
