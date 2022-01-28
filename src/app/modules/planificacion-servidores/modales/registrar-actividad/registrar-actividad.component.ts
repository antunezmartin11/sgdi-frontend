import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {PlanificacionServidorService} from "../../service/planificacion-servidor.service";

@Component({
  selector: 'app-registrar-actividad',
  templateUrl: './registrar-actividad.component.html',
  styleUrls: ['./registrar-actividad.component.css'],
  providers: [MessageService]
})
export class RegistrarActividadComponent implements OnInit {
  datos1: any[];
  accionE:any;
  cities: any[];
  productos: any[];
  actividad: any[];
  seleccionar: any;
  valorCheck: boolean;
  checkServidor: boolean=false
  tabServidor: boolean=true
  tabPlan: boolean=false
  tabResumen:boolean=false
  @Input() estadoMS: boolean;
  @Output() datos: EventEmitter<any> = new EventEmitter();//Para enviar
  loading: boolean = true;
  nombreservidor:string
  cargoServidor:string
  actividadOperativa: any
  productoselect: string
  actividadSelect: string
  index: number
  secuencia: number
  estandar: number
  unidadMedida: number
  medioVerificacion: string
  peso: number
  contribucion: number
  meta: number
  chkEne: boolean=false
  chkFeb: boolean=false
  chkMar: boolean=false
  chkAbr: boolean=false
  chkMay: boolean=false
  chkJun: boolean=false
  chkJul: boolean=false
  chkAgo: boolean=false
  chkSet: boolean=false
  chkOct: boolean=false
  chkNov: boolean=false
  chkDic: boolean=false
  txtEne: boolean=true
  txtFeb: boolean=true
  txtMar: boolean=true
  txtAbr: boolean=true
  txtMay: boolean=true
  txtJun: boolean=true
  txtJul: boolean=true
  txtAgo: boolean=true
  txtSet: boolean=true
  txtOct: boolean=true
  txtNov: boolean=true
  txtDic: boolean=true
  valEne: number
  valFeb: number
  valMar: number
  valAbr: number
  valMay: number
  valJun: number
  valJul: number
  valAgo: number
  valSet: number
  valOct: number
  valNov: number
  valDic: number

  constructor(private messageService: MessageService,
              private api: PlanificacionServidorService) { }
  servidores: any[]
  ngOnInit(): void {
    this.servidores=[
      {
        id:'1',
        nombre:'Juan Perez',
        cargo: "analista",
        unidad: "unida 1"
      }
    ]
    this.datos1=[

    ]
    this.cities=[
      {
        id:1,
        name:'Actividad Operativa 1'
      },
      {
        id:2,
        name: 'Actividad Operativa 2'
      }
    ]
    this.productos=[
      {
        id:1,
        name: 'Producto 1',
      },
      {
        id:2,
        name: 'Producto 2',
      }
    ]
    this.actividad=[
      {
        id:1,
        name: 'Actividad 1',
      },
      {
        id:1,
        name: 'Actividad 2',
      }
    ]
    this.loading=false
  }

