import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {InformeAuditoriaService} from "../../services/informe-auditoria.service";
import {MessageService} from "primeng/api";
import {Respuesta} from "../../../../modelos/respuesta";
import {Router} from "@angular/router";
import {AccionIniciativaService} from "../../../accion-iniciativa/services/accion-iniciativa.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-registro-documento',
  templateUrl: './registro-documento.component.html',
  styleUrls: ['./registro-documento.component.css'],
  providers: [MessageService, AccionIniciativaService, DatePipe]
})
export class RegistroDocumentoComponent implements OnInit {
  @Input() modalRegistro: boolean;
  fechaRegistro: Date;
  datos:any[];
  loading: boolean = true;
  listaRecomendacion:any[]=[]
  @Input() datosModal: any;//Para recibir
  @Output() estado: EventEmitter<any> = new EventEmitter();//Para enviar al modal de registro de AE

  @ViewChild('dt1') table : Table;
  modal: boolean=false;

  listaOrgano:any
  organo: number = 0
  listaTipoDocumento: Respuesta<any>;
  tipoDocumento:any;
  recomendacion:string=''
  numDocumento: string;
  numInforme: string
  nomInforme: string
  idInformeAuditoria: number;
  respuestaRegistro:any;
  tipo: string
  fecMod: Date
  idIA: number

  constructor(private apiService: InformeAuditoriaService,
              private messageService: MessageService,
              public router: Router,
              private apiAI: AccionIniciativaService,
              private miDatePipe: DatePipe) { }

  ngOnInit(): void {
    this.getOrgano()
    this.getTipoDocumento()
    this.datos=[

    ]
    this.loading=false
    this.verificarTipo()
  }
  verificarTipo(){
    let datos=JSON.parse(localStorage.getItem('datos'))
    if(datos!=null){
      this.tipo='MODIFICAR'


      this.idIA = datos.idInformeAuditoria
      this.tipoDocumento=datos.idTipoDocumento
      this.numDocumento=datos.numDocumento
      this.numInforme=datos.numInforme
      this.nomInforme=datos.nomInforme
      this.fecMod=datos.fecRecepcion

      this.fechaRegistro=new Date(datos.fecRecepcion+'T00:00:00' )
      this.getRecomendacion(datos.idInformeAuditoria)
    }

  }
  getRecomendacion(id){
    this.apiService.getRecomendacionId(id).subscribe(res=>{
      for(let i=0; i<res.content.length; i++){
        this.listaRecomendacion.push({organo: res.content[i].idUnidad,
          nomOrgano: res.content[i].nomUnidad,
          recomendacion: res.content[i].recomendacion})
      }
      this.listaRecomendacion=this.numeracion(this.listaRecomendacion)

    })
  }

