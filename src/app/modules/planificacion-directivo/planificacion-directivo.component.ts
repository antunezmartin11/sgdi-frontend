import {Component, EventEmitter, Input,OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {PlanificacionDirectivoService} from "./services/planificacion-directivo.service";
import {BodyComponent} from "../body/body.component";
import {HomeComponent} from "../home/home.component";


@Component({
  selector: 'app-planificacion-directivo',
  templateUrl: './planificacion-directivo.component.html',
  styleUrls: ['./planificacion-directivo.component.css'],
  providers: [HomeComponent]
})
export class PlanificacionDirectivoComponent implements OnInit, OnChanges {
  datos:any[];
  loading: boolean = true;

  @Input() datosModal: any;//Para recibir
  @Output() estado: EventEmitter<any> = new EventEmitter();//Para enviar al modal de registro de AE
  @Output() estadoHito: EventEmitter<any> = new EventEmitter();
  @ViewChild('dt1') table : Table;
  modal: boolean=false;
  modalHito: boolean=false
  public listaAccionV:any[]
  modalDireccion: boolean
  estadoLogin: boolean
  constructor(private api:PlanificacionDirectivoService, private app: HomeComponent) { }

  ngOnInit(): void {
    this.app.getUsuario()
    this.getAccionVinculada()
    this.datos=[

    ]
    this.loading=false
  }
  ngOnChanges(changes: SimpleChanges) {
   this.api.cerraModalDireccion.subscribe(res=>{

   })
  }
  getAccionVinculada(){
    this.api.getAccionVinculada().subscribe(res=>{
      this.listaAccionV=this.numeracion(res.content)

    })
  }

  abrilModal(valor: any){

    this.modal=true
    this.api.cerrarModal.subscribe(data=>{
      if(data!=undefined){
        this.modal=data
      }
    })
    this.api.accion.emit(valor)
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }


  abriModalDireccion(id: number){
    this.modalDireccion=true
    this.api.cerraModalDireccion.subscribe(data=>{
      if(data!=undefined){
        this.modalDireccion=data
      }
    })
    this.api.datosDireccion.emit(id)
  }

}
