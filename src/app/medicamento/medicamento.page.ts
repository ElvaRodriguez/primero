import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.page.html',
  styleUrls: ['./medicamento.page.scss'],
})
export class MedicamentoPage implements OnInit {
  mid;
  mMedicamento;
  mHorario: String = new Date().toTimeString();
  mDosis;
  mRep;
  mFechaInicio: String = new Date().toDateString();
  mFechaFin: String = new Date().toDateString();
  codigoPersona;
  correoUsuario;
  mrep;
  maux;


  constructor(public servicio: ServicioService, public router: Router,
              public toastCtrl: ToastController, private ruta: ActivatedRoute) { }

  ngOnInit() {
    this.ruta.params.subscribe((params: Params) => {

      if(params.id == 0){
        // registra medicamento
      }else{
        this.servicio.getMedicamentoByID(params.id).subscribe(res => {
          this.mid = res['medicamento'].id_medicamento;
          this.mMedicamento = res['medicamento'].nombre_medicamento;
          this.mHorario = res['medicamento'].horario;
          this.mDosis = res['medicamento'].dosis;
          this.mFechaInicio = res['medicamento'].fecha_inicio;
          this.mFechaFin = res['medicamento'].fecha_fin
          this.codigoPersona = res['medicamento'].fk_usuario;
          this.mrep=res['medicamento'].rep;
          this.maux= res['medicamento'].aux;
        });
      }
    });
  }

  onGuardar(){
    const dataMedicamento = {
      id_medicamento: this.mid,
      nombre_medicamento: this.mMedicamento,
      horario: this.mHorario,
      dosis: this.mDosis,
      fecha_inicio: this.mFechaInicio,
      fecha_fin: this.mFechaFin,
      fk_usuario: localStorage.getItem('id'),
      rep: this.mrep,
      aux: 0
    }

if(this.mMedicamento != null && this.mHorario!=null &&this.mDosis!=null &&this.mFechaInicio!=null &&this.mFechaFin!=null){
    if(this.mid){
      this.servicio.updateMedicamento(dataMedicamento, this.mid).subscribe(res => {
        console.log(res);
        this.presentToast('Datos actualizados')
        this.router.navigate(['/listado-med'])
      });
    }else{
      this.servicio.addMedicamento(dataMedicamento).subscribe(res => {
        console.log(res);
        this.presentToast('Datos guardados')
        this.router.navigate(['/listado-med'])
      })
    }
  }else{
     this.presentToast('Debe rellenar todos los campos')
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
