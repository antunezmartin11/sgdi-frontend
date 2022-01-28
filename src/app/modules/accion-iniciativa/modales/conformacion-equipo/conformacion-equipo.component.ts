import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AccionIniciativaService} from "../../services/accion-iniciativa.service";

@Component({
  selector: 'app-conformacion-equipo',
  templateUrl: './conformacion-equipo.component.html',
  styleUrls: ['./conformacion-equipo.component.css'],
  providers: [MessageService]
})
export class ConformacionEquipoComponent implements OnInit {

  @Input() modalConformacionEquipo: boolean
  listaEquipo: any
  loading: boolean
  recepcionDatos: any
  listaOrgano: any
  listDocumento: any
  idOrgano: number=0
  idUnidadEquipo: number=0
  medioVerificacion: number=0
  constructor(private messageService: MessageService, private api: AccionIniciativaService) { }



  ngOnInit(): void {
    this.loading=false
    this.getDocumento()
    this.getOrgano()
  }

  cancelar(){
    this.modalConformacionEquipo=false
    this.api.cerrarModal.emit(false)
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,.]+$/)? true:false);
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
  getOrgano(){
    this.api.getUnidad().subscribe(res=>{
      this.listaOrgano=res
    })
  }
  getDocumento(){
    this.api.getDocumento().subscribe(res=>{
      this.listDocumento=res.content
    })
  }
}
