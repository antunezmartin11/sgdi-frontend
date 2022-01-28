import { Injectable } from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class ControlInternoService {

  constructor(private apiSGDI: ApiSGDIService,
              private api: ApiSIGPService) { }

  getTipoDoc(){
    return this.apiSGDI.getTipoDocumento('tipoDocumento/listar');
  }

  getOrgano(){
    return this.api.getOrgano('organo/lista?id_organo=0');
  }
  addProducto(param:any){
    return this.apiSGDI.addProductoPriorizado('productoPriorizado/agregar',param)
  }
  getProductoPriorizado(){
    return this.apiSGDI.getProductoPriorizado('productoPriorizado/listarCompleto')
  }

}
