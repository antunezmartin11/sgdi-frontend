import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionServidoresService {

  @Output() modalRegistro: EventEmitter<any> = new EventEmitter();
  @Output() datosCompletar: EventEmitter<any> = new EventEmitter();

  constructor(private api: ApiSGDIService, private apiSIGP: ApiSIGPService) { }

  getListarAsignado(codigo: string){
    return this.api.getListaAsignaciones('productoServidor/listarProductosCodigo?codigo='+codigo);
  }
}
