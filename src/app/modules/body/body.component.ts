import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {LoginService} from "../login/services/login.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  items: MenuItem[];
  nombreUsuario: any;
  public usu: Array<any>=[];
  usuarioL:string | null
  estadoU: boolean=true
  estadoM: boolean=false
  estado: boolean=false
  usuario: string='Centro de pronóstico hidrometeorológico e innovación en la región Junín'
  constructor(public router: Router, public loginService: LoginService) {
  }
  ngOnInit() {
    this.obtenerusuario()
    this.items = [
      {
        label: 'SGDI',
        routerLink:['../home']

      },
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink:['../home']

      },
      {
        label: 'Planificación',
        icon: 'pi pi-fw pi-calendar-plus',
        routerLink:['../planificacion']

      },
      {
        label: 'Seguimiento',
        icon: 'pi pi-fw pi-list',
        routerLink:['']

      },
      {
        label: 'Evaluacion',
        icon: 'pi pi-fw pi-check',
        routerLink:['']

      },
    ];
  }
  obtenerusuario(){
    this.usuarioL=localStorage.getItem('usuario')
    if(this.usuarioL!=undefined){
      this.estado=true
    }

  }

  cerrarSesion(){
    localStorage.removeItem('usuario')
    this.router.navigate(['login'])
  }
}
