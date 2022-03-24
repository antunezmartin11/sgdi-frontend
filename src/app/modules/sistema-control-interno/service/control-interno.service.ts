import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class ControlInternoService {
  @Output() datosModificar: EventEmitter<any> = new EventEmitter();//Para enviar

  constructor(private apiSGDI: ApiSGDIService,
              private api: ApiSIGPService) { }
  getTipoDoc(){
    return this.apiSGDI.get('tipoDocumento/listar');
  }

  getOrgano(){
    return this.api.getSIGP('organo/lista?id_organo=0');
  }
  addProducto(param:any){
    return this.apiSGDI.post('productoPriorizado/agregar',param)
  }
  getProductoPriorizado(){
    return this.apiSGDI.get('productoPriorizado/listarCompleto')
  }
  updateProducto(id: number, parametro: any){
    return this.apiSGDI.post('productoPriorizado/updateProducto/'+id,parametro)
  }
}
