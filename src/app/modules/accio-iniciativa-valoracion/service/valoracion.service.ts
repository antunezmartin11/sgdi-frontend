import {EventEmitter, Injectable, Output} from '@angular/core';
import {ApiSGDIService} from "../../../services/api-sgdi.service";

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  @Output() cerrarModalValoracion: EventEmitter<any> = new  EventEmitter<any>()

  @Output() datos: EventEmitter<any> = new  EventEmitter<any>();
  constructor(private api: ApiSGDIService) { }

  addValoracion(parametro : any){
    return this.api.post('accionIniciativa/agregarValoracion',parametro)
  }
  updateAccion(id: number){
    return this.api.post('accionIniciativa/updateFlag/'+id, null)
  }
}
