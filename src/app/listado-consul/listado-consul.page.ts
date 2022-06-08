import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuController, ToastController, AlertController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-listado-consul',
  templateUrl: './listado-consul.page.html',
  styleUrls: ['./listado-consul.page.scss'],
})
export class ListadoConsulPage implements OnInit {
  consultas;
  textoBuscar = '';

  constructor(public servicio: ServicioService, public router: Router,
    private ruta: ActivatedRoute, public toastCrl: ToastController,
    public alertController: AlertController, public menu: MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.onListadoByUsuario();
    this.menu.enable(true); 
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  onListadoByUsuario(){
    this.ruta.params.subscribe((params: Params) => {
            this.servicio.getConsultaByUsuario(localStorage.getItem('id')).subscribe(res => {
              this.consultas = res['consultalista'];
              //this.consultas = Array.of(this.consultas);
              console.log(res)
            });      
    });
    
  }

  onNuevo(){
    this.router.navigate(['/consulta', 0]);
  }

  eliminar(item){
    this.servicio.deleteConsulta(item.id_consulta).subscribe(res =>{
      this.presentToast('Consulta Eliminada');
    //   this.onListadoByUsuario();
    })
  }

    editar(item){
      this.router.navigate(['consulta', item.id_consulta]) 
    }

  async presentToast( mensaje: string ) {
    const toast = await this.toastCrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  //falta funcion alarma


}
