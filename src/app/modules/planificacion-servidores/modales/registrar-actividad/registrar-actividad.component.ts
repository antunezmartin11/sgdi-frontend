import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "primeng/api";
import {PlanificacionServidorService} from "../../service/planificacion-servidor.service";
import {HomeComponent} from "../../../home/home.component";
import {PlanificacionServidoresComponent} from "../../planificacion-servidores.component";

@Component({
  selector: 'app-registrar-actividad',
  templateUrl: './registrar-actividad.component.html',
  styleUrls: ['./registrar-actividad.component.css'],
  providers: [MessageService, HomeComponent, PlanificacionServidoresComponent]
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
  objetivo: any
  actividadSelect: any
  index: number
  secuencia: number
  estandar: string
  unidadMedida: string
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
  listaPersonal: any=[]
  personalUnidad: any=[]
  listaAOUnidad: any=[]
  AOUnidadList: any=[]
  listaObjetivoAO: any=[]
  listaProductos: any=[]
  idServidor: any
  codigoServidor:any
  mensaje: string="No hay datos"
  constructor(private messageService: MessageService,
              private api: PlanificacionServidorService, private home: HomeComponent,
              private planificacion: PlanificacionServidoresComponent) { }
  servidores: any[]
  datosRegistro: any[]=[]
  ngOnInit(): void {
    this.home.getUsuario()
    this.getServidores()
    this.getAOXunidad()
    this.loading=false
  }
  getServidores(){
    this.api.getPersonal().subscribe(res=>{
      this.listaPersonal=res
      this.servidoresUnidad()
    })

  }
  servidoresUnidad(){

    let us=JSON.parse(localStorage.getItem('usuario'))
    for(let i=0; i<this.listaPersonal.length; i++){
      if(this.listaPersonal[i].nombre_dependencia===us.dependencia){
        this.personalUnidad.push(this.listaPersonal[i])
      }
    }
    this.personalUnidad=this.numeracion(this.personalUnidad)
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  selecionarServidor(datos){
    if(this.checkServidor){
      this.tabPlan=true
      this.tabServidor=false
      this.index=1
      console.log(datos)
      this.codigoServidor=datos.cod_emp
      this.nombreservidor=datos.a_paterno+" "+datos.a_materno+" "+datos.nom_emp
      this.cargoServidor=datos.nombre_crg_fisico
    }
  }
  getAOXunidad(){
    let uni=JSON.parse(localStorage.getItem('usuario'))
    this.api.getAOXunidad(uni.dependencia).subscribe(res=>{
      this.listaAOUnidad=res.content
      for(let i=0; i<this.listaAOUnidad.length; i++){
        this.AOUnidadList.push({id:this.listaAOUnidad[i].idAOUnidad, name:this.listaAOUnidad[i].nomActividadOperativa})
      }
    })

  }
  getObjetivoAO(dato) {
    this.listaObjetivoAO=[]
    let objetivo = this.listaAOUnidad.find(ao => ao.idAOUnidad == dato.id)

    this.listaObjetivoAO.push({id:objetivo.idObjetivo, name:objetivo.nomObjetivo, idAOUnidad:objetivo.idAOUnidad})

  }
  agregarDatosRegistro(){
    if(this.nombreservidor!=null){
      if(this.cargoServidor!=null){
        if(this.actividadOperativa!=null){
          if(this.objetivo!=null){
            if(this.actividadSelect!=null){
              if(this.secuencia>0){
                if(this.estandar!=null){
                  if(this.unidadMedida!=null){
                    if(this.medioVerificacion!=null){
                      if(this.peso!=null){
                        if(this.validarProgramacion()){
                          let datos={
                            "idActividad":this.actividadOperativa.id,
                            "secuencia":this.secuencia,
                            "estandar": this.estandar,
                            "objetivo": this.objetivo.name,
                            "idObjetivo":this.objetivo.id,
                            "producto":this.actividadSelect.nomProducto,
                            "idProducto":this.actividadSelect.idProductoAO,
                            "actividaOperativa":this.actividadOperativa.name,
                            "unidadMedida":this.unidadMedida,
                            "evidencia": this.medioVerificacion,
                            "peso": this.peso,
                            "estado":1
                          }
                          this.datosRegistro.push(datos)
                          this.datosRegistro=this.numeracion(this.datosRegistro)
                          this.limpiarProducto()
                        }else{
                          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'No completo el debido proceso'});
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

  getProducto(dato){
    this.api.getProductoAOUnidad(dato.idAOUnidad).subscribe(res=>{
      this.listaProductos=res.content
      console.log(this.listaProductos)
    })
  }
  limpiarProducto(){
    this.secuencia=null
    this.estandar=null
    this.unidadMedida=null
    this.medioVerificacion=null
    this.peso=null
    this.actividadOperativa=null
    this.objetivo=null
    this.actividadSelect=null
  }
   cerrarModal(){
    this.estadoMS=false
     this.api.cerrarModalRegistro.emit(false)
   }
  validarProgramacion(){//Validar que se realiza una programacion
    let val=false;
    val = this.valEne != undefined || this.valFeb != undefined || this.valMar != undefined
      || this.valAbr != undefined || this. valMay != undefined || this.valJun != undefined
      || this.valJul != undefined || this.valAgo != undefined || this.valSet != undefined
      || this.valOct != undefined || this.valNov != undefined || this.valDic != undefined;
    return val

  }
  guardarRegistro(){
    this.api.countServidor(this.codigoServidor).subscribe(res=>{
      if (res.content==0){
        if(this.datosRegistro.length>0){
          let servidor={
            "nomServidor":this.nombreservidor,
            "codigo":this.codigoServidor,
            "cargo":this.cargoServidor
          }
          this.api.addServidor(servidor).subscribe(res=>{
            let idServidor=res.content.idActividadServidor
            console.log(this.datosRegistro)
            for(let i=0; i<this.datosRegistro.length; i++){
              let dato={
                "nomActividad":this.datosRegistro[i].actividaOperativa,
                "idActividad":this.datosRegistro[i].idActividad,
                "secuencia":this.datosRegistro[i].secuencia,
                "estandar":this.datosRegistro[i].estandar,
                "unidadMedida": this.datosRegistro[i].unidadMedida,
                "evidencia": this.datosRegistro[i].evidencia,
                "peso":this.datosRegistro[i].peso,
                "idObjetivo":this.datosRegistro[i].idObjetivo,
                "nomObjetivo":this.datosRegistro[i].objetivo,
                "idActividadServidor": idServidor,
                "idProducto":this.datosRegistro[i].idProducto,
                "nomProducto":this.datosRegistro[i].producto
              }
              console.log(dato)
              this.api.addVinculoServidor(dato).subscribe(r=>{
                this.planificacion.getServidorVinculacion()
                if(i==this.datosRegistro.length-1){
                  this.messageService.add({key: 'mensaje', severity:'success', summary: 'Asignación de actividades', detail: 'Registrado correctamente'});
                }
                this.cerrarModal()
              })
            }

          })
        }else {
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'No se completo la información para proceder al registro'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'El servidor ya se encuentra registrado'});
      }
    })

  }
}
