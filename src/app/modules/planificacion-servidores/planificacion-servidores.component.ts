import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {PlanificacionServidorService} from "./service/planificacion-servidor.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-planificacion-servidores',
  templateUrl: './planificacion-servidores.component.html',
  styleUrls: ['./planificacion-servidores.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PlanificacionServidoresComponent implements OnInit, OnChanges {
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
  estadoValidar: boolean
  validarFicha: boolean = false
  listaActividades: any[]
  abrirFicha: boolean=false
  public listaDatos:any[]
  constructor(private api: PlanificacionServidorService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.loading=false
    this.getListaValidar()
  this.getServidorVinculacion()
  }
  ngOnChanges(changes: SimpleChanges) {

  }
  abrirModalFicha(){
    this.abrirFicha=true
    this.api.modalFichaSubdirectivo.subscribe(res=>{
      if(res!=null){
        this.abrirFicha=res
      }
    })
  }
  abrilModal(modo, datos?){
    if(modo==1){//Agregar nuevo registro
      this.cerrarModalRegistro=true
      this.api.cerrarModalRegistro.subscribe(res=>{
        if(res!=null){
          this.cerrarModalRegistro=res
        }
      })
      this.api.datosModificar.emit({modo})
    }else if(modo==2){//modificar registro
      this.cerrarModalRegistro=true
      this.api.cerrarModalRegistro.subscribe(res=>{
        if(res!=null){
          this.cerrarModalRegistro=res
        }
      })
      this.api.datosModificar.emit({datos, modo});

    }

  }

  getServidorVinculacion(){
    this.listaDatos=[]
    let da=JSON.parse(localStorage.getItem('usuario'))
    this.api.listarServidorUnidad(da.unidad).subscribe(res=>{
      this.listaDatos=this.numeracion(res.content)

      for(let i=0; i<this.listaDatos.length; i++){
        this.estadoValidar = this.listaDatos[i].flag != null;

      }
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
  getListaValidar(){
    let da=JSON.parse(localStorage.getItem('usuario'))
    this.api.getListaActividadValidar(da.unidad).subscribe(res=>{
      this.listaActividades=res.content
      for(let i=0; i<this.listaActividades.length; i++){
        this.validarFicha = this.listaActividades[i].estado != null;
      }
    })
  }
  updateEstadoAO(estado: string){
    for(let i=0; i<this.listaActividades.length; i++){
      this.api.updateEstadoSubDirectivo(this.listaActividades[i].idActividadOperativa, {estado:estado}).subscribe(resp=>{
        this.api.updateEstadoAOUnidad(this.listaActividades[i].idAOUnidad,{estado: estado}).subscribe(res=>{
          if(i==this.listaActividades.length-1){
            this.messageService.add({key: 'mensaje', severity:'success', summary: 'Validaci??n de actividades', detail: 'Validaci??n Confirmada'});
            this.getListaValidar()
          }
        })

      })
    }
  }
  validar(){

    if(this.estado){
      this.confirmationService.confirm({
        message: '??Esta seguro que desea validar la programaci??n realizada?',
        accept: () => {
         this.updateEstadoAO("1")

          /*this.api.updateEstadoServidor(this.idServidor).subscribe(res=>{
            this.messageService.add({key: 'mensaje', severity:'success', summary: 'Validaci??n de actividades', detail: 'Validaci??n Confirmada'});
            this.cargarDatosServidor()
          });*/
        }
      });
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Validaci??n de actividades', detail: 'Tiene que programar todas las actividades asignadas'});
    }
  }
}
