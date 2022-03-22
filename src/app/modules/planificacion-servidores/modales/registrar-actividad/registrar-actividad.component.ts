import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessageService} from "primeng/api";
import {PlanificacionServidorService} from "../../service/planificacion-servidor.service";
import {HomeComponent} from "../../../home/home.component";
import {PlanificacionServidoresComponent} from "../../planificacion-servidores.component";

@Component({
  selector: 'app-registrar-actividad',
  templateUrl: './registrar-actividad.component.html',
  styleUrls: ['./registrar-actividad.component.css'],
  providers: [MessageService, HomeComponent]
})
export class RegistrarActividadComponent implements OnInit {
  modo: number
  datos1: any[];
  accionE:any;
  btnActualizarEstado:boolean=false
  estadoBotones:boolean=false
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
  idProducto: number
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
  direccionServidor: any
  unidadServidor: any
  servidorFinalUnidad:any= []
  idActividadServidor: number
  estadoTabServidor: boolean=false
  mensaje: string="No hay datos"
  constructor(private messageService: MessageService,
              private api: PlanificacionServidorService, private home: HomeComponent,
              private planificacion: PlanificacionServidoresComponent) { }
  servidores: any[]
  datosRegistro: any[]=[]
  ngOnInit(): void {
    this.verificar()
    this.home.getUsuario()
    this.getServidores()
    this.getAOXunidad()
    this.loading=false

  }
  verificar(){

    this.api.datosModificar.subscribe(res=>{

      if(res.modo==1){
        this.modo=1
        this.datosRegistro=[]
        this.limpiarProducto()
        this.limpiarServidor()
        this.datosRegistro=null
        this.estadoTabServidor=false
        this.tabPlan=false
        this.tabServidor=true
      }else if(res.modo==2){
        this.modo=2
        if(res.datos!=undefined){

          this.datosRegistro=[]
          this.tabPlan=true
          this.tabServidor=false
          this.estadoTabServidor=true
          this.nombreservidor=res.datos.nomServidor
          this.cargoServidor=res.datos.cargo
          this.idActividadServidor=res.datos.idActividadServidor
          this.api.listarProductoServidor(res.datos.idActividadServidor).subscribe(res=>{
            for(let i=0; i<res.content.length; i++){
              this.datosRegistro.push({actividaOperativa: res.content[i].nomActividad,
                nomActividad: res.content[i].nomObjetivo,
                producto: res.content[i].nomProducto,
                secuencia: res.content[i].secuencia,
                estandar: res.content[i].estandar,
                unidadMedida: res.content[i].unidadMedida,
                evidencia: res.content[i].evidencia,
                peso: res.content[i].peso,
                idProAIAct: res.content[i].idProAIAct
              })
            }

            this.datosRegistro=this.numeracion(this.datosRegistro)

          })
        }
      }
    })
  }
  getServidores(){
    this.api.getPersonal().subscribe(res=>{
      this.listaPersonal=res
      this.servidoresUnidad()
    })

  }
  getServidor(){
    let u=JSON.parse(localStorage.getItem('usuario'))
    for(let i=0; i<this.personalUnidad.length; i++){
      if(this.personalUnidad[i].nombre_unidad==u.unidad){
        this.servidorFinalUnidad.push(this.personalUnidad[i])

      }
    }
  }
  servidoresUnidad(){

    let us=JSON.parse(localStorage.getItem('usuario'))
    for(let i=0; i<this.listaPersonal.length; i++){
      if(this.listaPersonal[i].nombre_dependencia===us.dependencia){
        this.personalUnidad.push(this.listaPersonal[i])
      }
    }
    this.personalUnidad=this.numeracion(this.personalUnidad)
    this.getServidor()
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
      this.codigoServidor=datos.cod_emp
      this.nombreservidor=datos.a_paterno+" "+datos.a_materno+" "+datos.nom_emp
      this.cargoServidor=datos.nombre_crg_fisico
      this.direccionServidor=datos.nombre_dependencia
      this.unidadServidor=datos.nombre_unidad
    }
  }
  limpiarServidor(){
    this.tabServidor=true
    this.tabPlan=false
    this.index=0
    this.codigoServidor=null
    this.nombreservidor=null
    this.cargoServidor=null
    this.direccionServidor=null
    this.unidadServidor=null
    this.checkServidor=false
  }
  getAOXunidad(){
    let uni=JSON.parse(localStorage.getItem('usuario'))
    this.api.getAOXunidad(uni.unidad).subscribe(res=>{
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
     this.estadoBotones=false
     this.btnActualizarEstado=false
     this.limpiarProducto()
     this.limpiarServidor()
     this.datosRegistro=[]
   }

   actualizarRegistro():void{
     this.planificacion.listaDatos=[]
     this.planificacion.getServidorVinculacion();
   }
  guardarRegistro(){
    this.api.countServidor(this.codigoServidor).subscribe(res=>{
      if (res.content==0){
        if(this.datosRegistro.length>0){
          let servidor={
            "nomServidor":this.nombreservidor,
            "codigo":this.codigoServidor,
            "cargo":this.cargoServidor,
            "nomDireccion":this.direccionServidor,
            "nomUnidad":this.unidadServidor
          }
          this.api.addServidor(servidor).subscribe(res=>{
            let idServidor=res.content.idActividadServidor

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

              this.api.addVinculoServidor(dato).subscribe(r=>{
                if(i==this.datosRegistro.length-1){
                  this.messageService.add({key: 'mensaje', severity:'success', summary: 'Asignación de actividades', detail: 'Registrado correctamente'});
                }
                this.limpiarServidor()
                this.actividadOperativa=null
                this.objetivo=null
                this.actividadSelect=null
                this.datosRegistro=[]
                this.cerrarModal()
                this.actualizarRegistro()
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
  cargarActualizar(datos){
    this.btnActualizarEstado=true
    this.estadoBotones=true
    this.secuencia=datos.secuencia
    this.estandar=datos.estandar
    this.peso=datos.peso
    this.unidadMedida=datos.unidadMedida
    this.medioVerificacion=datos.evidencia
    this.idProducto=datos.idProAIAct
  }
  actualizarListaModificada(){
    this.api.listarProductoServidor(this.idActividadServidor).subscribe(res=>{
      this.datosRegistro=[]
      for(let i=0; i<res.content.length; i++){
        this.datosRegistro.push({actividaOperativa: res.content[i].nomActividad,
          nomActividad: res.content[i].nomObjetivo,
          producto: res.content[i].nomProducto,
          secuencia: res.content[i].secuencia,
          estandar: res.content[i].estandar,
          unidadMedida: res.content[i].unidadMedida,
          evidencia: res.content[i].evidencia,
          peso: res.content[i].peso,
          idProAIAct: res.content[i].idProAIAct
        })
      }

      this.datosRegistro=this.numeracion(this.datosRegistro)

    })
  }
  guardarActualizacion() {
    if (this.secuencia > 0) {
      if (this.estandar != null) {
        if (this.unidadMedida != null) {
          if (this.medioVerificacion != null) {
            if (this.peso != null) {

              let dato = {

                "secuencia": this.secuencia,
                "estandar": this.estandar,
                "contribucion": this.contribucion,
                "unidadMedida": this.unidadMedida,
                "evidencia": this.medioVerificacion,
                "peso": this.peso,
                "idProAIAct": this.idProducto
              }

              this.api.updateProductoServidor(dato, this.idProducto).subscribe(res=>{

                this.actualizarListaModificada()
                this.estadoBotones=false
                this.btnActualizarEstado=false
                this.limpiarProducto()
                this.actualizarEstado()
              })
            } else {
              this.messageService.add({
                key: 'mensaje',
                severity: 'error',
                summary: 'Asignación de actividades',
                detail: 'Tiene que ingresar el peso'
              });
            }
          } else {
            this.messageService.add({
              key: 'mensaje',
              severity: 'error',
              summary: 'Asignación de actividades',
              detail: 'Tiene que ingresar el medio de verificación'
            });
          }
        } else {
          this.messageService.add({
            key: 'mensaje',
            severity: 'error',
            summary: 'Asignación de actividades',
            detail: 'Tiene que ingresar la unidad de medida'
          });
        }
      } else {
        this.messageService.add({
          key: 'mensaje',
          severity: 'error',
          summary: 'Asignación de actividades',
          detail: 'Tiene que ingresar el estandar para la actividad'
        });
      }
    } else {
      this.messageService.add({
        key: 'mensaje',
        severity: 'error',
        summary: 'Asignación de actividades',
        detail: 'Tiene que ingresar una secuencia de la actividad'
      });
    }
  }

  cancelarActualizacion(){
    this.btnActualizarEstado=false
    this.estadoBotones=false
    this.limpiarProducto()
  }
  eliminarProducto(datos){
    if(datos.idProAIAct!=undefined){
      this.api.deleteProducto(datos.idProAIAct).subscribe(res=>{
        this.actualizarListaModificada()
        this.actualizarEstado()
      })
    }else{
      let ind=this.datosRegistro.findIndex(d=>d.numeracion==datos.numeracion)
      this.datosRegistro.splice(ind,1)
    }
  }
  actualizarProductos(){
    for(let i=0; i<this.datosRegistro.length; i++){
      if(this.datosRegistro[i].idProAIAct==null){
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
            "idActividadServidor": this.idActividadServidor,
            "idProducto":this.datosRegistro[i].idProducto,
            "nomProducto":this.datosRegistro[i].producto
          }
          this.api.addVinculoServidor(dato).subscribe(r=>{
            if(i==this.datosRegistro.length-1){
              this.messageService.add({key: 'mensaje', severity:'success', summary: 'Asignación de actividades', detail: 'Registrado correctamente'});
            }

          })
        this.limpiarProducto()
        this.limpiarServidor()
        this.actividadOperativa=null
        this.objetivo=null
        this.actividadSelect=null
        this.datosRegistro=[]
        this.actualizarRegistro()
        this.cerrarModal()
      }
    }
  }
  actualizarEstado(){

    this.api.updateEstadoServidor(this.idActividadServidor, {flag: null}).subscribe(res=>{

      this.planificacion.updateEstadoAO(null)
      this.messageService.add({key: 'mensaje', severity:'success', summary: 'Validación de actividades', detail: 'Validación Confirmada'});
      this.actualizarRegistro()
    });

  }
}