  selecionarServidor(){
    if(this.checkServidor){
      this.tabPlan=true
      this.tabServidor=false
      this.index=1
      console.log(this.tabPlan)
      this.nombreservidor=this.servidores[0].nombre
      this.cargoServidor=this.servidores[0].cargo
    }
  }
  guardarPlanificacion(){
    if(this.nombreservidor!=null){
      if(this.cargoServidor!=null){
        if(this.actividadOperativa!=null){
          if(this.productoselect!=null){
            if(this.actividadSelect!=null){
              if(this.secuencia>0){
                if(this.estandar!=null){
                  if(this.unidadMedida!=null){
                    if(this.medioVerificacion!=null){
                      if(this.peso!=null){
                        if(this.contribucion!=null){
                          if(this.meta>0){
                            let datos={
                              "nomActividad":"actividad Prueba",
                              "idActividad":this.actividadOperativa.id,
                              "secuencia":this.secuencia,
                              "estandar": this.estandar,
                              "unidadMedida":this.unidadMedida,
                              "idTipoDocumento": 2,
                              "peso": this.peso,
                              "meta": this.meta,
                              "contribucion":this.contribucion,
                              "estado":1
                            }
                            console.log(datos)
                            this.api.addVinculoServidor(datos).subscribe(res=>{
                              console.log(res)
                            })
                          }else{
                            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que indicar una meta'});
                          }
                        } else{
                          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que indicar una contribución'});
                        }
                      }else{
                        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar el peso'});
                      }
                    }else {
                      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar el medio de verificación'});
                    }
                  }else{
                    this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar la unidad de medida'});
                  }
                }else{
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar el estandar para la actividad'});
                }
              }else{
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar una secuencia de la actividad'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que seleccionar una actividad'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que seleccionar un producto'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que seleccionar una actividad operativa'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'No se selecciono un servidor'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'No se selecciono un servidor'});
    }

  }

  cambiarEstado(num: number){
    switch (num){
      case 1:
            this.chkEne=!this.chkEne
            this.txtEne=!this.txtEne
        break;
      case 2:
            this.chkFeb=!this.chkFeb
            this.txtFeb=!this.txtFeb
        break;
      case 3:
        this.chkMar=!this.chkMar
        this.txtMar=!this.txtMar
        break;
      case 4:
        this.chkAbr=!this.chkAbr
        this.txtAbr=!this.txtAbr
        break;
      case 5:
        this.chkMay=!this.chkMay
        this.txtMay=!this.txtMay
        break;
      case 6:
        this.chkJun=!this.chkJun
        this.txtJun=!this.txtJun
        break;
      case 7:
        this.chkJul=!this.chkJul
        this.txtJul=!this.txtJul
        break;
      case 8:
        this.chkAgo=!this.chkAgo
        this.txtAgo=!this.txtAgo
        break;
      case 9:
        this.chkSet=!this.chkSet
        this.txtSet=!this.txtSet
        break;
      case 10:
        this.chkOct=!this.chkOct
        this.txtOct=!this.txtOct
        break;
      case 11:
        this.chkNov=!this.chkNov
        this.txtNov=!this.txtNov
        break;
      case 12:
        this.chkDic=!this.chkDic
        this.txtDic=!this.txtDic
        break;
    }
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,.]+$/)? true:false);
  }
  validarLetrasNumero(e:any) {
    let key = e.key;
    return (!!key.match(/^[0-9,.,-,a-z\u00E0-\u00FC,A-Z\u00E0-\u00FC, ,ñ, Ñ,°,/,-]+$/));
  }
  validarLetras(e:any) {
    let key = e.key;
    return (!!key.match(/^[0-9,.,-,a-z,A-Z, ,ñ, Ñ]/));
  }
  programacion(peso: number, idPeriodo: number, idAE:number){
    let datos={
      "peso": peso,
      "idPeriodo":idPeriodo,
      "idAccionEstrategica":idAE
    }
    this.api.addProgramacionServidor(datos).subscribe(res=>{
      console.log(res)
    })
  }
  addProgramacion(idAE: number){
    if(this.valEne!=null){
      this.programacion(this.valEne, 1, idAE)
    }
    if(this.valFeb!=null){
      this.programacion(this.valFeb, 2, idAE)
    }
    if(this.valMar!=null){
      this.programacion(this.valMar, 3, idAE)
    }
    if(this.valAbr!=null){
      this.programacion(this.valAbr, 4, idAE)
    }
    if(this.valMay!=null){
      this.programacion(this.valMay, 5, idAE)
    }
    if(this.valJun!=null){
      this.programacion(this.valJun, 6, idAE)
    }
    if(this.valJul!=null){
      this.programacion(this.valJul, 7, idAE)
    }
    if(this.valAgo!=null){
      this.programacion(this.valAgo, 8, idAE)
    }
    if(this.valSet!=null){
      this.programacion(this.valSet, 9, idAE)
    }
    if(this.valOct!=null){
      this.programacion(this.valOct, 10, idAE)
    }
    if(this.valNov!=null){
      this.programacion(this.valNov, 11, idAE)
    }
    if(this.valDic!=null){
      this.programacion(this.valDic, 12, idAE)
    }

  }
}
