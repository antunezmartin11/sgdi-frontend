import {EventEmitter, Injectable, Output} from '@angular/core';

import {ApiSIGPService} from "../../../services/apiSIGP.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 @Output() datosEnviarLogin: EventEmitter<any> = new EventEmitter();
  constructor(private api: ApiSIGPService) { }

  login(usu:string,pas:string){
    return this.api.login('Seguridad/login?usu='+usu+'&pass='+pas);
  }

}
