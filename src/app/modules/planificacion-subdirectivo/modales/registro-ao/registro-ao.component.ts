import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanificacionSubDirectivosService} from "../../service/planificacion-sub-directivos.service";
import {AccionEstrategica} from "../../../../modelos/AccionEstrategica";
import {MessageService} from "primeng/api";
import {ActividadOperativa} from "../../../../modelos/ActividadOperativa";
import {PlanificacionDirectivoComponent} from "../../../planificacion-directivo/planificacion-directivo.component";
import {PlanificacionSubdirectivoComponent} from "../../planificacion-subdirectivo.component";

@Component({
  selector: 'app-registro-ao',
  templateUrl: './registro-ao.component.html',
  styleUrls: ['./registro-ao.component.css'],
  providers: [MessageService]
})
export class RegistroAOComponent implements OnInit {

  datos1: any[];
  accionE:any;
  @Input() estado: boolean;
  listaAccionEstrategica: any[];
  actividadOperativa: ActividadOperativa[]=[]
  accionEstrategica: AccionEstrategica[]=[];
  descripcionAE: any []=[];
  valorAE: any=0;
  datosAE:any
  codigoAE:string
  datosActividadOperativa: any=[]
  idActividadOperativa:number=0
  objetivos: any=[]
  codigoAO: string
  nombreAO:string
  idObjetivoAO: number=0
  listaUnidad: any
  idUnidad: number=0
  listaProducto: any
  listarTipoDocumento:any
  tipodocumento: any=null
  datosAO: any=[]
  idProducto:number=0
  pesoProducto: number
  indicador: any=null
  formula: any=null
  estandar: any=null
  meta: number
  datosProducto: any=[]
  nombreActividadOperativa: string
  ultimoIdAOV: number
  local: any=[]
  AEDireccion: any
  addAEDireccion: any=[]
  datosAELocal: any=[]
  listaAE: any=[]
  listaAO:any=[]
  listaUnidadDireccion: any=[]
  addUnidad: any=[]
  loading: boolean
  constructor(private api:PlanificacionSubDirectivosService,
              private messageService: MessageService,
              private sub: PlanificacionSubdirectivoComponent) { }

