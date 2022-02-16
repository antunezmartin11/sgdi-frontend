import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {PlanificacionServidorService} from "./service/planificacion-servidor.service";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-planificacion-servidores',
  templateUrl: './planificacion-servidores.component.html',
  styleUrls: ['./planificacion-servidores.component.css'],
  providers: [ConfirmationService]
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
  public listaDatos:any[]
  constructor(private api: PlanificacionServidorService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.datos=[

    ]
    this.loading=false
  this.getServidorVinculacion()
  }
  ngOnChanges(changes: SimpleChanges) {

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
    this.listaDatos=[]
    let da=JSON.parse(localStorage.getItem('usuario'))
    this.api.listarServidorUnidad(da.unidad).subscribe(res=>{
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
  validar(){
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea validar la programación realizada?',
      accept: () => {

      }
    });
  }
}
