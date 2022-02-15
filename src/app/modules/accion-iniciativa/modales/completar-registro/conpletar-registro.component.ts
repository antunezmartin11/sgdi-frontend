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
  accionIniciativa: any
  listaOrgano: any
  listDocumento: any
  medioVerificacion: string
  idOrgano: number=0
  tipo: number=0
  proceso: string
  fecInicio: Date
  fecFin: Date
  idAccionIniciativa: number
  ngOnInit(): void {
    this.api.datos.subscribe(res=>{
      this.recepcionDatos=res
      this.accionIniciativa=this.recepcionDatos.descripcion
      this.idAccionIniciativa=res.idAccionIniciativa
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
  guardarCambios(){
    if(this.medioVerificacion!=null){
      if(this.tipo!=0){
        if(this.proceso!=null){
          if(this.idOrgano!=0){
            if(this.fecInicio!=null){
              if(this.fecFin!=null){
                if(this.fecInicio<this.fecFin){
                  let nom=this.listaOrgano.find(o=>o.id==this.idOrgano)
                  let dato={
                    idUnidad: this.idOrgano,
                    medioVerificacion: this.medioVerificacion,
                    tipoPrioritario: this.tipo,
                    tipoProceso: this.proceso,
                    fecInicio: this.fecInicio,
                    fecFin: this.fecFin,
                    nomUnidad: nom.nombre
                  }
                  this.api.completarRegistro(dato, this.idAccionIniciativa).subscribe(res=>{
                    console.log(res)
                  })
                }else {
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar el rango de fechas adecuado'});
                }
              }else {
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar una fecha de fin'});
              }
            }else {
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar una fecha de Inicio'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar una Dirección responsable'});
          }
        }else {
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que ingrear el proceso'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar el tipo de proceso'});
      }
    }else {
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Completar Registro', detail: 'Tiene ingresar un medio de verificación'});
    }
  }
}
