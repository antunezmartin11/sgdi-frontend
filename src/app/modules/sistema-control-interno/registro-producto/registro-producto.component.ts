import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ControlInternoService} from "../service/control-interno.service";
import {AccionIniciativaService} from "../../accion-iniciativa/services/accion-iniciativa.service";

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css'],
  providers: [MessageService]
})
export class RegistroProductoComponent implements OnInit {

  nombreProducto: string;
  riesgoIdentificado: string;
  medidaControl: any=0;
  listaTipoDocumento: any[];
  listaMedio: any[];
  listaOrgano: any[];
  medioVerificacion:any=0;
  organo: any=0;
  observacion: string;
  respuesta: Object
  nomUnidad: any
  constructor(private route: Router,
              private messageService: MessageService,
              private apiService: ControlInternoService,
              private apiAI: AccionIniciativaService) { }
  fechaInicio: Date;
  fechaFin: Date;
  ngOnInit(): void {
    this.getTipoDocumento()
    this.getOrgano()
  }
  getTipoDocumento(){
    this.apiService.getTipoDoc().subscribe(res=>{
      this.listaTipoDocumento=res.content
      this.listaMedio=res.content
    })
  }
  cancelar(){
    this.route.navigate(['controlInterno'])

  }
  getOrgano(){
    this.apiService.getOrgano().subscribe(res=>{
      this.listaOrgano=res
      console.log(this.listaOrgano)
    })
  }
  obtenerOrgano(){
    if(this.organo!=null){
      this.nomUnidad=this.listaOrgano.find(o=>o.id==this.organo)
    }
    console.log(this.nomUnidad)
  }
  agregaProducto(){
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
                            console.log(re)
                          })
                        }else{
                          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Ocurrio un error en el registro'});
                        }

                      })
                    }else{
                      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Producto Priorizado', detail: 'Tiene que seleccionar un organo/unidad responsable'});
                    }
                  }else {
                    console.log(this.medioVerificacion)
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
  limpiarFormulario(){

  }
}
