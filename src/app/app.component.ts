import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema de Gestión de Desempeño Institucional';
  items: MenuItem[];
  usuarioL:string | null
  estadoU: boolean=true
  estadoM: boolean=false
  estado: boolean=false
  estadoLogin: boolean=false
  mensajeError: string
  usuario: string='Centro de pronóstico hidrometeorológico e innovación en la región Junín'
  ngOnInit() {
    this.obtenerusuario()
    this.items = [
      {
        label: 'SGDI',
        icon: 'pi pi-fw pi-home',
        routerLink:['home']

      },
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink:['home']

      },
      {
        label: 'Planificación',
        icon: 'pi pi-fw pi-calendar-plus',
        routerLink:['planificacion']

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
    if(this.usuarioL!=null){
      this.estado=true
     }else {
      this.mensajeError="No se realizo el login"
    }
  }
}
