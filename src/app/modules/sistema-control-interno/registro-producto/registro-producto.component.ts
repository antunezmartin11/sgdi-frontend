import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ControlInternoService} from "../service/control-interno.service";
import {AccionIniciativaService} from "../../accion-iniciativa/services/accion-iniciativa.service";
import {stringify} from "querystring";

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css'],
  providers: [MessageService]
})
export class RegistroProductoComponent implements OnInit {

  nombreProducto: string
  riesgoIdentificado: string
  medidaControl: any=0
  listaTipoDocumento: any[]
  listaMedio: any[]
  listaOrgano: any[]
  medioVerificacion:any=0
  organo: any=0
  observacion: string
  respuesta: Object
  nomUnidad: any
  fechaInicio: Date
  fechaFin: Date
  dato: any
  tipo: string
  idProductoPriorizado: number
  datosLista: any
  constructor(private route: Router,
              private messageService: MessageService,
              private apiService: ControlInternoService,
              private apiAI: AccionIniciativaService) { }

  ngOnInit(): void {

    this.getTipoDocumento()
    this.getOrgano()
    this.verificarTipo()

  }
  verificarTipo(): void{
    this.datosLista=JSON.parse(localStorage.getItem('datosSCI'))
    if(this.datosLista!=null){
      this.nombreProducto=this.datosLista.nombreProducto
      this.riesgoIdentificado=this.datosLista.riesgoPriorizado
      this.medidaControl=this.datosLista.medidaControl
      this.fechaInicio=new Date(this.datosLista.fecInicio+'T00:00:00' )
      this.fechaFin=new Date(this.datosLista.fecFin+'T00:00:00')
      this.medioVerificacion=this.datosLista.medidaControl
      this.organo=this.datosLista.organo

      this.observacion=this.datosLista.observacion
      this.idProductoPriorizado=this.datosLista.idProductoPriorizado
      this.tipo='MODIFICAR'
    }
  }

