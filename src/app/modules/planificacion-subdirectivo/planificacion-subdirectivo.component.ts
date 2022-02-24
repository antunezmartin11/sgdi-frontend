import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {PlanificacionSubDirectivosService} from "./service/planificacion-sub-directivos.service";
import {HomeComponent} from "../home/home.component";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-planificacion-subdirectivo',
  templateUrl: './planificacion-subdirectivo.component.html',
  styleUrls: ['./planificacion-subdirectivo.component.css'],
  providers: [HomeComponent, ConfirmationService, MessageService]
})
export class PlanificacionSubdirectivoComponent implements OnInit {
  datos:any[];
  loading: boolean = true;
  @Input() datosModal: any;//Para recibir
  @Output() estado: EventEmitter<any> = new EventEmitter();//Para enviar al modal de registro de AE
  @Output() estadoHito: EventEmitter<any> = new EventEmitter();
  @ViewChild('dt1') table : Table;
  modal: boolean=false;
   estadoModalHito:boolean
  listaDatosVinculados: any
  modalProductoAO: boolean=false
  estadoValidado: boolean
  estadoFicha: boolean=false
  local: any
  datosAELocal: any
  listaAE: any[]
  abrirModalFicha: boolean
  datosFichaDirectivo: any
  constructor( private api: PlanificacionSubDirectivosService,
               private app: HomeComponent,
               private confirmationService: ConfirmationService,
               private messageService: MessageService) { }

  ngOnInit(): void {
    this.app.getUsuario()
    this.cargarAOVinculada()
    this.loading=false
    this.getAEDireccion()
  }
  getAEDireccion(){
    this.local=localStorage.getItem('usuario')
    this.datosAELocal=JSON.parse(this.local)
    this.api.getAccionEstrategicaDireccion(this.datosAELocal.dependencia).subscribe(res=>{
      this.listaAE=res.content
      console.log(this.listaAE)
      for(let i=0; i<this.listaAE.length; i++){
        if(this.listaAE[i].estado==null){
          this.estadoFicha=false
          break
        }else {
          this.estadoFicha=true
        }
      }
    })
  }

  abrilModal(){
     console.log('hola')
    this.modal=true
    this.api.cerrarModal.subscribe(res=>{
      if(res!=undefined){
        this.modal=res
      }
    })
  }

  cargarAOVinculada(){
    let datos=JSON.parse(localStorage.getItem('usuario'))
    this.api.getListarAOUnidadDireccion(datos.dependencia).subscribe(res=>{
      this.listaDatosVinculados=this.numeracion(res.content)
      console.log(this.listaDatosVinculados)
      for(let i=0; i<this.listaDatosVinculados.length; i++){
        if(this.listaDatosVinculados[i].estado==null){
          this.estadoValidado=false
          break
        }else {
          this.estadoValidado=true
        }
      }

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
  validar(){
    if(this.estado){
      this.confirmationService.confirm({
        message: '¿Esta seguro que desea validar la programación realizada?',
        accept: () => {
          console.log(this.listaAE)
          for(let i=0; i<this.listaAE.length; i++){
            this.api.updateEstadoDirectivo(this.listaAE[i].idaccionEstregica).subscribe(res=>{
               this.getAEDireccion()

            }

            )
          }
          /*this.api.updateEstadoServidor(this.idServidor).subscribe(res=>{
            this.messageService.add({key: 'mensaje', severity:'success', summary: 'Validación de actividades', detail: 'Validación Confirmada'});
            this.cargarDatosServidor()
          });*/
        }
      });
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Validación de actividades', detail: 'Tiene que programar todas las actividades asignadas'});
    }

  }
  abrirModalFichaDirectivo(){
     this.abrirModalFicha=true
    this.api.modalFichaDirectivo.subscribe(res=>{
      if(res!=null){
        this.abrirModalFicha=res
      }
    })
  }

}
