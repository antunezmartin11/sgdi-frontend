import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionServidorService {

  constructor(private api: ApiSGDIService) { }
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();

  addVinculoServidor(parametro: any){
     return this.api.addVincularServidor('productoServidor/agregar',parametro)
  }
  getListaVinculados(){
    return this.api.getServidorAsignacion('productoServidor/listar')
  }
  addProgramacionServidor(parametro: any){
    return this.api.addProgramacionServidor('periodoAO/agregar',parametro);
  }
}
