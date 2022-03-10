import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ciclo} from "../modelos/ciclo";
import {environment} from "../../environments/environment";
import {Respuesta} from "../modelos/respuesta";
import {InformeAuditoria} from "../modelos/informeAuditoria";
import {ProductoPriorizado} from "../modelos/productoPriorizado";
import {recomendacionAuditoria} from "../modelos/recomendacionAuditoria";
import {AccionEstrategica} from "../modelos/AccionEstrategica";
import {AccionEstrategicaV} from "../modelos/accionEstrategicaV";
import {productoAE} from "../modelos/productoAE";
import {ActividadOperativaV} from "../modelos/actividadOperativaV";
import {productoAO} from "../modelos/productoAO";
import {vincularServidor} from "../modelos/vincularServidor";
import {hito, vincularHito} from "../modelos/hito";
import {programacionAE} from "../modelos/programacionAE";
import {programacionServidor} from "../modelos/programacionServidor";
import {AccionIniciativa} from "../modelos/accionIniciativa";
import {AccionEstrategicaDirectivo} from "../modelos/accionEstrategicaDirectivo";
import {ActividadOperativa, actividadOperativaUnidad} from "../modelos/ActividadOperativa";


@Injectable({
  providedIn: 'root'
})
export class ApiSGDIService {

  constructor(private http: HttpClient) { }

