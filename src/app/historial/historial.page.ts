
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  medicamentos;
  consultas;

  constructor(public servicio: ServicioService, public router: Router, public toastCtrl: ToastController,
    public ruta: ActivatedRoute, public menu: MenuController) {
     
     }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.onListadoByUsuario();
    this.onListadoConsultaByUsuario();
    this.menu.enable(true); 
    
   }

   // variables para hacer el parse
   c; // en medicamento
   a; // en medicamento

   p; // en consulta
   l; //en consulta

   b; // fecha actual

   // para el length
   s=0; // en medicamento
   v=0; // en consulta

   // para la fehca
   fecha;
   dia;
   mes;
   anho;  

   // para el array de medicamento
   mMedi;
   mfecha;

   //para el array de consultas
   cEspe;
   cFechaCon;

   // arrays

   arrayMedicamentos: any[] =[];
   arrayConsultas: any[] =[];

// puntero
j=0;

   onListadoByUsuario(){
    this.ruta.params.subscribe((params: Params) => {
            this.servicio.getMedicamentoByUsuario(localStorage.getItem('id')).subscribe(res => {     
              
              
      this.dia=  new Date().getDate();
      this.mes=new Date().getMonth() + 1;
      this.anho=new Date().getFullYear();

// condicional para poner el 0 a los numeros menores a 10; por formato de zona horaria
      if(this.dia >= '10' ){
        this.fecha= this.anho + '-' + this.mes + '-' + this.dia;}
        else{
          this.dia= '0'+ new Date().getDate();
          this.fecha= this.anho + '-' + this.mes + '-' + this.dia;
        }       
          this.b = Date.parse(this.fecha); // fecha actual
          this.s= res['medicamentolista'].length; //calcula el total del array


          for(let i=0; i<this.s;i++){

            this.c=res['medicamentolista'][i].fecha_fin // toma la fecha fin en la posicion i para comparar
          //  console.log(this.c)
            this.a = Date.parse(this.c);   // fecha fin
         

            // si fecha actual es mayor a fecha fin; solo imprime nombre de medicamento y fecha fin
            if(this.b > this.a ){ 
              this.arrayMedicamentos[this.j]=res['medicamentolista'][i];
            //  console.log(this.arrayMedicamentos);
              this.j=this.j+1;
            }

          }

          });      
    });  } 


    onListadoConsultaByUsuario(){
      this.ruta.params.subscribe((params: Params) => {
              this.servicio.getConsultaByUsuario(localStorage.getItem('id')).subscribe(res => {
                this.consultas = res['consultalista'];        
              
              });      
      });  }

    
   async presentToast( mensaje: string ) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
