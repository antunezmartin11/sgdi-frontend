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
  modalHito: boolean=false
  listaDatos: any
  constructor(private api: PlanificacionServidorService) { }

  ngOnInit(): void {
    this.datos=[

    ]
    this.loading=false
  this.getServidorVinculacion()
  }

  abrilModal(){
    this.modal=true
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
    this.api.getListaVinculados().subscribe(res=>{
      this.listaDatos=this.numeracion(res.content)
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
}
