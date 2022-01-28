import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccionEstrategica} from "../modelos/AccionEstrategica";
import {environment} from "../../environments/environment";
import {Objetivo} from "../modelos/objetivo";
import {procesos} from "../modelos/procesos";

@Injectable({
  providedIn: 'root'
})
export class ApiMAPROService {

  constructor(private http: HttpClient) { }

  getObjetivo(ruta: string):Observable<Objetivo[]>{
    return this.http.get<Objetivo[]>(environment.apiMAPRO+ruta);
  }

  getProcesos(ruta: string):Observable<procesos[]>{
    return this.http.get<procesos[]>(environment.apiMAPRO+ruta);
  }
}
