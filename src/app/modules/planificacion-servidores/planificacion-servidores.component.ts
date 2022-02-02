import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {PlanificacionServidorService} from "./service/planificacion-servidor.service";

@Component({
  selector: 'app-planificacion-servidores',
  templateUrl: './planificacion-servidores.component.html',
  styleUrls: ['./planificacion-servidores.component.css']
})
export class PlanificacionServidoresComponent implements OnInit {
  datos:any[];
  loading: boolean = true;
  @Input() datosModal: any;//Para recibir
  @Output() estado: EventEmitter<any> = new EventEmitter();//Para enviar al modal de registro de AE
  @Output() estadoHito: EventEmitter<any> = new EventEmitter();
  @ViewChild('dt1') table : Table;
  modal: boolean=false;
  cerrarModalRegistro: boolean=false
  modalHito: boolean=false
  modalProducto: boolean=false
  listaDatos: any
  constructor(private api: PlanificacionServidorService) { }

  ngOnInit(): void {
    this.datos=[

    ]
    this.loading=false
  this.getServidorVinculacion()
  }

  abrilModal(){
    this.cerrarModalRegistro=true
    this.api.cerrarModalRegistro.subscribe(res=>{
      if(res!=null){
        this.cerrarModalRegistro=res
      }
    })
  }
  abrilModalHito(){
    this.modalHito=true
    this.api.cerrarModal.subscribe(res=>{
      if(res!=null){
        this.modalHito=res
      }
    })
  }
  getServidorVinculacion(){
    this.api.listarServidor().subscribe(res=>{
      this.listaDatos=this.numeracion(res.content)
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  abrirModalProducto(datos){
    this.modalProducto=true
    this.api.datoProducto.emit(datos.idActividadServidor)
    this.api.modalProducto.subscribe(re=>{
      if(re!=undefined){
        this.modalProducto=re
      }
    })
  }
}
