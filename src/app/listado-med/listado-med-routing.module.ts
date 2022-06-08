import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoMedPage } from './listado-med.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoMedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoMedPageRoutingModule {}
