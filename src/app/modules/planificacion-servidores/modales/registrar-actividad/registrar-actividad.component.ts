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
                        if(this.contribucion!=null){
                          let datos={
                            "idActividad":this.actividadOperativa.id,
                            "secuencia":this.secuencia,
                            "estandar": this.estandar,
                            "objetivo": this.objetivo.name,
                            "idObjetivo":this.objetivo.id,
                            "contribucion":this.contribucion,
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
                          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar una contribución'});
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
                "contribucion":this.datosRegistro[i].contribucion,
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
