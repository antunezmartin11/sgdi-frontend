import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlanificacionDirectivoService} from "../../services/planificacion-directivo.service";
import {AccionEstrategica} from "../../../../modelos/AccionEstrategica";
import {Objetivo} from "../../../../modelos/objetivo";
import {MessageService} from "primeng/api";
import {find} from "rxjs/operators";
import {PlanificacionDirectivoComponent} from "../../planificacion-directivo.component";

@Component({
  selector: 'app-registro-AE',
  templateUrl: './registroAE.component.html',
  styleUrls: ['./registroAE.component.css'],
  providers: [MessageService]
})
export class RegistroAEComponent implements OnInit {
  datos1: any[];
  accionE:any;
  codigo: string='';
  indicador: string;
  direccion: number=0;
  datosAE: any=[];
  listaO: Objetivo[];
  listaObjetivo: any[]=[];
  idObjetivo:number=0;
  peso: any
  formula: string =''
  evidencia: any
  datoProducto: any
  @Input() estado: boolean=false;
  nombreAccionEstrategica: string;
  respuesta: any;
  accionEstrategica: AccionEstrategica[]=[];
  accionSelect: any=0;
  descripcionAE: any []=[];
  listaProducto:any[]
  contribucionObjetivo: any;
  contribucionProducto: any;
  idProducto: number=0;
  idUnidad: number;
  listaProductos: any=[]
  ene: boolean=false;
  feb:boolean=false;
  mar:boolean=false;
  abr: boolean=false;
  may: boolean=false;
  jun: boolean=false;
  jul: boolean=false;
  ago: boolean=false;
  set: boolean=false;
  oct: boolean=false;
  nov: boolean=false;
  dic: boolean=false;
  txtene: boolean=true;
  txtfeb: boolean=true;
  txtmar: boolean=true;
  txtabr: boolean=true;
  txtmay: boolean=true;
  txtjun: boolean=true;
  txtjul: boolean=true;
  txtago: boolean=true;
  txtset: boolean=true;
  txtoct: boolean=true;
  txtnov: boolean=true;
  txtdic: boolean=true;
  contribucionEne: any;
  contribucionFeb: any;
  contribucionMar: any;
  contribucionAbr: any;
  contribucionMay: any;
  contribucionJun: any;
  contribucionJul: any;
  contribucionAgo: any;
  contribucionSet: any;
  contribucionOct: any;
  contribucionNov: any
  contribucionDic: any;
  listaDocumento: any;
  ultimoIdAE: any;
  respuestaProducto:any
  accion: any
  datoPrueba: any =[]
  listaDirectivo: any
  addDireccion: any = []
  nombreObjetivo: string
  nombreDireccion: string
  nomResponsable: string
  loading: boolean
  valorDireccion: boolean=false
  totalContribucion: number = 0
  idAEDreiccion: number
  productoPrueba:any[]
  idOficinaResponsable:string
  constructor(private api: PlanificacionDirectivoService,
              private messageService: MessageService,
              private planificacion: PlanificacionDirectivoComponent) { }

