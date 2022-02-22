import { Component, OnInit } from '@angular/core';
import {PlanificacionServidoresService} from "./service/planificacion-servidores.service";
import {ConfirmationService, MessageService} from "primeng/api";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-planificacion-servidor',
  templateUrl: './planificacion-servidor.component.html',
  styleUrls: ['./planificacion-servidor.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PlanificacionServidorComponent implements OnInit {
  listaDatos:any[]
  loading: boolean
  nombreServidor: any
  cargoServidor: any
  codigoServidor:any
  estado:boolean
  completarRegistroModal: boolean=false
  datos:any
  estadoServidor: boolean
  idServidor: number
  modalFicha: boolean
  constructor(private api: PlanificacionServidoresService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargaDatoUsuario()
    this.cargarAsingacion()
  }
  cargarDatosServidor(){
    this.api.getServidor(this.codigoServidor).subscribe(res=>{
      this.estadoServidor=res.content[0].flag
    })
  }
  cargarAsingacion(){
    this.api.getListarAsignado(this.codigoServidor).subscribe(res=>{
      this.listaDatos=res.content
      this.listaDatos=this.numeracion(this.listaDatos)
      console.log(this.listaDatos)
      for(let i=0; i<this.listaDatos.length; i++){
        this.idServidor=this.listaDatos[i].idActividadServidor
        this.estado = this.listaDatos[i].flag != null;
      }
    })
 }
  cargaDatoUsuario(){
    this.datos=JSON.parse(localStorage.getItem('usuario'))
    this.nombreServidor=this.datos.aPaterno+' '+this.datos.aMaterno+' '+this.datos.nombre
    this.cargoServidor=this.datos.cargo
    this.codigoServidor=this.datos.codigo
    this.cargarDatosServidor()

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
    if(this.estado){
      this.confirmationService.confirm({
        message: '¿Esta seguro que desea validar la programación realizada?',
        accept: () => {
          this.api.updateEstadoServidor(this.idServidor).subscribe(res=>{
              this.messageService.add({key: 'mensaje', severity:'success', summary: 'Validación de actividades', detail: 'Validación Confirmada'});
              this.cargarDatosServidor()
          });
        }
      });
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Validación de actividades', detail: 'Tiene que programar todas las actividades asignadas'});
    }

  }
  abrirModalFicha(){
    this.modalFicha=true
    this.api.datosFicha.emit(this.listaDatos)
    this.api.modalFicha.subscribe(res=>{
      if(res!=undefined){
        this.modalFicha=res
      }
    })
  }
}
