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
    return this.api.getListaAsignaciones('productoServidor/listarProductosCodigo?codigo='+codigo);
  }
  getPeriodo(id: number){
    return this.api.getPeriodoServidor('periodoActividad/listarId/'+id)
  }
  updatePeriodoServidor(id: number,parametro: any){
    return this.api.updatePeriodoServidor('periodoActividad/updatePeriodoActividad/'+id,parametro)
  }
  updateEstadoServidor(id: number, ){
    return this.api.updateEstadoServidor('productoServidor/updateEstadoServidor/'+id)
  }
  getServidor(codigo: string){
    return this.api.getServidor('productoServidor/listarServidorId/'+codigo)
  }
  getUGP(){
    return this.apiSIGP.getUGP('ugp_organo/lista?id=0')
  }
  getPersonal(){
    return this.apiSIGP.getPersonal('PersonalActivo/listar');
  }
  getDireccion(){
    return this.apiSIGP.getDirectivo('organo/lista?id_organo=0')
  }
}
