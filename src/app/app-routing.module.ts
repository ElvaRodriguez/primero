import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'medicamento/:id',
    loadChildren: () => import('./medicamento/medicamento.module').then( m => m.MedicamentoPageModule)
  },
  {
    path: 'registro/:id',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'listado-med',
    loadChildren: () => import('./listado-med/listado-med.module').then( m => m.ListadoMedPageModule)
  },
  {
    path: 'consulta/:id',
    loadChildren: () => import('./consulta/consulta.module').then( m => m.ConsultaPageModule)
  },
  {
    path: 'listado-consul',
    loadChildren: () => import('./listado-consul/listado-consul.module').then( m => m.ListadoConsulPageModule)
  },
  {
    path: 'geo',
    loadChildren: () => import('./geo/geo.module').then( m => m.GeoPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'geo',
    loadChildren: () => import('./geo/geo.module').then( m => m.GeoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