  ngOnInit(): void {
    this.loading=false
    this.productoPrueba=[
      {id: 1,
      nombre: 'Producto de prueba 1'},
      {
        id: 2,
        nombre: 'Producto de prueba 2'
      },
      {
        id: 3,
        nombre: 'Producto de prueba 3'
      }
    ]
    this.datoPrueba=[
      {
        "id": 23,
        "codigo": "E.01",
        "descripcion": "Direccionamiento Estratégico",
        "nivel": 0,
        "flagUltimoNivel": 3,
        "idEstadoProceso": 3,
        "descEstado": "APROBADO",
        "procesosHijo": [
          {
            "id": 25,
            "codigo": "E.01.01",
            "descripcion": "Gestión de la Planificación Institucional",
            "nivel": 1,
            "flagUltimoNivel": 3,
            "idEstadoProceso": 3,
            "descEstado": "APROBADO",
            "procesosHijo": [
              {
                "id": 26,
                "codigo": "E.01.01.01",
                "descripcion": "Formulación, aprobación y modificación del Plan Estratégico Institucional (PEI)",
                "nivel": 2,
                "flagUltimoNivel": 3,
                "idEstadoProceso": 3,
                "descEstado": "APROBADO",
                "procesosHijo": []
              },
              {
                "id": 27,
                "codigo": "E.01.01.02",
                "descripcion": "Formulación, aprobación y modificación del Plan Operativo Institucional (POI)",
                "nivel": 2,
                "flagUltimoNivel": 3,
                "idEstadoProceso": 3,
                "descEstado": "APROBADO",
                "procesosHijo": []
              }
            ]
          },
          {
            "id": 28,
            "codigo": "E.01.02",
            "descripcion": "Gestión de la Programación Multianual y Evaluación Presupuestal",
            "nivel": 1,
            "flagUltimoNivel": 3,
            "idEstadoProceso": 3,
            "descEstado": "APROBADO",
            "procesosHijo": [
              {
                "id": 29,
                "codigo": "E.01.02.01",
                "descripcion": "Programación Multianual , Formulación y Aprobación Presupuestaria Anual",
                "nivel": 2,
                "flagUltimoNivel": 3,
                "idEstadoProceso": 3,
                "descEstado": "APROBADO",
                "procesosHijo": []
              },
              {
                "id": 30,
                "codigo": "E.01.02.02",
                "descripcion": "Seguimiento y Evaluación Presupuestaria",
                "nivel": 2,
                "flagUltimoNivel": 3,
                "idEstadoProceso": 3,
                "descEstado": "APROBADO",
                "procesosHijo": []
              }
            ]
          }
        ]
      },
      {
        "id": 24,
        "codigo": "E.02",
        "descripcion": "Gestión de Modernización Institucional",
        "nivel": 0,
        "flagUltimoNivel": 3,
        "idEstadoProceso": 3,
        "descEstado": "APROBADO",
        "procesosHijo": []
      }
    ]
    this.cargarAccionE()
    this.getObjetivo()
    this.cargarTipoDocumento()

    this.api.accion.subscribe(res=>{
      this.accion=res
      if(res!=1){

       this.setValores()
      }
    })
    this.getDirectivo()
  }
  setValores(){

    this.accionSelect=this.accion.idAccion
    this.codigo=this.accion.codAccionEst
    this.indicador=this.accion.indicador
    this.direccion=this.accion.idDireccion
    this.idObjetivo=this.accion.idObjetivo
  }
  cargarAccionE(){//Metodo para obtener las acciones estrategicas del SIGP
    this.api.cargarAE().subscribe(res=>{

      this.accionEstrategica=res

      for(let i=0; i<this.accionEstrategica.length; i++){
        this.descripcionAE.push({name:this.accionEstrategica[i].descripcion, code: this.accionEstrategica[i].id})
      }
    });
  }

  cargarTipoDocumento(){
    this.api.getDocumento().subscribe(res=>{
      this.listaDocumento=res.content
    })
  }
  limpiar(){
    this.codigo=""
    this.indicador=""
    this.direccion=0
  }
  buscarAE(){//metodo para cargar la informacion obtenido de la accion estrategica en los inputs

    if(this.accionSelect!=0){
      this.limpiar()
      this.datosAE=this.accionEstrategica.find(ae=>ae.id===Number(this.accionSelect));
      this.codigo=this.datosAE.codigo
      this.indicador=this.datosAE.nombre_indicador
      this.nombreAccionEstrategica=this.datosAE.descripcion
      this.idUnidad=this.datosAE.id_organo
      this.direccion=this.datosAE.id_organo
    }

  }
  getObjetivo(){//Metodo para obtener los objetivos de nivel 0  del mapro
    this.listaO=this.datoPrueba//Solo para datos de prueba
    this.listaObjetivo=this.listaO

    /*this.api.getObjetivo().subscribe(res=>{
      this.listaO=res
      this.listaO=this.datoPrueba//Solo para datos de prueba
      this.listaObjetivo=this.listaO
      console.log(this.listaObjetivo)
    })*/

  }


