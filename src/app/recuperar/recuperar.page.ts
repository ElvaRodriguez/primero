import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  email;
  passw;

  constructor(private servicio: ServicioService, private router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  enviarCorreo(){
    const dataUsuario = {
        correo: this.email,
        password: this.passw
  };
    this.servicio.recuperar(dataUsuario).subscribe(res => {

      if(this.email == null ){
        this.presentToast('Email campo obligatorio');
      }
    else{
        this.email = res['usuarioRecuperar'].correo,
        this.passw = res['usuarioRecuperar'].password
        this.router.navigate(['/login'])
        this.presentToast('Su contraseña fue reestablecida');
      }
    })
  }

  async presentToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
