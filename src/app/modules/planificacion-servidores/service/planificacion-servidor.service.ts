import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionServidorService {

  constructor(private api: ApiSGDIService, private apiSIGP: ApiSIGPService) { }
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();
  @Output() datosModificar: EventEmitter<any> = new EventEmitter();
  @Output() cerrarModalRegistro: EventEmitter<any> = new EventEmitter();
  @Output() datoProducto: EventEmitter<any> = new EventEmitter();
  @Output() modalProducto: EventEmitter<any> = new EventEmitter();
  @Output() modalFichaSubdirectivo: EventEmitter<any> = new EventEmitter();
  @Output() modalDatosSubdirectivo: EventEmitter<any> = new EventEmitter();


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
  listarServidorUnidad(nombre: string){
    return this.api.listarServidor('productoServidor/listarServidorUnidad?nombreUnidad='+nombre);
  }
  updateEstado(parametro: any, id: number){
    return this.api.updateEstado('productoServidor/updateEstado/'+id,parametro)
  }
  getListaActividadValidar(unidad: string){
    return this.api.getAOxUnidad('actividadOperativa/getAOxUnidad?nombre='+unidad)
  }
  updateEstadoSubDirectivo(id: number, parametro: any){
    return this.api.post('actividadOperativa/updateEstadoSubDirectivo/'+id, parametro)
  }
  updateEstadoAOUnidad(id: number,parametro: any){
    return this.api.post('actividadOperativa/updateEstadoAOUnidad/'+id,parametro)
  }
  getUGP(){
    return this.apiSIGP.getUGP('ugp_organo/lista?id=0')
  }
  getDireccion(){
    return this.apiSIGP.getDirectivo('organo/lista?id_organo=0')
  }
  updateProductoServidor(parametro: any, id: number){
    return this.api.post('productoServidor/updateProducto/'+id,parametro)
  }
  deleteProducto(id: number){
    return this.api.delete('productoServidor/eliminarProducto/'+id)
  }
  updateEstadoServidor(id: number, parametro:any){
    return this.api.post('productoServidor/updateEstadoServidor/'+id, parametro)
  }
  getProductos(parametro: any){
    return this.api.post('productoAO/listarProductosAO',parametro)
  }
  getCEPLAN(idOrgano: number, anio: number){
    return this.apiSIGP.getSIGP('Reporte/ceplan2?id_organo='+idOrgano+'&anio='+anio+'&id_ciclo=141&id_etapa=1')
  }
  getEquipoAI(parametro: any){
    return this.api.post('equipo/listarAIEquipo',parametro)
  }
}
