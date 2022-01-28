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
    return this.api.getAccionIniciativa('accionIniciativa/listar')
  }
  getUnidad(){
    return this.apiSIGP.getOrgano('organo/lista?id_organo=0');
  }
  getDocumento(){
    return this.api.getTipoDocumento('tipoDocumento/listar')
  }
  addAccionIniciativa(parametro: any){
    return this.api.addAccionIniciativa('accionIniciativa/agregar',parametro)
  }
}
