import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  mcodigo; 
  mdoctor; 
  mespecialidad; 
  mfechaConsulta : String = new Date().toDateString();
  mhorario: String = new Date().toTimeString(); 
  mcodigoPersona; 

  constructor(public servicio: ServicioService, public router: Router,
    public toastCtrl: ToastController, private ruta: ActivatedRoute) { }

  ngOnInit() {

    this.ruta.params.subscribe((params: Params) => {

      if(params.id == 0){
        // registra consulta
      }else{
        this.servicio.getConsultaByID(params.id).subscribe(res => {
          this.mcodigo = res['consulta'].id_consulta;
          this.mdoctor = res['consulta'].nombre_doctor;
          this.mespecialidad = res['consulta'].especialidad;
          this.mfechaConsulta = res['consulta'].fecha_consulta;
          this.mhorario = res['consulta'].horario;
          this.mcodigoPersona = res['consulta'].fk_usuario;
          
        });
      }
    });

  }

  onGuardar(){

    const dataConsulta = {
      id_consulta: this.mcodigo,
      nombre_doctor: this.mdoctor,
      especialidad: this.mespecialidad,
      fecha_consulta: this.mfechaConsulta,
      horario: this.mhorario,
      fk_usuario: localStorage.getItem('id')

    }

    if(this.mcodigo){
      this.servicio.updateConsulta(dataConsulta, this.mcodigo).subscribe(res => {
        console.log(res);
        this.presentToast('Datos actualizados')
        this.router.navigate(['/listado-consul'])
      });
    }else{
      this.servicio.addConsulta(dataConsulta).subscribe(res => {
        console.log(res);
        this.presentToast('Datos guardados')
        this.router.navigate(['/listado-consul'])
      })
    }

  }

  async presentToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