  getOrgano(){
    this.apiService.getOrgano().subscribe(res=>{
      this.listaOrgano=res
    })
  }
  agregarRecomendacion(){
    if(this.recomendacion.length==0 || this.recomendacion==null || this.recomendacion==undefined){

      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Recomendaci??n', detail: 'Tiene que ingresar una recomendaci??n.'});
    }else{
      if(this.organo==0){
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Organo/Unidad', detail: 'Tiene que seleccionar un organo responsable.'});
      }else{
        let o=this.listaOrgano.find(o=>o.id ==this.organo)
        this.listaRecomendacion.push({organo:this.organo, nomOrgano: o.nombre, recomendacion:this.recomendacion})
        this.numeracion(this.listaRecomendacion)
        this.organo=0
        this.recomendacion=null
      }
    }
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  getTipoDocumento(){
    this.apiService.getTipoDoc().subscribe(res=>{
      this.listaTipoDocumento=res.content
    })
  }

  addRegistro(){
    if(this.tipo=='MODIFICAR'){

      if(this.tipoDocumento!=null || this.tipoDocumento>0){
        if(this.numDocumento.length>0){
          if(this.numInforme.length>0){
            if(this.nomInforme.length>0){
              if(this.fechaRegistro!=null){
                if(this.listaRecomendacion.length>0){
                  let datosEnviar={
                    "idTipoDocumento":this.tipoDocumento,
                    "numDocumento":this.numDocumento,
                    "numInforme":this.numInforme,
                    "fecRecepcion": this.fechaRegistro,
                    "nomInforme":this.nomInforme
                  }
                  this.apiService.updateInforme(datosEnviar,this.idIA).subscribe(res=>{
                    if(res.estado){
                      this.tipoDocumento=null
                      this.numInforme=''
                      this.nomInforme=''
                      this.numDocumento=''
                      this.messageService.add({key: 'mensaje', severity:'success', summary: 'Registro Exitoso', detail: 'Actualizado correctamente'});
                      this.router.navigate(['informeAuditoria']);
                    }
                  })
                }else{
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Recomendaci??n', detail: 'No se registran recomendaciones'});
                }
              }else{
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Fecha de Recepci??n', detail: 'Tiene que establecer una fecha de recepci??n.'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Informe', detail: 'Tiene que ingresar el nombre del informe.'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Informe', detail: 'Tiene que ingresar el numero de informe.'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Documento', detail: 'Tiene que ingresar el numero del documento.'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Tipo de Documento', detail: 'Seleccione un tipo de documento.'});
      }
    }else{
      if(this.tipoDocumento!=null){
        if(this.numDocumento!=null){
          if(this.numInforme!=null){
            if(this.nomInforme!=null){
              if(this.fechaRegistro!=null){
                if(this.listaRecomendacion.length>0){
                  let datosEnviar={
                    "idTipoDocumento":this.tipoDocumento,
                    "numDocumento":this.numDocumento,
                    "numInforme":this.numInforme,
                    "fecRecepcion": this.fechaRegistro,
                    "nomInforme":this.nomInforme
                  }
                  this.apiService.addRegistro(datosEnviar).subscribe(res=>{
                    this.respuestaRegistro=res
                    if(this.respuestaRegistro.estado){
                      this.apiService.ultimoRegistro().subscribe(res=>{
                        this.idInformeAuditoria=res.content[0].idInformeAuditoria

                        for(let i=0; i<this.listaRecomendacion.length; i++){

                          let dat={
                            idUnidad:this.listaRecomendacion[i].organo,
                            idTipoDocumento: "",
                            recomendacion: this.listaRecomendacion[i].recomendacion,
                            idInformeAuditoria:this.idInformeAuditoria,
                            nomUnidad:this.listaRecomendacion[i].nomOrgano
                          }
                          this.apiService.addRecomendacion(dat).subscribe(res=>{
                            let datoAI={
                              "tipoProceso":"Iniciativa",
                              "descripcion": dat.recomendacion,
                              "idUnidad": dat.idUnidad,
                              "idPeriodo":0,
                              "medioVerificacion": null,
                              "tipoPrioritario":null,
                              "idInformeAuditoria":res.content.idInformeAuditoria,
                              "idProductoPriorizado":null,
                              "accionIniciativa":"",
                              "nomUnidad": dat.nomUnidad
                            }
                            this.apiAI.addAccionIniciativa(datoAI).subscribe(re=>{

                            })

                          })
                        }
                      })

                      this.tipoDocumento=null
                      this.numInforme=''
                      this.nomInforme=''
                      this.numDocumento=''
                      this.messageService.add({key: 'mensaje', severity:'success', summary: 'Registro Exitoso', detail: 'Se realizo el registro correctamente'});
                      this.router.navigate(['informeAuditoria']);
                    }else{
                      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Error en el proceso', detail: 'No se realizo el registro'});
                    }
                  })
                }else{
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Recomendaci??n', detail: 'No se registran recomendaciones'});
                }
              }else{
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Fecha de Recepci??n', detail: 'Tiene que establecer una fecha de recepci??n.'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Informe', detail: 'Tiene que ingresar el nombre del informe.'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Informe', detail: 'Tiene que ingresar el numero de informe.'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Documento', detail: 'Tiene que ingresar el numero del documento.'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Tipo de Documento', detail: 'Seleccione un tipo de documento.'});
      }
    }

  }
  cancelar(){
    this.router.navigate(['informeAuditoria'])
    this.tipoDocumento=null
    this.numInforme=''
    this.numDocumento=''
    this.nomInforme=''
    this.fechaRegistro=null
    this.organo=0
    localStorage.removeItem('datos')
  }
}
