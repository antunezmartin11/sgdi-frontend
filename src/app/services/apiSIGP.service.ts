import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccionEstrategica} from "../modelos/AccionEstrategica";
import {ActividadOperativa} from "../modelos/ActividadOperativa";
import {environment} from "../../environments/environment";
import {login} from "../modelos/login";
import {vincularHito} from "../modelos/hito";
@Injectable({
  providedIn: 'root'
})
export class ApiSIGPService {
  constructor(private http: HttpClient) { }

  getAccionEstrategica(ruta: string):Observable<AccionEstrategica[]>{
    return this.http.get<AccionEstrategica[]>(environment.apiUrlSIGP+ruta);
  }
  getActividadOperativa(ruta: string):Observable<ActividadOperativa[]>{
    return this.http.get<ActividadOperativa[]>(environment.apiUrlSIGP+ruta);
  }
  login(ruta:string):Observable<any>{
    return this.http.get<any>(environment.apiUrlSIGP+ruta);
  }
  getOrgano(ruta: string):Observable<any>{
    return this.http.get<any>(environment.apiUrlSIGP+ruta)
  }
  getUnidad(ruta: string): Observable<any>{
    return this.http.get<any>(environment.apiUrlSIGP+ruta)
  }
  getDirectivo(ruta: string):Observable<any>{
    return this.http.get<any>(environment.apiUrlSIGP+ruta)
  }
  getPersonal(ruta: string): Observable<any>{
    return this.http.get(environment.apiUrlSIGP+ruta)
  }
}
