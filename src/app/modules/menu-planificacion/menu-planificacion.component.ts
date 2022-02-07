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
    this.cargarUGP()
    console.log(this.rol)
  }
  comparUSuario() {
    let us = JSON.parse(localStorage.getItem('usuario'))
    let idResponsable = us.codigo
    this.usuarioDireccion = this.listaDireccion.find(d => d.id_responsable == idResponsable)

    if(this.usuarioDireccion!=undefined){
      this.rol='DIRECCION'
      console.log(this.rol)
    }
  }
  cargarDireccion(){
    this.api.getDireccion().subscribe(res=>{
      this.listaDireccion=res
      let dato=JSON.parse(localStorage.getItem('usuario'))
      this.nombreUnidad=dato.dependencia
      this.comparUSuario()
      console.log(this.listaDireccion)
    })

  }
  cargarUGP(){
    let us = JSON.parse(localStorage.getItem('usuario'))
    let idResponsable = us.codigo
    console.log('responsable '+idResponsable)
    this.api.getUGP().subscribe(res=>{
      this.listaUGP=res
      this.usuarioUnidad=this.listaUGP.find(u=>u.id_responsable==idResponsable)
      console.log(this.usuarioUnidad)
      if(this.usuarioUnidad!=undefined){
        this.rol="UNIDAD"
        console.log(this.rol)
      }else{
        this.rol="SERVIDOR"
      }
    })
  }

}
