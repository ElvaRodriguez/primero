import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuController, ToastController, AlertController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { valorReloj, ClockServletService } from '../clock-servlet.service';



@Component({
  selector: 'app-listado-med',
  templateUrl: './listado-med.page.html',
  styleUrls: ['./listado-med.page.scss'],
})
export class ListadoMedPage implements OnInit {

  medicamentos;
  textoBuscar = '';

  
  constructor(public servicio: ServicioService, public router: Router,
              private ruta: ActivatedRoute, public toastCrl: ToastController,
              public alertController: AlertController, public menu: MenuController,
              ) { }


  ngOnInit() { }


  ionViewWillEnter(){
    this.onListadoByUsuario();
    this.menu.enable(true); 
  }

  buscar(event){
      this.textoBuscar = event.detail.value;
    }


  onListadoByUsuario(){
    this.ruta.params.subscribe((params: Params) => {
            this.servicio.getMedicamentoByUsuario(localStorage.getItem('id')).subscribe(res => {
               this.medicamentos = res['medicamentolista'];
               //this.medicamentos = Array.of(this.medicamentos);
               console.log(this.medicamentos);
              });      
    });
  }

   onNuevo(){
    this.router.navigate(['/medicamento', 0]);
   }
  
     // tambien cambiar
    eliminar(item){
    this.servicio.deleteMedicamento(item.id_medicamento).subscribe(res =>{
      this.presentToast('Medicamento Eliminado');
      this.onListadoByUsuario();
    })
  }

    editar(item){
      this.router.navigate(['medicamento', item.id_medicamento]) //modificar tambien
    }

  async presentToast(mensaje: string) {
    const toast = await this.toastCrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}
