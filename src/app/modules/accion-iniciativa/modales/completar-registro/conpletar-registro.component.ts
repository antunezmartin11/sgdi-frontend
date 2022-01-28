import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AccionIniciativaService} from "../../services/accion-iniciativa.service";

@Component({
  selector: 'app-conpletar-registro',
  templateUrl: './conpletar-registro.component.html',
  styleUrls: ['./conpletar-registro.component.css'],
  providers: [MessageService]
})
export class ConpletarRegistroComponent implements OnInit {

  constructor(private messageService: MessageService, private api: AccionIniciativaService) { }
  @Input() modalCompletarRegistro: boolean
  recepcionDatos: any
  accionIniciativa: string
  listaOrgano: any
  listDocumento: any
  medioVerificacion: number=0
  idOrgano: number=0
  tipo: number=0
  ngOnInit(): void {
    this.api.datos.subscribe(res=>{
      this.recepcionDatos=res
      this.accionIniciativa=this.recepcionDatos.accionIniciativa
    })
    this.getOrgano()
    this.getDocumento()
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,.]+$/)? true:false);
  }
  getOrgano(){
    this.api.getUnidad().subscribe(res=>{
      this.listaOrgano=res
    })
  }
  getDocumento(){
    this.api.getDocumento().subscribe(res=>{
      this.listDocumento=res.content
      console.log(this.listDocumento)
    })
  }
  validarFecha(e: any){
    let key = e.key;
    return (key.match(/^[0-9,-,/]+$/)? true:false);
  }
  validarLetrasNumero(e:any) {
    let key = e.key;
    return (!!key.match(/^[0-9,.,-,a-z\u00E0-\u00FC,A-Z\u00E0-\u00FC, ,ñ, Ñ,°,/,-]+$/));
  }
  validarLetras(e:any) {
    let key = e.key;
    return (!!key.match(/^[0-9,.,-,a-z,A-Z, ,ñ, Ñ]/));
  }
  cancelar(){
    this.modalCompletarRegistro=false
    this.api.cerrarModalCompletarRegistro.emit(false)
  }
}
