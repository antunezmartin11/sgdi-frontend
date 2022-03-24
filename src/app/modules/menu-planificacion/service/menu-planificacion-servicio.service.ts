import { Injectable } from '@angular/core';
import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class MenuPlanificacionServicioService {

  constructor(private api: ApiSIGPService) { }

  getDireccion(){
    return this.api.getSIGP('organo/lista?id_organo=0')
  }
  getUGP(){
    return this.api.getSIGP('ugp_organo/lista?id=0')
  }
}
