import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {PlanificacionSubDirectivosService} from "./service/planificacion-sub-directivos.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-planificacion-subdirectivo',
  templateUrl: './planificacion-subdirectivo.component.html',
  styleUrls: ['./planificacion-subdirectivo.component.css'],
  providers: [HomeComponent]
})
export class PlanificacionSubdirectivoComponent implements OnInit {
  datos:any[];
  loading: boolean = true;
  @Input() datosModal: any;//Para recibir
  @Output() estado: EventEmitter<any> = new EventEmitter();//Para enviar al modal de registro de AE
  @Output() estadoHito: EventEmitter<any> = new EventEmitter();
  @ViewChild('dt1') table : Table;
  modal: boolean=false;
  listaAccionEstrategica: any[];
  modalHito: boolean=false
  estadoModalHito:boolean
  listaDatosVinculados: any
  modalProductoAO: boolean=false
  constructor( private api: PlanificacionSubDirectivosService, private app: HomeComponent) { }

  ngOnInit(): void {
    this.app.getUsuario()
    this.cargarAOVinculada()
    this.loading=false
  }


  abrilModal(){
    this.modal=true
    this.api.cerrarModal.subscribe(res=>{
      if(res!=undefined){
        this.modal=res
      }
    })
  }
  abrilModalHito(){
    this.estadoModalHito=true
    this.api.cerrarModal.subscribe(res=>{
      if(res!=undefined){
        this.estadoModalHito=res
      }
    })
  }
  cargarAOVinculada(){
    this.api.getListarAOUnidad().subscribe(res=>{
      this.listaDatosVinculados=this.numeracion(res.content)
    });
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  abrilModalProductosAO(id:number){
    this.modalProductoAO=true
    this.api.datos.emit(id)
    this.api.cerrarModal.subscribe(res=>{
      if(res!=undefined){
        this.modalProductoAO=res
      }
    })
  }

}
