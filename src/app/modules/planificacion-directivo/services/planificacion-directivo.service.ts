import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSIGPService} from "../../../services/apiSIGP.service";
import {ApiMAPROService} from "../../../services/api-mapro.service";
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class PlanificacionDirectivoService {

  constructor(private api: ApiSIGPService, private apiMAPRO: ApiMAPROService,
  private apiSGDI: ApiSGDIService) { }

  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();//Para enviar
  @Output() datos: EventEmitter<any> = new EventEmitter();
  @Output() datosDireccion: EventEmitter<any> = new EventEmitter();
  @Output() datosProducto: EventEmitter<any> = new EventEmitter();
  @Output() accion: EventEmitter<any> = new EventEmitter<any>();
  @Output() cerraModalHitoDetalle: EventEmitter<any> = new EventEmitter<any>();
  @Output() cerraModalProducto: EventEmitter<any> = new EventEmitter<any>();
  @Output() cerraModalDireccion: EventEmitter<any> = new EventEmitter<any>();
  cargarAE(){//Para cargar los datos de las acciones estrategicas del SIGP
    return this.api.getSIGP('AccionEstrategica/lista');
  }
  getObjetivo(){//Obtener los objetivos dle MAPRO
    return this.apiMAPRO.getObjetivo('procesos/listar-con-objetivo')
  }
  getProcesos(id:number){//obtener los productos del MAPRO
    return this.apiMAPRO.getProcesos('procesos/detalle/indicador/'+id)
  }
  getAccionVinculada(){//Obtener los acciones estrategicas vinculadas del sgdi
    return this.apiSGDI.get('accionEstrategica/listar');
  }
  addVincularAE(parametro: any){
    return this.apiSGDI.post('accionEstrategica/agregar',parametro)
  }
  getDocumento(){//Metodo para obtner los valores de la tabla tipodocumento
    return this.apiSGDI.get('tipoDocumento/listar');
  }
  addProductoAE(parametro: any){//Agregar productos a la accion estrategica
    return this.apiSGDI.post('productoAE/agregar', parametro)
  }
  getUltimoIdAE(){//Obtener el ultimo registro de vincular accion estratefica
    return this.apiSGDI.get('accionEstrategica/listarUltimo')
  }
  getProductoAE(id: number){//Metodo para obtener la lista de productos por el id de la accion estrategica
    return this.apiSGDI.get('productoAE/listarId?id='+id)
  }
  getDirectivo(){//Retornara la lista de directivos
    return this.api.getSIGP('organo/lista?id_organo=0');
  }
  addHitoDirectivo(param: any){//agregar registro de gito directivo
    return this.apiSGDI.post('hito/agregar',param)
  }
  getHitoDirectivo(id: number){//Obtener los hitos registros para directivos
    return this.apiSGDI.get('hito/listarTipo?tipo='+id)
  }
  addProgramacionAE(parametro: any){//Agregar registro de programacion de la AE
    return this.apiSGDI.post('accionEstrategica/agregarPeriodoAE',parametro)
  }

  addvinculaHito(parametro: any){//AGREGAR VINCULACION DE SERVIDORES CON EL HITO
    return this.apiSGDI.post('hito/agregarHitoDirectivo',parametro)
  }
  getHitoVinculado(tipo: number, idHito: number){//Obtener el hito vinculado
    return this.apiSGDI.get('hito/getHitoVinculado?tipo='+tipo+'&idHito='+idHito)
  }
  addAEDireccion(parametro: any){
    return this.apiSGDI.post('accionEstrategica/agregarAEDirectivo',parametro)
  }
  getAEDireccion(id){
    return this.apiSGDI.get('accionEstrategica/listarDireccionAE?id='+id)
  }
  getPersonal(){
    return this.api.getSIGP('PersonalActivo/listar');
  }
}
