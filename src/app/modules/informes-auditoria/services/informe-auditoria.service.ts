import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSIGPService} from "../../../services/apiSIGP.service";
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class InformeAuditoriaService {

  @Output() data: EventEmitter<any> = new EventEmitter();//Para enviar
  @Output() dataModal: EventEmitter<any> = new EventEmitter();//Para enviar
  @Output() datosModificar: EventEmitter<any> = new EventEmitter();//Para enviar
  constructor(private api: ApiSIGPService,
              private apiSGDI: ApiSGDIService) { }


  getOrgano(){
    return this.api.getSIGP('organo/lista?id_organo=0');

  }
  getTipoDoc(){
    return this.apiSGDI.get('tipoDocumento/listar');
  }
  addRegistro(parametro: any){
    return this.apiSGDI.post("informeAuditoria/agregar",parametro)
  }
  listarInformes(){
    return this.apiSGDI.get('informeAuditoria/listaCompleta')
  }
  addRecomendacion(parametro:any){
    return this.apiSGDI.post('recomendacion/agregar', parametro)
  }
  ultimoRegistro(){//Obtener el ultimo registro de la tabla de informe de auditoria
    return this.apiSGDI.get('informeAuditoria/listarUltimo')
  }
  getRecomendacionId(id: number){
    return this.apiSGDI.get('recomendacion/getRecomendacion?id='+id);
  }
  updateInforme(parametro: any, id: number){
    return this.apiSGDI.post('informeAuditoria/modificarInforme/'+id, parametro)
  }
}
