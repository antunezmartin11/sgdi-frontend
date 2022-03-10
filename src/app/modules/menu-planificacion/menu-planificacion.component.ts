import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {MenuPlanificacionServicioService} from "./service/menu-planificacion-servicio.service";

@Component({
  selector: 'app-menu-planificacion',
  templateUrl: './menu-planificacion.component.html',
  styleUrls: ['./menu-planificacion.component.css'],
  providers:[HomeComponent]
})
export class MenuPlanificacionComponent implements OnInit {
  listaDireccion:any=[]
  listaUGP:any=[]
  usuarioDireccion: any
  usuarioUnidad:any
  rol:string
  nombreUnidad: any
  constructor(private app: HomeComponent, private api: MenuPlanificacionServicioService) { }
  @ViewChild('contenido') element: ElementRef;
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
        console.log(this.nombreUnidad)
        if(this.nombreUnidad=='GERENCIA GENERAL' || this.nombreUnidad=='PRESIDENCIA EJECUTIVA'){
          this.rol='ALTA DIRECCION'
        }else{
          this.rol='DIRECTIVO'
        }

    }
    console.log(this.rol)
  }
  cargarDireccion(){
    this.api.getDireccion().subscribe(res=>{
      this.listaDireccion=res
      let dato=JSON.parse(localStorage.getItem('usuario'))
      this.nombreUnidad=dato.dependencia
      console.log(this.nombreUnidad)
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
