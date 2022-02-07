import { Component, OnInit } from '@angular/core';
import {PlanificacionServidoresService} from "./service/planificacion-servidores.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-planificacion-servidor',
  templateUrl: './planificacion-servidor.component.html',
  styleUrls: ['./planificacion-servidor.component.css'],
  providers: [ConfirmationService]
})
export class PlanificacionServidorComponent implements OnInit {
  listaDatos:any[]
  loading: boolean
  nombreServidor: any
  cargoServidor: any
  codigoServidor:any
  completarRegistroModal: boolean=false
  datos:any
  constructor(private api: PlanificacionServidoresService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cargaDatoUsuario()
    this.cargarAsingacion()
  }
  cargarAsingacion(){
    this.api.getListarAsignado(this.codigoServidor).subscribe(res=>{
      this.listaDatos=res.content
      this.listaDatos=this.numeracion(this.listaDatos)
    })
  }
  cargaDatoUsuario(){
    this.datos=JSON.parse(localStorage.getItem('usuario'))
    this.nombreServidor=this.datos.aPaterno+' '+this.datos.aMaterno+' '+this.datos.nombre
    this.cargoServidor=this.datos.cargo
    this.codigoServidor=this.datos.codigo
  }
  abrilModal(datos){
    this.completarRegistroModal=true
    this.api.datosCompletar.emit(datos)
    this.api.modalRegistro.subscribe(re=>{
      if(re!=undefined){
        this.completarRegistroModal=re
      }
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  validar(){
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea validar la programación realizada?',
      accept: () => {
        console.log('hola')
      }
    });
  }
}
