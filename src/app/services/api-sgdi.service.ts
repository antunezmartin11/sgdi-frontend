import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ApiSGDIService {

  constructor(private http: HttpClient) { }

  post(ruta:string, parametro: any): Observable<any>{
    return this.http.post(environment.apiURL+ruta, parametro)
  }
  get(ruta: string): Observable<any>{
    return this.http.get(environment.apiURL+ruta)
  }

  delete(ruta: string): Observable<any>{
    return this.http.delete(environment.apiURL+ruta);
  }
}
