import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSIGPService} from "../../../services/apiSIGP.service";
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class InformeAuditoriaService {

  @Output() data: EventEmitter<any> = new EventEmitter();//Para enviar
  @Output() dataModal: EventEmitter<any> = new EventEmitter();//Para enviar
  constructor(private api: ApiSIGPService,
              private apiSGDI: ApiSGDIService) { }


  getOrgano(){
    return this.api.getOrgano('organo/lista?id_organo=0');
  }
  getTipoDoc(){
    return this.apiSGDI.getTipoDocumento('tipoDocumento/listar');
  }
  addRegistro(parametro: any){
    return this.apiSGDI.addRegistro("informeAuditoria/agregar",parametro)
  }
  listarInformes(){
    return this.apiSGDI.getInformeAuditoria('informeAuditoria/listaCompleta')
  }
  addRecomendacion(parametro:any){
    return this.apiSGDI.addRecomendacion('recomendacion/agregar', parametro)
  }
  ultimoRegistro(){//Obtener el ultimo registro de la tabla de informe de auditoria
    return this.apiSGDI.listarultimoInformeAuditoria('informeAuditoria/listarUltimo')
  }
  getRecomendacionId(id: number){
    return this.apiSGDI.listaRecomendacionId('recomendacion/getRecomendacion?id='+id);
  }
}
