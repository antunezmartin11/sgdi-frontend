import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionServidoresService {

  @Output() modalRegistro: EventEmitter<any> = new EventEmitter();
  @Output() datosCompletar: EventEmitter<any> = new EventEmitter();
  @Output() modalFicha: EventEmitter<any> = new EventEmitter();
  @Output() datosFicha: EventEmitter<any> = new EventEmitter();
  constructor(private api: ApiSGDIService, private apiSIGP: ApiSIGPService) { }

  getListarAsignado(codigo: string){
    return this.api.get('productoServidor/listarProductosCodigo?codigo='+codigo);
  }
  getPeriodo(id: number){
    return this.api.get('periodoActividad/listarId/'+id)
  }
  updatePeriodoServidor(id: number,parametro: any){
    return this.api.post('periodoActividad/updatePeriodoActividad/'+id,parametro)
  }
  updateEstadoServidor(id: number, parametro: any){
    return this.api.post('productoServidor/updateEstadoServidor/'+id, parametro)
  }
  getServidor(codigo: string){
    return this.api.get('productoServidor/listarServidorId/'+codigo)
  }
  getUGP(){
    return this.apiSIGP.getSIGP('ugp_organo/lista?id=0')
  }
  getPersonal(){
    return this.apiSIGP.getSIGP('PersonalActivo/listar');
  }
  getDireccion(){
    return this.apiSIGP.getSIGP('organo/lista?id_organo=0')
  }
  getProductosCodigo(codigo: string){
    return this.api.get('productoServidor/listaProducto/'+codigo)
  }
  getProductosPeriodo(id: number){
    return this.api.get('productoServidor/listarProductoPeriodo/'+id)
  }
  getEquipoAI(parametro: any){
    return this.api.post('equipo/listarAIEquipo',parametro)
  }
}
