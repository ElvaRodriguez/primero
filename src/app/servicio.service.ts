 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  //login

  login(dataUsuario){
    return this.http.post(environment.url + 'usuarioIngresar', dataUsuario)
  }

//recuperar contraseña
recuperar(dataUsuario){
  return this.http.put(environment.url + 'usuarioRecuperar', dataUsuario)
}

  // metodos para usuario

  getListaUsuario(){
    return this.http.get(environment.url + 'usuarios')
  }

  addUsuario(dataUsuario){
    console.log('test');
    return this.http.post(environment.url + 'usuarios', dataUsuario)
  }

  updateUsuario(dataUsuario, id){
    return this.http.put(environment.url + 'usuario/' + id, dataUsuario)
  }

  deleteUsuario(id){
    return this.http.delete(environment.url + 'usuario/' + id);
  }

  getUsuarioByID(id){
    return this.http.get(environment.url + 'usuario/' + id);
  }

  // metodos para medicamentos

  getListaMedicamento(){
    return this.http.get(environment.url + 'medicamentos')
  }

  addMedicamento(dataMedicamento){
    return this.http.post(environment.url + 'medicamento', dataMedicamento)
  }

  updateMedicamento(dataMedicamento, id){
    return this.http.put(environment.url + 'medicamento/' + id, dataMedicamento)
  }

  deleteMedicamento(id){
    return this.http.delete(environment.url + 'medicamento/' + id);
  }

  getMedicamentoByID(id){
    return this.http.get(environment.url + 'medicamento/' + id);
  }

  getMedicamentoByUsuario(fk_usuario){
    return this.http.get(environment.url + 'medicamentoUS/' + fk_usuario);
  }



  // metodos para consultas

  getListaConsulta(){
    return this.http.get(environment.url + 'consultas')
  }

  addConsulta(dataConsulta){
    return this.http.post(environment.url + 'consulta', dataConsulta)
  }

  updateConsulta(dataConsulta, id){
    return this.http.put(environment.url + 'consulta/' + id, dataConsulta)
  }

  deleteConsulta(id){
    return this.http.delete(environment.url + 'consulta/' + id);
  }

  getConsultaByID(id){
    return this.http.get(environment.url + 'consulta/' + id);
  }

  getConsultaByUsuario(fk_usuario){
    return this.http.get(environment.url + 'consultaUS/' + fk_usuario) ;
  }


}
