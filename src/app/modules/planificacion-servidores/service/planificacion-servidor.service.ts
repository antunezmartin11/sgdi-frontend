import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionServidorService {

  constructor(private api: ApiSGDIService, private apiSIGP: ApiSIGPService) { }
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();
  @Output() cerrarModalRegistro: EventEmitter<any> = new EventEmitter();
  @Output() datoProducto: EventEmitter<any> = new EventEmitter();
  @Output() modalProducto: EventEmitter<any> = new EventEmitter();

  addVinculoServidor(parametro: any){
     return this.api.addVincularServidor('productoServidor/agregar',parametro)
  }
  getListaVinculados(){
    return this.api.getServidorAsignacion('productoServidor/listar')
  }
  addProgramacionServidor(parametro: any){
    return this.api.addProgramacionServidor('periodoActividad/agregar',parametro);
  }
  getPersonal(){
    return this.apiSIGP.getPersonal('PersonalActivo/listar');
  }
  getAOXunidad(nombre: any){
    return this.api.getAOxUnidad('actividadOperativa/getAOxUnidad?nombre='+nombre)
  }
  getProductoAOUnidad(id: number){
    return this.api.getProductoAOUnidad('productoAO/listarId?id='+id)
  }
  addServidor(parametro: any){
    return this.api.addServidor('productoServidor/agregarServidor',parametro)
  }
  countServidor(codigo: string){
    return this.api.countServidor('productoServidor/validarUsuario?codigo='+codigo)
  }
  listarServidor(){
    return this.api.listarServidor('productoServidor/listarServidor');
  }
  listarProductoServidor(id: number){
    return this.api.listarProductoServidor('productoServidor/listarProductos?id='+id)
  }
}
