import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class AccionIniciativaService {

  @Output() cerrarModalCompletarRegistro: EventEmitter<any> = new  EventEmitter<any>()
  @Output() cerrarModal: EventEmitter<any> = new  EventEmitter<any>()
  @Output() datos: EventEmitter<any> = new  EventEmitter<any>();
  constructor(private api: ApiSGDIService, private apiSIGP: ApiSIGPService) { }

  getAccionIniciativa(){
    return this.api.get('accionIniciativa/listar')
  }
  getAccionIniciativaValorada(){
    return this.api.get('accionIniciativa/listarViewAI')
  }
  getUnidad(){
    return this.apiSIGP.getSIGP('organo/lista?id_organo=0');
  }
  getDocumento(){
    return this.api.get('tipoDocumento/listar')
  }
  addAccionIniciativa(parametro: any){
    return this.api.post('accionIniciativa/agregar',parametro)
  }
  getRol(){
    return this.api.get('accionIniciativa/listarRol')
  }
  getPersonal(){
    return this.apiSIGP.getSIGP('PersonalActivo/listar');
  }
  addEquipo(parametro: any){
    return this.api.post('equipo/agregar',parametro)
  }
  completarRegistro(parametro: any, id: number){
    return this.api.post('accionIniciativa/updateAccionIniciativa/'+id, parametro)
  }
  listarInformes(){
    return this.api.get('informeAuditoria/listaCompleta')
  }
}
