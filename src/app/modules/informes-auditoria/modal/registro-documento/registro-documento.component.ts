import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {InformeAuditoriaService} from "../../services/informe-auditoria.service";
import {MessageService} from "primeng/api";
import {Respuesta} from "../../../../modelos/respuesta";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro-documento',
  templateUrl: './registro-documento.component.html',
  styleUrls: ['./registro-documento.component.css'],
  providers: [MessageService]
})
export class RegistroDocumentoComponent implements OnInit {
  @Input() modalRegistro: boolean;
  fechaRegistro: Date;
  datos:any[];
  loading: boolean = true;
  listaRecomendacion:any[]=[]
  @Input() datosModal: any;//Para recibir
  @Output() estado: EventEmitter<any> = new EventEmitter();//Para enviar al modal de registro de AE
  @Output() estadoHito: EventEmitter<any> = new EventEmitter();
  @ViewChild('dt1') table : Table;
  modal: boolean=false;
  modalHito: boolean=false
  listaOrgano:any
  organo: string
  listaTipoDocumento: Respuesta<any>;
  tipoDocumento:any;
  recomendacion:string=''
  numDocumento: string;
  numInforme: string
  nomInforme: string
  idInformeAuditoria: number;
  respuestaRegistro:any;
  constructor(private apiService: InformeAuditoriaService,
              private messageService: MessageService,
              public router: Router) { }

  ngOnInit(): void {
    this.getOrgano()
    this.getTipoDocumento()
    this.datos=[

    ]
    this.loading=false
  }

  getOrgano(){
    this.apiService.getOrgano().subscribe(res=>{
      this.listaOrgano=res
    })
  }
  agregarRecomendacion(){
    if(this.recomendacion.length==0 || this.recomendacion==null || this.recomendacion==undefined){

      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Recomendación', detail: 'Tiene que ingresar una recomendación.'});
    }else{
      if(this.organo==null || this.organo==undefined){
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Organo/Unidad', detail: 'Tiene que seleccionar un organo responsable.'});
      }else{
        this.listaRecomendacion.push({organo:this.organo, recomendacion:this.recomendacion})
        this.numeracion(this.listaRecomendacion)
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
                          idInformeAuditoria:this.idInformeAuditoria
                        }
                        this.apiService.addRecomendacion(dat).subscribe(res=>{
                          console.log(res)
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
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Recomendación', detail: 'No se registran recomendaciones'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Fecha de Recepción', detail: 'Tiene que establecer una fecha de recepción.'});
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
  cancelar(){
    this.router.navigate(['informeAuditoria'])
  }
}
