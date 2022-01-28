import { Injectable } from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  constructor(private api: ApiSGDIService) { }

  listarCiclo(){
    return this.api.getCiclo('ciclo/listarCiclo');
  }

  addCiclo(parametro: any){
    return this.api.addCiclo('ciclo/agregar',parametro);
  }

}
