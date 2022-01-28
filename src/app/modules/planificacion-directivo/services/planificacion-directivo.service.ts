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
    return this.api.getAccionEstrategica('AccionEstrategica/lista');
  }
  getObjetivo(){//Obtener los objetivos dle MAPRO
    return this.apiMAPRO.getObjetivo('procesos/listar-con-objetivo')
  }
  getProcesos(id:number){//obtener los productos del MAPRO
    return this.apiMAPRO.getProcesos('procesos/detalle/indicador/'+id)
  }
  getAccionVinculada(){//Obtener los acciones estrategicas vinculadas del sgdi
    return this.apiSGDI.listarAccionEstrategica('accionEstrategica/listar');
  }
  addVincularAE(parametro: any){
    return this.apiSGDI.addAEDirectivo('accionEstrategica/agregar',parametro)
  }
  getDocumento(){//Metodo para obtner los valores de la tabla tipodocumento
    return this.apiSGDI.getTipoDocumento('tipoDocumento/listar');
  }
  addProductoAE(parametro: any){//Agregar productos a la accion estrategica
    return this.apiSGDI.addProductoAE('productoAE/agregar', parametro)
  }
  getUltimoIdAE(){//Obtener el ultimo registro de vincular accion estratefica
    return this.apiSGDI.getUltimoIdAE('accionEstrategica/listarUltimo')
  }
  getProductoAE(id: number){//Metodo para obtener la lista de productos por el id de la accion estrategica
    return this.apiSGDI.getProductosAE('productoAE/listarId?id='+id)
  }
  getDirectivo(){//Retornara la lista de directivos
    return this.api.getDirectivo('organo/lista?id_organo=0');
  }
  addHitoDirectivo(param: any){//agregar registro de gito directivo
    return this.apiSGDI.addHitoDirectivo('hito/agregar',param)
  }
  getHitoDirectivo(id: number){//Obtener los hitos registros para directivos
    return this.apiSGDI.getHitoDirectivo('hito/listarTipo?tipo='+id)
  }
  addProgramacionAE(parametro: any){//Agregar registro de programacion de la AE
    return this.apiSGDI.addProgramacion('accionEstrategica/agregarPeriodoAE',parametro)
  }
  getUltimoHito(){//retorna el valor del ultimo hito
    return this.apiSGDI.getultimoHito('hito/ultimoHito');
  }
  addvinculaHito(parametro: any){//AGREGAR VINCULACION DE SERVIDORES CON EL HITO
    return this.apiSGDI.addVincularHito('hito/agregarHitoDirectivo',parametro)
  }
  getHitoVinculado(tipo: number, idHito: number){//Obtener el hito vinculado
    return this.apiSGDI.getHitoVinculado('hito/getHitoVinculado?tipo='+tipo+'&idHito='+idHito)
  }
  addAEDireccion(parametro: any){
    return this.apiSGDI.addAEDirectivo('accionEstrategica/agregarAEDirectivo',parametro)
  }
  getAEDireccion(id){
    return this.apiSGDI.getAEDireccion('accionEstrategica/listarDireccionAE?id='+id)
  }
}