  getProcesos(){//Metodo para obtener los productos del mapro de nivel 0

    this.api.getProcesos(this.idObjetivo).subscribe(res=>{
      this.listaProducto=res

    })

  }
  setProceso(){//Metodo para asignar los valores obtenidos de los productos a los input
    this.datoProducto=this.listaProducto.find(pr=>pr.id===Number(this.idProducto))
    this.formula=this.datoProducto.formula
  }
  guardarRegistro(){//Metodo para realizar el registro de la informacion ingresada
    if(this.accion==1){
      if(this.accionSelect!=0){
        if(this.addDireccion.length>0){
          if(this.validarProgramacion()){
            if(this.listaProductos.length>0){
              if(this.validarDireccionSelect()){
                let dat={
                  "idAccion":this.accionSelect,
                  "idPlaza":2,
                  "codAccionEst":this.codigo,
                  "indicador":this.indicador,
                  "idCiclo":0,
                  "nomAccEst":this.nombreAccionEstrategica
                }
                this.api.addVincularAE(dat).subscribe(res=>{
                  this.respuesta=res
                  if(this.respuesta.estado){
                    this.api.getUltimoIdAE().subscribe(res=>{
                      this.ultimoIdAE=res.content[0].idAccionEstrategica
                      this.agregarDireccionPost(this.ultimoIdAE)
                    })

                  }else{
                    this.messageService.add({key: 'mensaje', severity:'error', summary: 'Vincular Accion Estrategica', detail: 'Ocurrio un error en el registro'});
                  }
                })
              }else{
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Seleccion de un producto', detail: 'Tiene que seleccionar una dirección para los productos'});
              }
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Seleccion de un producto', detail: 'Tiene que agregar productos antes de continuar'});
            }
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Programación', detail: 'Tiene que indicar por lo menos un mes de contribución'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Accion Estrategica', detail: 'Tiene que agregar una dirección responsable'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Accion Estrategica', detail: 'Tiene que seleccionar una Acción Estrategica'});
      }
    }else{

    }
  }
  validarProgramacion(){//Validar que se realiza una programacion
    let val=false;
    val = this.contribucionEne != undefined || this.contribucionFeb != undefined || this.contribucionMar != undefined
      || this.contribucionAbr != undefined || this.contribucionMay != undefined || this.contribucionJun != undefined
      || this.contribucionJul != undefined || this.contribucionAgo != undefined || this.contribucionSet != undefined
      || this.contribucionOct != undefined || this.contribucionNov != undefined || this.contribucionDic != undefined;
    return val

  }
  programacion(peso: number, idPeriodo: number, idAE:number){
    let datos={
      "peso": peso,
      "idPeriodo":idPeriodo,
      "idAEDireccion":idAE
    }
    this.api.addProgramacionAE(datos).subscribe(res=>{

    })
  }
  addProgramacion(idAE:number){
    if(this.contribucionEne!=null){
      this.programacion(this.contribucionEne, 1, idAE)
    }
    if(this.contribucionFeb!=null){
      this.programacion(this.contribucionFeb, 2, idAE)
    }
    if(this.contribucionMar!=null){
      this.programacion(this.contribucionMar, 3, idAE)
    }
    if(this.contribucionAbr!=null){
      this.programacion(this.contribucionAbr, 4, idAE)
    }
    if(this.contribucionMay!=null){
      this.programacion(this.contribucionMay, 5, idAE)
    }
    if(this.contribucionJun!=null){
      this.programacion(this.contribucionJun, 6, idAE)
    }
    if(this.contribucionJul!=null){
      this.programacion(this.contribucionJul, 7, idAE)
    }
    if(this.contribucionAgo!=null){
      this.programacion(this.contribucionAgo, 8, idAE)
    }
    if(this.contribucionSet!=null){
      this.programacion(this.contribucionSet, 9, idAE)
    }
    if(this.contribucionOct!=null){
      this.programacion(this.contribucionOct, 10, idAE)
    }
    if(this.contribucionNov!=null){
      this.programacion(this.contribucionNov, 11, idAE)
    }
    if(this.contribucionDic!=null){
      this.programacion(this.contribucionDic, 12, idAE)
    }

  }
  cancelar(){//Metodo para cerrar el modal
    this.estado=false
    this.limpiarFormulario()
    this.api.cerrarModal.emit(this.estado)
  }
  limpiarFormulario(){//Limpiar los valores del formulario
    this.accionSelect=0
    this.codigo=""
    this.indicador=""
    this.direccion=0
    this.idObjetivo=0
    this.contribucionObjetivo=null
    this.ene=false
    this.feb=false
    this.mar=false
    this.abr=false
    this.may=false
    this.jun=false
    this.jul=false
    this.ago=false
    this.set=false
    this.oct=false
    this.nov=false
    this.dic=false
    this.contribucionEne=null
    this.contribucionFeb=null
    this.contribucionMar=null
    this.contribucionAbr=null
    this.contribucionMay=null
    this.contribucionJun=null
    this.contribucionJul=null
    this.contribucionAgo=null
    this.contribucionSet=null
    this.contribucionOct=null
    this.contribucionNov=null
    this.contribucionDic=null
    this.txtene=true
    this.txtfeb=true
    this.txtmar=true
    this.txtabr=true
    this.txtmay=true
    this.txtabr=true
    this.txtjun=true
    this.txtjul=true
    this.txtago=true
    this.txtset=true
    this.txtoct=true
    this.txtnov=true
    this.txtdic=true
    this.listaProductos=null
    this.addDireccion=null
  }
  cambiarEstadoInput(mes: number){//Habilitar o desahbilitar los inputs con el check
    switch (mes) {
      case 1:
        this.ene = !this.ene;
        this.txtene = !this.txtene
        break;
      case 2:
        this.feb = !this.feb
        this.txtfeb = !this.txtfeb
        break;
      case 3:
        this.mar = !this.mar
        this.txtmar = !this.txtmar
        break;
      case 4:
        this.abr=!this.abr
        this.txtabr=!this.txtabr
        break;
      case 5:
        this.may=!this.may
        this.txtmay=!this.txtmay
        break;
      case 6:
        this.jun=!this.jun
        this.txtjun=!this.txtjun
        break;
      case 7:
        this.jul=!this.jul
        this.txtjul=!this.txtjul
        break;
      case 8:
        this.ago=!this.ago
        this.txtago=!this.txtago
        break;
      case 9:
        this.set=!this.set
        this.txtset=!this.txtset
        break;
      case 10:
        this.oct=!this.oct
        this.txtoct=!this.txtoct
        break;
      case 11:
        this.nov=!this.nov
        this.txtnov=!this.txtnov
        break;
      case 12:
        this.dic=!this.dic
        this.txtdic=!this.txtdic
        break;
    }
  }
  agregarProductos(){
    if(this.idProducto!=0){
      let producto=this.productoPrueba.find(i=>i.id==this.idProducto)
      if(this.peso>0){
        if(this.formula.length>0){
          if(this.evidencia!=null){
            if(this.contribucionProducto>0){
              this.listaProductos.push({idProducto: this.idProducto,nombreProducto:producto.nombre, peso: this.peso, formula: this.formula, evidencia: this.evidencia, contribucionProducto: this.contribucionProducto})
              this.listaProductos=this.numeracion(this.listaProductos)
              this.limpiarProductos()

            }else {
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Tiene que ingresar una contribución para el producto'});
            }
          }else {
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Tiene que seleccionar el tipo de evidencia'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Tiene que ingresar una formula para el producto'});
        }
      }else {
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Tiene que ingresar un peso para el producto'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Tiene que seleccionar un producto'});
    }


  }
  limpiarProductos(){
    this.idProducto=0
    this.peso=null
    this.formula=''
    this.evidencia=null
    this.contribucionProducto=null
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
  getDirectivo(){
    this.api.getDirectivo().subscribe(res=>{
      this.listaDirectivo=res

    })
  }
  getNombreDireccion(){
    let dato=this.listaDirectivo.find(a=>a.id == this.direccion)
    this.nombreDireccion=dato.nombre
    this.nomResponsable=dato.nombre_responsable

  }
  sumarContribucion(){
    this.totalContribucion=0
    if(this.addDireccion.length>0){
      for(let i=0; i<this.addDireccion.length; i++){
        this.totalContribucion+=parseFloat(this.addDireccion[i].contribucion)


      }
    }

  }
  agregarDireccion(){
    if(this.direccion!=0){
      if(this.idObjetivo!=0){
        if(this.contribucionObjetivo>0){
          if(this.totalContribucion+parseFloat(this.contribucionObjetivo)>1){
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'La contribución supero el limite establecido'});
          }else{
            let existe= this.addDireccion.find(a=>a.id ==this.direccion)
            if(existe==undefined){
              let lobjetivo= this.listaObjetivo.find(d=>d.id==this.idObjetivo)
              this.addDireccion.push({id: this.direccion, nombre: this.nombreDireccion, responsable:this.nomResponsable,contribucion: parseFloat(this.contribucionObjetivo), idObjetivo: this.idObjetivo, nomObjetivo: lobjetivo.descripcion, estado: false})

              this.addDireccion=this.numeracion(this.addDireccion)
              this.sumarContribucion()
              this.idObjetivo=0
              this.contribucionObjetivo=null
              this.direccion=0
            }else{
              this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'La dirección Selecciona ya se agrego'});
            }
          }
        }else {
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Ingrese una contribucion'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Seleccione un objetivo primero'});
      }
    }else {
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Agregar Productos', detail: 'Seleccione una dirección primero'});
    }
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  eliminarDireccion(id){
    let idDi=this.addDireccion.findIndex(a=>a.id==id)
    this.addDireccion.splice(idDi,1)
  }

  eliminarProducto(id){
    let idDi=this.listaProductos.findIndex(a=>a.idProducto==id)
    this.listaProductos.splice(idDi,1)

  }
  agregarDireccionPost(idAE){
    for(let i=0; i<this.addDireccion.length; i++){
      if(this.addDireccion[i].estado){
        let direcciones={
          "idAccionEstrategica":idAE,
          "idDireccion": this.addDireccion[i].id,
          "nomDireccion": this.addDireccion[i].nombre,
          "idPlaza":0,
          "nomResponsable":this.addDireccion[i].responsable,
          "contribucion":this.addDireccion[i].contribucion,
          "idObjetivo":this.addDireccion[i].idObjetivo,
          "nomObjetivo":this.addDireccion[i].nombreObjetivo
        }

        this.api.addAEDireccion(direcciones).subscribe(res=>{
          this.addProgramacion(res.content.idAEDireccion)
          let datosPro={}
          for(let i=0; i<this.listaProductos.length; i++){
            datosPro=
              {
                "idProducto":this.listaProductos[i].idProducto,
                "peso":this.listaProductos[i].peso,
                "formula":this.listaProductos[i].formula,
                "medioVerificacion":this.listaProductos[i].evidencia,
                "idAEDireccion":res.content.idAEDireccion,
                "contribucion":this.listaProductos[i].contribucionProducto,
                "nomProducto":this.listaProductos[i].nombreProducto
              }

            this.api.addProductoAE(datosPro).subscribe(res=>{
              this.respuestaProducto=res.content
              if(i==this.listaProductos.length-1){
                this.estado=false
                this.api.cerrarModal.emit(false)
                this.messageService.add({key: 'mensaje', severity:'success', summary: 'Vincular Accion Estrategica', detail: 'Se realizo el registro correctamente'});
              }
            })
          }

        })
        this.planificacion.getAccionVinculada()
      }else{

      }
    }
  }
  validarDireccionSelect(){
    let val=false
    for(let i=0; i<this.addDireccion.length; i++){
      val = !!this.addDireccion[i].estado;
    }
    return val
  }
}
