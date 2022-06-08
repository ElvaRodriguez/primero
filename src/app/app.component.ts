import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, ToastController, AlertController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioService } from './servicio.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { Observable } from 'rxjs';
import { ClockServletService, valorReloj } from './clock-servlet.service';
import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit  {

  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  ampm: string;
  segundos: string;

  length;
  i=0; // para puntero de medicamento
  k=0; //para puntero de consulta
  parseHR;
  ps;
  horaReal;
  horaBD;
  fechahora;
  parseHB;

  dia1;
  mes1;
  anho1;
  fechaCalcu;

  p;
  hr;
  mr;
  sr;
  horacalcu;
  cc;

  dias;
  fechaBD;
  fechaDias;
  horaDias;
  fechaDiaBD;
  lengthConsulta;
  horaConsul;
  parseDias;
  parseDiaBD;

  cuidador;
  pacienteNombre;
  pacienteApellido;

  // CONSTRUCTOR
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router,
    public servicio: ServicioService,
    public menu: MenuController,
    private ruta: ActivatedRoute, 
    public toastCrl: ToastController,
    public alertController: AlertController,
    private servi: ClockServletService,
     private sms: SMS
  ) {
    this.initializeApp();
  }
  
  // FUNCION CUANDO INICIALIZA PROGRAMA
  initializeApp(){
    this.platform.ready().then(() => {

      if(localStorage.getItem('id') ){
        this.router.navigate(['/home'])
      }else{
        this.router.navigate(['/login'])
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

// FUNCIONES DEL MENÚ
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
 
  item;
  irUsuario(item){
    this.router.navigate(['registro',localStorage.getItem('id')]);
  }

  irMedicamento(){
    this.router.navigate(['/listado-med']);
  }

  irConsulta(){
    this.router.navigate(['/listado-consul']);
  }

  irGeo(){
    this.router.navigate(['/geo']);
  }

  irHistorial(){
    this.router.navigate(['/historial']);
  }

  cerrarSesion(){
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  // FUNCIONES PARA EL AUDIO
  reproducir() {
    const audio = new Audio('assets/icon/alarm-clock.mp3');
    audio.play();
  }

  parar() {
    const audio = new Audio('assets/icon/alarm-clock.mp3');
    audio.pause();
  }

  hour;
  minute;
  second;
  fecBD;
  horr;
  raux;
  parsehora;
  qq;
  aux2:number;

  ngOnInit() {
    
    if(localStorage.getItem('id') != null){
    
      // para recordatorio de medicamento
    
        this.ruta.params.subscribe((params: Params) => {
          this.servicio.getMedicamentoByUsuario(localStorage.getItem('id')).subscribe(res => {
           
            this.length=res['medicamentolista'].length;

            // atrapar fecha actual
            this.dia1= new Date().getDate();
            this.mes1 = new Date().getMonth() + 1;
            this.anho1= new Date().getFullYear();

            if(this.dia1<10){
              this.dia1='0'+this.dia1;
            }
            if(this.mes1<10){
              this.mes1='0'+this.mes1;
            }

            this.fechaCalcu= this.anho1 +'-'+ this.mes1 +'-'+ this.dia1 ;

            this.datos$=this.servi.getInfoReloj();
    
            this.datos$.subscribe(x => {
              this.hora = x.hora;
              this.minutos = x.minutos;
              this.dia = x.diadesemana;
              this.fecha = x.diaymes;
              this.ampm = x.ampm;
              this.segundos = x.segundo
                           
              // atrapar el horario actual
              this.hr= new Date().getHours();
              this.mr= new Date().getMinutes();
              this.sr= new Date().getSeconds();
    
              if(this.hr<10){
                this.hr= '0' + new Date().getHours();
              }
    
              if(this.mr<10)
              {
                this.mr= '0' + new Date().getMinutes();
              }
    
              if (this.sr <10){
                this.sr= '0' + new Date().getSeconds();
              }
    
              if(this.i === this.length ){
                this.i= 0;
              }
    
              this.horacalcu= this.hr +':'+ this.mr +':'+ this.sr;
              this.p= this.fechaCalcu +' '+ this.horacalcu; // Hora y fecha actual juntos

              this.horaBD = res['medicamentolista'][this.i].horario; //obtenemos la hora de la base de datos
              this.fechahora= this.fechaCalcu +' '+ this.horaBD // obtenemos fecha actual y hora de la BD  
              
             
              this.parseHB= Date.parse(this.fechahora) // convierte a milisegundos la hora de la BD 
              this.parseHR= Date.parse(this.p); // convierte milisegundos la hora real calculada por función.
            
            
              this.fecBD = res['medicamentolista'][this.i].fecha_fin;
              this.raux= res['medicamentolista'][this.i].rep ;

                this.raux= res['medicamentolista'][this.i].rep ;
                this.aux2=  this.raux + this.hr;  // toma el mas como una union ver eso
               if(this.aux2>24){
                  this.aux2=0;
                }
// Uso fecha_fin de la base de datos

if( this.fechaCalcu <= this.fecBD){
              if(this.parseHB === this.parseHR){
                  this.alarma();
                  this.reproducir();
                  console.log('paso if');
                }else{ 
                  
                  this.horr= this.aux2 +':'+ this.mr +':'+ this.sr;
                  this.qq= this.fechaCalcu +' '+ this.horr;
                  this.parsehora= Date.parse(this.qq)

                  if(this.parsehora === this.parseHR){
                    this.alarma();
                    this.reproducir();
                    this.aux2 = this.raux + this.hr;
                  console.log('entro else') }
                } 
              }
                    this.i= this.i + 1;

            });
          
          });      

          // Para recordatorio de consulta
          this.servicio.getConsultaByUsuario(localStorage.getItem('id')).subscribe(res => {
           
            this.lengthConsulta=res['consultalista'].length; 

            this.datos$=this.servi.getInfoReloj();
    
            this.datos$.subscribe(x => {
              this.hora = x.hora;
              this.minutos = x.minutos;
              this.dia = x.diadesemana;
              this.fecha = x.diaymes;
              this.ampm = x.ampm;
              this.segundos = x.segundo;

              // atrapar el horario actual
              this.hour= new Date().getHours()+2;
              this.minute= new Date().getMinutes();
              this.second= new Date().getSeconds();
    
              if(this.hour<10){
                this.hour= '0' + new Date().getHours()+2;
              }
    
              if(this.minute<10)
              {
                this.minute= '0' + new Date().getMinutes();
              }
    
              if (this.second <10){
                this.second= '0' + new Date().getSeconds();
              }
 
              this.horaDias= this.hour +':'+ this.minute +':'+ this.second;
              this.fechaDias = this.fechaCalcu+' '+this.horaDias;

              if(this.k === this.lengthConsulta ){
                this.k= 0;
              }

              this.fechaBD = res['consultalista'][this.k].fecha_consulta; //obtenemos la fecha de la base de datos
              this.horaConsul=res['consultalista'][this.k].horario;
              this.fechaDiaBD= this.fechaBD+' '+this.horaConsul;

              this.parseDias=Date.parse(this.fechaDias);
              this.parseDiaBD=Date.parse(this.fechaDiaBD);

              if( this.parseDias === this.parseDiaBD ){
                this.alarmaConsulta();
                this.reproducir();
              }

              this.k= this.k + 1;
    
            });
          
          });  

    });
    
    } else{
      // entra aqui y no hace nada
    }
 } // fin init


 // FUNCION PARA ENVIAR MENSAJE DE TEXTO 

 enviarSMS(){ 

  this.ruta.params.subscribe((params: Params) => {

    // para mandar mensaje al cuidador del usuario logueado
    
    this.servicio.getUsuarioByID(localStorage.getItem('id')).subscribe(res => {
     
      this.cuidador= res['usuario'].telefono_secundario;
      this.pacienteNombre= res['usuario'].nombre;
      this.pacienteApellido=res['usuario'].apellido;

      this.sms.send( this.cuidador , 
          'El paciente '+this.pacienteNombre+' '+this.pacienteApellido+' debe tomar su medicamento !');

     });  

 });
}

// puedo poner dentro del init con una funcion que busque el numero telefonico del cuidador del 
// usuario logueado y desde ahi hacer la funcion de enviar el mensaje

 // PARA ALERTA DE MEDICAMENTO
     async alarma() {
      const alert = await this.alertController.create({
        header: 'Recordatorio de Medicamento',
        message: 'No olvide tomar su medicamento !',
        buttons: [
          {
            text: 'Ir a MedCa',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.router.navigate(['home']);
              this.parar();
              console.log('Redireccionado');
            }
          }, {
            text: 'Suspender',
            handler: () => {
              console.log('suspendido');
            }
          }
        ]
      });
  
      await alert.present();
    }



    //ALERTA PARA LA CONSULTA

    async alarmaConsulta() {
      const alert = await this.alertController.create({
        header: 'Recordatorio de Consulta',
        message: 'No olvide su consulta marcada!',
        buttons: [
          {
            text: 'Ir a MedCa',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.router.navigate(['home']);
              this.parar();
              console.log('Redireccionado');
            }
          }, {
            text: 'Suspender',
            handler: () => {
              console.log('suspendido');
            }
          }
        ]
      });
  
      await alert.present();
    }    

  
}
