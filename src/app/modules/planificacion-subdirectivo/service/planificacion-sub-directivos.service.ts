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
    return this.api.getAccionEstrategica('AccionEstrategica/lista');
  }
  getObjetivo(){
    return this.apiMAPRO.getObjetivo('procesos/listar-con-objetivo')
  }
  getProcesos(id:number){
    return this.apiMAPRO.getProcesos('procesos/detalle/indicador/'+id)
  }
  getActividadOperativa(){
    return this.api.getActividadOperativa('ActividadOperativa/filtro?id_ae=0&id_ciclo=126&id_etapa=7')
  }
  getUnidad(){
    return this.api.getUnidad('OrganoPersonal/listar')
  }
  getDocumento(){
    return this.apiSGDI.getTipoDocumento('tipoDocumento/listar')
  }
  getAOVinculada(){
    return this.apiSGDI.getActividadOperativaVinculada('actividadOperativa/listarAO')
  }
  addVinculaAO(parametro: any){
    return this.apiSGDI.addVincularAO('actividadOperativa/agregar', parametro)
  }
  getUltimoidAOV(){
    return this.apiSGDI.getUltimoAOV('actividadOperativa/listarUltimo')
  }
  addProductoAO(parametro: any){
    return this.apiSGDI.addProductoAO('productoAO/agregar',parametro)
  }
  gerProductoAO(id: number){
    return this.apiSGDI.getProductosAO('productoAO/listarId?id='+id)
  }
  getAccionEstrategicaDireccion(nombre: string){
    return this.apiSGDI.getAccionEstrategicaDireccion('accionEstrategica/listarAEDireccion?nombre='+nombre)
  }
  addAOUnidad(parametro: any){
    return this.apiSGDI.addUnidadActividadOperativa('actividadOperativa/agregarAOUnidad', parametro)
  }
  getListarAOUnidad(){
    return this.apiSGDI.getListaAOUnidad('actividadOperativa/listarAOUnidad')
  }
  contarAO(id: number){
    return this.apiSGDI.contarAO('actividadOperativa/countAO?id='+id)
  }
  getListarAOUnidadDireccion(nombre: string){
    return this.apiSGDI.getListaAOUnidad('actividadOperativa/listarAODireccion?nombreUnidad='+nombre)
  }
  getPersonal(){
    return this.api.getPersonal('PersonalActivo/listar');
  }
  updateEstadoDirectivo(id: number){
    return this.apiSGDI.updateEstadoAE('accionEstrategica/updateEstadoAE/'+id);
  }
  getlistaProductosAO(parametro: any){
    return this.apiSGDI.post('productoAO/listarProductosAO', parametro)
  }
  getListarDirecciones(){
    return this.api.getDirectivo('organo/lista?id_organo=0')
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