  getTipoDocumento(){
    this.apiService.getTipoDoc().subscribe(res=>{
      this.listaTipoDocumento=res.content
      this.listaMedio=res.content
    })
  }
  cancelar(){
    this.route.navigate(['controlInterno'])
    this.limpiarFormulario()
    localStorage.removeItem('datosSCI')
  }
  getOrgano(){
    this.apiService.getOrgano().subscribe(res=>{
      this.listaOrgano=res

    })
  }
  obtenerOrgano(){
    if(this.organo!=null){
      this.nomUnidad=this.listaOrgano.find(o=>o.id==this.organo)
    }

  }
  agregaProducto(){
    if(this.tipo=='MODIFICAR'){//Opcion para modificar

      if(this.nombreProducto!=undefined){
        if (this.riesgoIdentificado != undefined) {
          if (this.medidaControl != 0) {
            if (this.fechaInicio != undefined) {
              if (this.fechaFin != undefined) {
                if (this.fechaFin < this.fechaInicio) {
                  this.messageService.add({
                    key: 'mensaje',
                    severity: 'error',
                    summary: 'Registro de Producto Priorizado',
                    detail: 'La fecha de fin tiene que ser posterior a la fecha de inicio'
                  });
                } else {
                  if (this.medioVerificacion != 0) {
                    if (this.organo != 0) {
                      let nombreOrgano=this.listaOrgano.find(a=>a.id==this.organo)
                      let datos = {
                        "nombreProducto": this.nombreProducto,
                        "riesgoPriorizado": this.riesgoIdentificado,
                        "medidaControl": this.medidaControl,
                        "fecInicio": this.fechaInicio,
                        "fecFin": this.fechaFin,
                        "idTipoDocumento": this.medioVerificacion,
                        "organo": this.organo,
                        "nombreOrgano":nombreOrgano.nombre,
                        "observacion": this.observacion
                      }

                      this.apiService.updateProducto(this.idProductoPriorizado, datos).subscribe(res=>{
                        this.route.navigate(['controlInterno'])
                      })
                    } else {
                      this.messageService.add({
                        key: 'mensaje',
                        severity: 'error',
                        summary: 'Registro de Producto Priorizado',
                        detail: 'Tiene que seleccionar un organo/unidad responsable'
                      });
                    }
                  } else {

                    this.messageService.add({
                      key: 'mensaje',
                      severity: 'error',
                      summary: 'Registro de Producto Priorizado',
                      detail: 'Tiene que indicar un medio de verificación'
                    });
                  }
                }

              } else {
                this.messageService.add({
                  key: 'mensaje',
                  severity: 'error',
                  summary: 'Registro de Producto Priorizado',
                  detail: 'Tiene que ingresar una fecha de fin'
                });
              }
            } else {
              this.messageService.add({
                key: 'mensaje',
                severity: 'error',
                summary: 'Registro de Producto Priorizado',
                detail: 'Tiene que ingresar una fecha de inicio'
              });
            }
          } else {
            this.messageService.add({
              key: 'mensaje',
              severity: 'error',
              summary: 'Registro de Producto Priorizado',
              detail: 'Tiene que indicar la medida de control'
            });
          }
        } else {
            this.messageService.add({
              key: 'mensaje',
              severity: 'error',
              summary: 'Registro de Producto Priorizado',
              detail: 'Tiene que ingresar el riesgo identificado'
            });
          }
        } else {
          this.messageService.add({
            key: 'mensaje',
            severity: 'error',
            summary: 'Registro de Producto Priorizado',
            detail: 'Tiene que ingresar el producto priorizado'
          });
        }
    }else{//Opcion para registrar

      if(this.nombreProducto!=undefined){
        if(this.riesgoIdentificado!=undefined){
          if(this.medidaControl!=0){
            if(this.fechaInicio!=undefined){
              if(this.fechaFin!=undefined){
                if(this.fechaFin<this.fechaInicio){
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'La fecha de fin tiene que ser posterior a la fecha de inicio'});
                }else{
                  if(this.medioVerificacion!=0){
                    if(this.organo!=0){
                      let datos={
                        "nombreProducto":this.nombreProducto,
                        "riesgoPriorizado":this.riesgoIdentificado,
                        "medidaControl":this.medidaControl,
                        "fecInicio":this.fechaInicio,
                        "fecFin": this.fechaFin,
                        "idTipoDocumento":this.medioVerificacion,
                        "organo":this.organo,
                        "nombreOrgano":this.nomUnidad.nombre,
                        "observacion":this.observacion
                      }
                      this.apiService.addProducto(datos).subscribe(res=>{
                        this.respuesta=res.estado


                        if (this.respuesta){
                          this.messageService.add({key: 'mensaje', severity:'success', summary: 'Registro de Producto Priorizado', detail: 'Registro agregado correctamente'});
                          this.route.navigate(['controlInterno'])
                          let datoAI={
                            "tipoProceso":"Acción",
                            "descripcion": this.riesgoIdentificado,
                            "idUnidad": this.organo,
                            "idPeriodo":0,
                            "medioVerificacion": null,
                            "tipoPrioritario":null,
                            "idProductoPriorizado":res.content.idProductoPriorizado,
                            "accionIniciativa":"",
                            "nomUnidad": this.nomUnidad.nombre
                          }
                          this.apiAI.addAccionIniciativa(datoAI).subscribe(re=>{

                          })
                        }else{
                          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Ocurrio un error en el registro'});
                        }

                      })
                    }else{
                      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que seleccionar un organo/unidad responsable'});
                    }
                  }else {

                    this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que indicar un medio de verificación'});
                  }
                }

              } else {
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que ingresar una fecha de fin'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que ingresar una fecha de inicio'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que indicar la medida de control'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que ingresar el riesgo identificado'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que ingresar el producto priorizado'});
      }
    }

  }
  limpiarFormulario(){
    this.nombreProducto=''
    this.datosLista=null
    this.organo=0
    this.riesgoIdentificado=''
    this.medidaControl=0
    this.fechaInicio=null
    this.fechaFin=null
    this.medioVerificacion=0
    this.observacion=''
  }
}
