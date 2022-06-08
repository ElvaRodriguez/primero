import { Component, OnInit} from '@angular/core';
import { ServicioService } from '../servicio.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  codigo;
  nombre;
  apellido;
  correo;
  telefono;
  nombre_encargado;
  telefono_encargado;
  password;
  passwordRep;


  constructor(public servicio: ServicioService, public router: Router,
    public toastCtrl: ToastController, private ruta: ActivatedRoute) { }

    ngOnInit(){
      this.ruta.params.subscribe((params: Params) =>{
        if(params.id == 0){
          //registra
        }else{
              this.servicio.getUsuarioByID(params.id).subscribe(res => {

                this.codigo = res['usuario'].id_usuario;
                this.nombre = res['usuario'].nombre;
                this.apellido = res['usuario'].apellido;
                this.correo = res['usuario'].correo;
                this.telefono = res['usuario'].telefono;
                this.nombre_encargado = res['usuario'].nombre_secundario;
                this.telefono_encargado = res['usuario'].telefono_secundario;
                this.password = res['usuario'].password;
                this.passwordRep = res['usuario'].password;
              });
        }
      });
    }

    onGuardar(){
      const dataUsuario = {
        id_usuario: this.codigo,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono: this.telefono,
        nombre_secundario: this.nombre_encargado,
        telefono_secundario: this.telefono_encargado,
        password: this.password,


      }
      if(this.nombre == null || this.apellido== null || this.correo == null || this.password == null || 
        this.passwordRep == null ||  this.nombre== null || this.telefono_encargado== null  ){

        this.presentToast('Debe rellenar todos los campos')

      }else{
        
      if(this.password == this.passwordRep){
        if(this.codigo){
          this.servicio.updateUsuario(dataUsuario, this.codigo).subscribe(res => {
            console.log(res);
            this.presentToast('Datos Actualizados')
            this.router.navigate(['/home'])
          });
        }else{
          this.servicio.addUsuario(dataUsuario).subscribe(res => {
            console.log(res);
            this.presentToast('Datos Guardados')
            this.router.navigate(['/login'])
          })
        }
      }else{
        this.presentToast('Las contraseñas no son iguales')
      }

     }

    }

    async presentToast(mensaje: string){
      const toast = await this.toastCtrl.create({
        message: mensaje,
        duration: 2000
      });
      toast.present();
    }

}
