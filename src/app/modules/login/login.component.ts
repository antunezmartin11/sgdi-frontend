import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from "./services/login.service";
import {login} from "../../modelos/login";
import { Router } from "@angular/router";
import {stringify} from "@angular/compiler/src/util";
import {AppComponent} from "../../app.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string='';
  contrasenna:string='';
  mensajeError: boolean=false;
  errorLogin:boolean=false;
  mensaje='';
  datos: any
  validarUsu: any

  constructor(private loginService: LoginService,
              public router: Router,
              private app: AppComponent) { }

  ngOnInit(): void {
    this.validarUsuario()
  }

  login(){
    if(this.usuario.length>4 ){
      if(this.contrasenna.length>4){
        this.loginService.login(this.usuario, this.contrasenna).subscribe(res=>{
          this.datos=res
          if(this.datos.codigo!=null){
            localStorage.setItem('usuario', JSON.stringify(this.datos))
            this.router.navigate(['home'])
            let nombre= this.datos.aPaterno+" "+this.datos.aMaterno+" "+this.datos.nombre
            this.loginService.datosEnviarLogin.emit(this.datos)
          }else{
            this.mensaje='Los datos ingresados son incorrectos'
            this.mensajeError=true
          }
        })
        this.mensajeError=false
        this.mensaje=''
      }else{
        this.mensajeError=true
        this.mensaje='Tiene que ingresar una contraseña correcta'
      }
    }else {
      this.mensajeError=true
      this.mensaje='Tiene que ingresar un usuario valido'
    }
  }
  validarUsuario(){
    this.validarUsu=localStorage.getItem('usuario')
    if(this.validarUsu!=null || this.validarUsu!=undefined){
      this.router.navigate(['home'])
    }else{
      this.app.estado=true
    }
  }
}
