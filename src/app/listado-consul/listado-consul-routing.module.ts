import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoConsulPage } from './listado-consul.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoConsulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoConsulPageRoutingModule {}
