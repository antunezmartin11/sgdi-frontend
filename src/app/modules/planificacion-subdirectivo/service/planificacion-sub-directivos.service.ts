import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSIGPService} from "../../../services/apiSIGP.service";
import {ApiMAPROService} from "../../../services/api-mapro.service";
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionSubDirectivosService {
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();//Para enviar
  @Output() datos: EventEmitter<any> = new EventEmitter();
  @Output() datosFichaDirectivo: EventEmitter<any> = new EventEmitter();
  @Output() modalFichaDirectivo: EventEmitter<any> = new EventEmitter();
  @Output() datosModificar: EventEmitter<any> = new EventEmitter();
  constructor(private api: ApiSIGPService, private apiMAPRO: ApiMAPROService,
              private apiSGDI: ApiSGDIService) { }

  cargarAE(){
    return this.api.getSIGP('AccionEstrategica/lista');
  }
  getObjetivo(){
    return this.apiMAPRO.getObjetivo('procesos/listar-con-objetivo')
  }
  getProcesos(id:number){
    return this.apiMAPRO.getProcesos('procesos/detalle/indicador/'+id)
  }
  getActividadOperativa(){
    return this.api.getSIGP('ActividadOperativa/filtro?id_ae=0&id_ciclo=126&id_etapa=7')
  }
  getUnidad(){
    return this.api.getSIGP('OrganoPersonal/listar')
  }
  getDocumento(){
    return this.apiSGDI.get('tipoDocumento/listar')
  }
  getAOVinculada(){
    return this.apiSGDI.get('actividadOperativa/listarAO')
  }
  addVinculaAO(parametro: any){
    return this.apiSGDI.post('actividadOperativa/agregar', parametro)
  }
  getUltimoidAOV(){
    return this.apiSGDI.get('actividadOperativa/listarUltimo')
  }
  addProductoAO(parametro: any){
    return this.apiSGDI.post('productoAO/agregar',parametro)
  }
  gerProductoAO(id: number){
    return this.apiSGDI.get('productoAO/listarId?id='+id)
  }
  getAccionEstrategicaDireccion(nombre: string){
    return this.apiSGDI.get('accionEstrategica/listarAEDireccion?nombre='+nombre)
  }
  addAOUnidad(parametro: any){
    return this.apiSGDI.post('actividadOperativa/agregarAOUnidad', parametro)
  }
  getListarAOUnidad(){
    return this.apiSGDI.get('actividadOperativa/listarAOUnidad')
  }
  contarAO(id: number){
    return this.apiSGDI.get('actividadOperativa/countAO?id='+id)
  }
  getListarAOUnidadDireccion(nombre: string){
    return this.apiSGDI.get('actividadOperativa/listarAODireccion?nombreUnidad='+nombre)
  }
  getPersonal(){
    return this.api.getSIGP('PersonalActivo/listar');
  }
  updateEstadoDirectivo(id: number){
    return this.apiSGDI.post('accionEstrategica/updateEstadoAE/'+id, null);
  }
  getlistaProductosAO(parametro: any){
    return this.apiSGDI.post('productoAO/listarProductosAO', parametro)
  }
  getListarDirecciones(){
    return this.api.getSIGP('organo/lista?id_organo=0')
  }
  getProductoAE(parametro: any){
    return this.apiSGDI.post('productoAE/listarProductoAE', parametro)
  }
  getPeriodoAE(id: number){
    return this.apiSGDI.get('accionEstrategica/listarPeriodoAE/'+id);
  }
  getEquipoAI(parametro: any){
    return this.apiSGDI.post('equipo/listarAIEquipo',parametro)
  }
}