  ngOnInit(): void {
    this.loading=false
    this.getAEDireccion()
    this.cargarAE()
    this.getUnidad()
    this.getTipoDocumento()
    this.objetivos=[
      {id: 1,
      objetivo: 'Objetivo de prueba 1 nivel 1'},
      {id: 2,
        objetivo: 'Objetivo de prueba 2 nivel 1'},
      {id: 3,
        objetivo: 'Objetivo de prueba 3 nivel 1'}
    ]
    this.listaProducto=[
      {
        id:1,
        producto: 'Producto 1 de nivel 1'
      },
      {
        id:2,
        producto: 'Producto 2 de nivel 1'
      },
      {
        id:3,
        producto: 'Producto 3 de nivel 1'
      },
      {
        id:4,
        producto: 'Producto 4 de nivel 1'
      }
    ]
    this.listaProducto=this.numeracion(this.listaProducto)
    this.getActividadOperativa()
  }
  cargarAE(){
    this.api.cargarAE().subscribe(res=>{
      this.accionEstrategica=res
      for(let i=0; i<this.accionEstrategica.length; i++){
        this.descripcionAE.push({name:this.accionEstrategica[i].descripcion, code: this.accionEstrategica[i].id})
      }
    })
  }
  cancelar(){
    this.estado=false
    this.api.cerrarModal.emit(this.estado)
  }
  buscarAE(){//metodo para cargar la informacion obtenido de la accion estrategica en los inputs
    if(this.valorAE!=0){
      //this.limpiar()
      this.datosAE=this.addAEDireccion.find(ae=>ae.idaccionEstregica===Number(this.valorAE));
      this.codigoAE=this.datosAE.codAccionEstra
      this.listarActividadOperativa()
    }

  }
  getActividadOperativa(){
    this.api.getActividadOperativa().subscribe(res=>{
      this.actividadOperativa=res
      this.datosActividadOperativa=this.actividadOperativa
    })

  }
  listarActividadOperativa(){

    for(let i=0; i<this.datosActividadOperativa.length; i++){
      if(this.datosActividadOperativa[i].codigo_ae==this.codigoAE){
        this.listaAO.push(this.datosActividadOperativa[i])

      }
    }
  }
  guardarRegistro(){
    if(this.valorAE>0){
      if(this.addUnidad.length>0){
        if(this.datosProducto.length>0){
          let ae=this.addAEDireccion.find(ae=>ae.idaccionEstregica==this.valorAE)
          let datos={
            "idAccionEstrategica": this.valorAE,
            "idActividadOp":this.idActividadOperativa,
            "idCiclo":0,
            "estado":0,
            "ficha": null,
            "nomAccEstra":ae.nomAccionEstrategica
          }
          console.log(datos)
          this.api.addVinculaAO(datos).subscribe(res=>{
            console.log(res)
            let idAO=0
            let nomAO
            let nomDir
            let nomObjetivo
            if(res.estado){
              idAO=res.content.idActividadOperativa
              nomAO=this.listaAO.find(ao=>ao.id==this.idActividadOperativa)
              nomDir=this.listaUnidadDireccion.find(dir=>dir.id_responsable==this.idUnidad)
              nomObjetivo=this.objetivos.find(oao=>oao.id==this.idObjetivoAO)
              let dato=JSON.parse(localStorage.getItem('usuario'))
              let aoDatos={
                "idUnidad": 2,
                "nombreUnidad": nomDir.nombre,
                "codUnidad": this.codigoAO,
                "idObjetivo": this.idObjetivoAO,
                "nomObjetivo": nomObjetivo.objetivo,
                "idActividadOperativa":idAO,
                "nomActividadOperativa":nomAO.descripcion,
                "nomDireccion":dato.dependencia
              }
              this.api.addAOUnidad(aoDatos).subscribe(res=>{
                let idUltimoAOUnida=res.content.idAOUnidad

                for(let i=0; i<this.datosProducto.length; i++){
                  let nomProducto=this.listaProducto.find(pro=>pro.id==this.datosProducto[i].idProducto)

                  let datosProd={
                    "idProducto": this.datosProducto[i].idProducto,
                    "peso":this.datosProducto[i].peso,
                    "estandar":this.datosProducto[i].indicador,
                    "formula":this.datosProducto[i].formula,

                    "idAOUnidad":idUltimoAOUnida,
                    "nomProducto": nomProducto.producto,
                    "tipoEvidencia": this.datosProducto[i].nombreDocumento
                  }
                  this.api.addProductoAO(datosProd).subscribe(res=>{
                    if(i==this.datosProducto.length-1){
                      this.cancelar()
                      this.actualizarRegistro()
                      this.messageService.add({key: 'mensaje', severity:'success', summary: 'Registro de Actividad Operativa', detail: 'Registro realizado correctamente'});
                    }
                  })
                }
              })
            }else{

              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Actividad Operativa', detail: 'Ocurrio un error al realizar el registro'});
            }
          })
        }else {
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Actividad Operativa', detail: 'Tiene que agregar un producto de nivel 1'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Actividad Operativa', detail: 'Tiene que agregar una sub direccion responsable'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Actividad Operativa', detail: 'Tiene que seleccionar la acción estrategica'});
    }
  }
  getUnidad(){
    this.api.getUnidad().subscribe(res=>{
      this.listaUnidad=res
      this.seleccionarUnidad()
    })

  }
  seleccionarUnidad(){
    for(let i=0; i<this.listaUnidad.length; i++){
      if(this.listaUnidad[i].nombre_organo==this.datosAELocal.dependencia){
        this.listaUnidadDireccion.push(this.listaUnidad[i])
      }
    }
  }
  getDatoSAO(){
    this.datosAO=this.actividadOperativa.find(ao=>ao.id===Number(this.idActividadOperativa))
    this.codigoAO=this.datosAO.codigo
    this.nombreActividadOperativa=this.datosAO.descripcion
  }
  getTipoDocumento(){
    this.api.getDocumento().subscribe(res=>{
      this.listarTipoDocumento=res.content

    })
  }
  actualizarRegistro():void{
    this.sub.listaDatosVinculados=[]
    this.sub.cargarAOVinculada()
  }
  agregarProducto(){
    if(this.idProducto>0){
        if(this.pesoProducto>0){
            if(this.indicador!=null){
              if(this.formula!=null){
                if(this.estandar!=null){
                  if(this.tipodocumento.length>0){
                      let valPro=this.listaProducto.find(p=>p.id==this.idProducto)
                      let valDoc=this.tipodocumento
                      this.datosProducto.push({idProducto: this.idProducto, nombreProducto: valPro.producto,

                        peso: this.pesoProducto, indicador: this.indicador,
                        formula: this.formula, nombreDocumento: valDoc,
                      estandar: this.estandar})
                      this.limpiarProducto()
                  }else{
                    this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de productos', detail: 'Tiene que seleccionar un tipo de evidencia'});
                  }
                } else{
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de productos', detail: 'Tiene indicar un estandar para el producto'});
                }
              }else{
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de productos', detail: 'Tiene que ingresar una formula para el producto'});
              }
            }else {
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de productos', detail: 'Tiene indicar un indicador para el producto'});
            }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de productos', detail: 'Tiene indicar un peso para el producto'});
        }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Tiene que seleccionar un producto'});
    }
  }
  limpiarProducto(){
    this.idProducto=0
    this.pesoProducto=0
    this.indicador=null
    this.formula=null
    this.estandar=null
    this.tipodocumento=""

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
  getAEDireccion(){
    this.local=localStorage.getItem('usuario')
    this.datosAELocal=JSON.parse(this.local)
    this.api.getAccionEstrategicaDireccion(this.datosAELocal.dependencia).subscribe(res=>{
      this.AEDireccion=res.content
      this.getObtenerAE()
    })
  }
  getObtenerAE(){

    for (let i=0; i<this.AEDireccion.length; i++){
       if(this.AEDireccion[i].nomDireccion==this.datosAELocal.dependencia){

         this.addAEDireccion.push(this.AEDireccion[i])
       }
    }
    this.seleccionarAE()
  }
  seleccionarAE(){
    for(let i=0; i<this.addAEDireccion.length; i++){
      let val= this.addAEDireccion[i].nomAccionEstrategica
      for(let j=0; j<this.addAEDireccion.length; j++){
        if(this.addAEDireccion[j].nomAccionEstrategica!=val){
          this.listaAE.push(this.addAEDireccion[i])
        }
      }
    }
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  agregarUnidad(){

    if(this.idActividadOperativa!=0){
      if(this.idObjetivoAO!=0){
        if(this.idUnidad!=0){
          if(this.addUnidad.length>0){//si no hay un registor en el arreglo
            let cantidad=false;
            for(let i=0; i<this.addUnidad.length; i++){
              if(this.addUnidad[i].idAO==this.idActividadOperativa){
                 cantidad=true
              }else{
                cantidad=false
              }
            }
            console.log(cantidad)
            if(cantidad){
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Ya se agrego la actividad operativa'});
            }else{
              this.api.contarAO(this.idActividadOperativa).subscribe(res=>{
                if(res>0){
                  this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Ya se agrego la actividad operativa'});
                }else{
                  let valAO=this.listaAO.find(ao=>ao.id==this.idActividadOperativa)
                  let valObjetivo=this.objetivos.find(objetivo=>objetivo.id==this.idObjetivoAO)
                  let valUnidad=this.listaUnidadDireccion.find(uni=>uni.id_responsable==this.idUnidad)
                  this.addUnidad.push({idAO: valAO.id,nombreAO: valAO.descripcion,
                    idObjetivoAO: valObjetivo.id, nombreObjetivoAO: valObjetivo.objetivo,
                    idUnidad: valUnidad.id_responsable, nombreUnidad: valUnidad.nombre, estado: false})
                  this.numeracion(this.addUnidad)
                }
              })
            }
          }else{//verifico en el servidor
            this.api.contarAO(this.idActividadOperativa).subscribe(res=>{
              if(res>0){
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Ya se agrego la actividad operativa'});
              }else{
                let valAO=this.listaAO.find(ao=>ao.id==this.idActividadOperativa)
                let valObjetivo=this.objetivos.find(objetivo=>objetivo.id==this.idObjetivoAO)
                let valUnidad=this.listaUnidadDireccion.find(uni=>uni.id_responsable==this.idUnidad)
                this.addUnidad.push({idAO: valAO.id,nombreAO: valAO.descripcion,
                  idObjetivoAO: valObjetivo.id, nombreObjetivoAO: valObjetivo.objetivo,
                  idUnidad: valUnidad.id_responsable, nombreUnidad: valUnidad.nombre, estado: false})
                this.numeracion(this.addUnidad)
              }
            })
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Tiene que seleccionar una unidad responsable'});
        }
      } else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Tiene que seleccionar un objetivo'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de Productos', detail: 'Tiene que seleccionar una actividad Operativa'});
    }
  }
  eliminarSubDireccion(num){
    let nume=this.addUnidad.findIndex(a=>a.numeracion==num)
    this.addUnidad.splice(nume,1)
  }
}

