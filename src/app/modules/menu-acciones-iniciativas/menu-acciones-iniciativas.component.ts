import { Component, OnInit } from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {MenuPlanificacionServicioService} from "../menu-planificacion/service/menu-planificacion-servicio.service";

@Component({
  selector: 'app-menu-acciones-iniciativas',
  templateUrl: './menu-acciones-iniciativas.component.html',
  styleUrls: ['./menu-acciones-iniciativas.component.css'],
  providers:[HomeComponent]
})
export class MenuAccionesIniciativasComponent implements OnInit {
  listaDireccion:any=[]
  listaUGP:any=[]
  usuarioDireccion: any
  usuarioUnidad:any
  rol:string
  nombreDireccion: any
  nombreUnidad: string
  constructor(private app: HomeComponent, private api: MenuPlanificacionServicioService) { }
  ngOnInit(): void {
    this.app.getUsuario()
    this.cargarDireccion()
  }
  obtenerRol(){
    let us = JSON.parse(localStorage.getItem('usuario'))
    let idResponsables = us.codigo
    let directivo=this.listaDireccion.find(d=>d.id_responsable===idResponsables)
    if(directivo==undefined){
      let d=this.listaUGP.find(u=>u.id_responsable==idResponsables)
      if(d==undefined){
        this.rol='SERVIDOR'
      }else {
        this.rol="SUBDIRECTIVO"
      }
    }else{

      if(this.nombreDireccion=='GERENCIA GENERAL' || this.nombreDireccion=='PRESIDENCIA EJECUTIVA'){
        this.rol='ALTA DIRECCION'
      }else{
        this.rol='DIRECTIVO'
      }

    }

  }
  cargarDireccion(){
    this.api.getDireccion().subscribe(res=>{
      this.listaDireccion=res
      let dato=JSON.parse(localStorage.getItem('usuario'))
      this.nombreDireccion=dato.dependencia
      this.nombreUnidad=dato.unidad

      this.cargarUGP()

    })

  }
  cargarUGP(){
    this.api.getUGP().subscribe(res=>{
      this.listaUGP=res
      this.obtenerRol()

    })
  }
}
