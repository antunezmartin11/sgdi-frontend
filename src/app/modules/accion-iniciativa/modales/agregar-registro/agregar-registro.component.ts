import {Component, Input, OnInit} from '@angular/core';
import {AccionIniciativaService} from "../../services/accion-iniciativa.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-agregar-registro',
  templateUrl: './agregar-registro.component.html',
  styleUrls: ['./agregar-registro.component.css'],
  providers: [MessageService]
})
export class AgregarRegistroComponent implements OnInit {

  @Input() modalAgregar: boolean
  accionIniciativa: string
  descripcion: string
  idOrgano: number = 0
  medioVerificacion: number = 0
  tipo: number = 0
  fechaInicio: Date
  fechaFin: Date
  listaOrgano: any
  listDocumento: any
  nombreUnidad: any
  constructor(private api: AccionIniciativaService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getOrgano()
    this.getDocumento()
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
  cancelar(){
    this.modalAgregar=false
    this.api.cerrarModal.emit(false)
  }
  validarFecha(e: any){
    let key = e.key;
    return (key.match(/^[0-9,-,/]+$/)? true:false);
  }
  guardar(){
    if(this.accionIniciativa!=null){
      if(this.descripcion!=null){
        if(this.idOrgano!=0){
          if(this.medioVerificacion!=0){
            if(this.tipo!=0){
              if(this.fechaInicio!=null){
                if(this.fechaFin!=null){
                  if(this.fechaFin>this.fechaInicio && this.fechaInicio<this.fechaFin){
                    this.buscarUnidad(this.idOrgano)
                    let datos={
                      "tipoProceso":this.tipo,
                      "descripcion": this.descripcion,
                      "idUnidad": this.idOrgano,
                      "idPeriodo":0,
                      "tipoPrioritario":2,
                      "idInformeAuditoria":null,
                      "idProductoPriorizado":null,
                      "accionIniciativa":this.accionIniciativa,
                      "nomUnidad": this.nombreUnidad.nombre
                    }
                    this.api.addAccionIniciativa(datos).subscribe(res=>{
                      if(res.estado){
                        this.messageService.add({key: 'mensaje', severity:'success', summary: 'Agregar Registro', detail: 'Registro agregado correctamente'});
                        this.limpiarDatos()
                      }else{
                        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Ocurrio un error en el registro'});
                      }
                    })
                  }else{
                    this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Verificar las fechas seleccionadas'});
                  }
                }else {
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que seleccionar la fecha de Fin'});
                }
              }else {
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que seleccionar la fecha de inicio'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que seleccionar el tipo de registro'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que seleccionar el medio de verificación'});
          }
        }else {
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que seleccionar una unidad'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que ingresar una descripción'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Registro', detail: 'Tiene que indicar el nombre de la acción/iniciativa'});
    }
  }
  buscarUnidad(idOrgano){

    this.nombreUnidad=this.listaOrgano.find(e=>e.id == idOrgano)
  }
  limpiarDatos(){
    this.accionIniciativa=null
    this.descripcion=null
    this.idOrgano=0
    this.tipo=0
    this.medioVerificacion=0
    this.fechaFin=null
    this.fechaInicio=null
  }
}