  getCiclo(ruta: string): Observable<Respuesta<any>>{//Obtener la lista de cilos registrados
    return this.http.get<Respuesta<any>>(environment.apiURL+ruta)
  }
  addCiclo(ruta: string, ciclo: ciclo): Observable<Object>{//agregar registro en la tabla ciclo
    return this.http.post(environment.apiURL+ruta, ciclo);
  }
  getTipoDocumento(ruta:string):Observable<Respuesta<any>>{//obtener la lista de tipos de documentos
    return this.http.get<Respuesta<any>>(environment.apiURL+ruta)
  }
  addRegistro(ruta:string, informe: InformeAuditoria):Observable<Object>{//agregar registro en la tabla informe de auditoria
    return this.http.post<Object>(environment.apiURL+ruta, informe)
  }
  getInformeAuditoria(ruta: string): Observable<any>{//obtener la lista de informes de auditoria
    return this.http.get(environment.apiURL+ruta)
  }
  addProductoPriorizado(ruta: string, producto: ProductoPriorizado): Observable<any>{//realiza el registor de un producto priorizado
    return this.http.post<any>(environment.apiURL+ruta, producto);
  }
  getProductoPriorizado(ruta: string): Observable<any>{//Metodo para obtener la lista de productos priorizados
    return this.http.get(environment.apiURL+ruta);
  }
  addRecomendacion(ruta: string, recomendacion: recomendacionAuditoria): Observable<any>{//realizar el registro de las recomendaciones de informes de auditoria
    return this.http.post(environment.apiURL+ruta, recomendacion)
  }
  listarultimoInformeAuditoria(ruta: string):Observable<any>{//retorna el ultimo registro en la tabla uaditoria
    return this.http.get(environment.apiURL+ruta)
  }
  listaRecomendacionId(ruta: string): Observable<any>{//retorna la lista de recomendaciones por id de informe de auditoria
    return this.http.get(environment.apiURL+ruta)
  }
  listarAccionEstrategica(ruta: string):Observable<any>{//retorna la lista de acciones estrategicas registradas
    return this.http.get(environment.apiURL+ruta)
  }
  addAEDirectivo(ruta: string, parametro: AccionEstrategicaV):Observable<any>{//agregar regitro de la AE con el directivo y los objetivos
    return this.http.post(environment.apiURL+ruta,parametro)
  }
  addProductoAE(ruta: string, parametro: productoAE): Observable<any>{//agregar productos a la accion estrategica
    return this.http.post(environment.apiURL+ruta, parametro);
  }
  getUltimoIdAE(ruta: string): Observable<any>{//Retornar el ultimo valor de la plama accion estrategica
    return this.http.get(environment.apiURL+ruta)
  }
  getProductosAE(ruta: string):Observable<any>{//retornara la lista de los productos por el id de la accion estrategica
    return this.http.get(environment.apiURL+ruta)
  }
  getActividadOperativaVinculada(ruta: string):Observable<any>{//Retorna los valores de las actividades operativas vinculadas
    return this.http.get(environment.apiURL+ruta)
  }
  addVincularAO(ruta: string, parametro: ActividadOperativaV):Observable<any>{//Agrega registro para vincular actividad operativa
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getUltimoAOV(ruta: string): Observable<any>{//retorna el ultimo registro de la vinculacion de la actividad operativa
    return this.http.get(environment.apiURL+ruta)
  }

  addProductoAO(ruta: string, parametro: productoAO):Observable<any>{//agregar registro de productos a la actividad operativa
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getProductosAO(ruta: string): Observable<any>{//obtiene los productos registros a la actividad operativa
    return this.http.get(environment.apiURL+ruta)
  }
  addVincularServidor(ruta: string, parametro: vincularServidor): Observable<any>{//agrega registro de vinculacion a un servidor
    return this.http.post(environment.apiURL+ruta,parametro)
  }
  getServidorAsignacion(ruta: string): Observable<any>{//retorna la lista de asinaciones registradas
    return this.http.get(environment.apiURL+ruta)
  }
  addHitoDirectivo(ruta: string, param: hito):Observable<any>{//agregar reigstro de hito
    return  this.http.post(environment.apiURL+ruta, param)
  }
  getHitoDirectivo(ruta: string): Observable<any>{//Retorna la lista de hitos registrados para directivos
    return this.http.get(environment.apiURL+ruta)
  }
  addProgramacion(ruta: string, parametro: programacionAE): Observable<any>{//agrega registros para la tabla periodo accion estrategica
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  addProgramacionServidor(ruta: string, parametro: programacionServidor):Observable<any>{//agregarProgramacion para el servidor
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getultimoHito(ruta: string):Observable<any>{//Obtener el uiltimo id de hito registrado
    return this.http.get(environment.apiURL+ruta)
  }
  addVincularHito(ruta: string, parametro: vincularHito):Observable<any>{//agregar vinculacion al hito
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getHitoVinculado(ruta: string): Observable<any>{//obtener los registros vinculados con el hito
    return this.http.get(environment.apiURL+ruta);
  }
  getAccionIniciativa(ruta: string):Observable<any>{//obtener los registro de accion/ inciativa
    return this.http.get(environment.apiURL+ruta)
  }
  addAccionIniciativa(ruta:string, parametro: AccionIniciativa): Observable<any>{
    return this.http.post(environment.apiURL+ruta,parametro)
  }
  addAEDirecion(ruta: string, parametro: AccionEstrategicaDirectivo): Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getAEDireccion(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  getAccionEstrategicaDireccion(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta);
  }
  addUnidadActividadOperativa(ruta: string, parametro: actividadOperativaUnidad):Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getListaAOUnidad(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  getAOxUnidad(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta);
  }
  getProductoAOUnidad(ruta: string):Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  addServidor(ruta: string, parametro: any):Observable<any>{
    return this.http.post(environment.apiURL+ruta,parametro)
  }
  countServidor(ruta: string):Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  listarServidor(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta);
  }
  listarProductoServidor(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  contarAO(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  getListaAsignaciones(ruta: string):Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  addValoracion(ruta: string, parametro: any): Observable<any>{
    return this.http.post(environment.apiURL+ruta,parametro);
  }
  updateAccion(ruta: string): Observable<any>{
    return this.http.post(environment.apiURL+ruta,null)
  }
  getRol(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  addEquipo(ruta: string, parametro: any):Observable<any>{
    return this.http.post(environment.apiURL+ruta,parametro)
  }
  completarRegistro(ruta: string, parametro: any): Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  getPeriodoServidor(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  updatePeriodoServidor(ruta: string, parametro: any): Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  updateEstado(ruta: string, parametro:any): Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  updateEstadoServidor(ruta:string, parametro: any): Observable<any>{
    return this.http.post(environment.apiURL+ruta,parametro)
  }
  getServidor(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  updateEstadoSubDirectivo(ruta: string):Observable<any>{
    return this.http.post(environment.apiURL+ruta, null)
  }
  updateEstadoAOunidad(ruta: string):Observable<any>{
    return this.http.post(environment.apiURL+ruta, null)
  }
  updateEstadoAE(ruta: string):Observable<any>{
    return this.http.post(environment.apiURL+ruta, null)
  }
  getProductosCodigo(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }
  post(ruta:string, parametro: any): Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  get(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }

  delete(ruta: string): Observable<any>{
    return this.http.delete(environment.apiURL+ruta);
  }
}
