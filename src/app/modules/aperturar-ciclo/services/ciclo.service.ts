import { Injectable } from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class CicloService {

  constructor(private api: ApiSGDIService) { }

  listarCiclo(){
    return this.api.get('ciclo/listarCiclo');
  }

  addCiclo(parametro: any){
    return this.api.post('ciclo/agregar',parametro);
  }

}
