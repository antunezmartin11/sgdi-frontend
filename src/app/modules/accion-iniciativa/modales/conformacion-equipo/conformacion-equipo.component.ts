import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AccionIniciativaService} from "../../services/accion-iniciativa.service";
import {AccionIniciativaComponent} from "../../accion-iniciativa.component";

@Component({
  selector: 'app-conformacion-equipo',
  templateUrl: './conformacion-equipo.component.html',
  styleUrls: ['./conformacion-equipo.component.css'],
  providers: [MessageService]
})
export class ConformacionEquipoComponent implements OnInit {

  @Input() modalConformacionEquipo: boolean
  listaEquipo: any
  loading: boolean
  recepcionDatos: any
  listaOrgano: any
  listaOrgano1: any
  listDocumento: any
  idOrgano: number=0
  idUnidadEquipo: number=0
  medioVerificacion: any
  accionIniciativa: string = ''
  unidad: any
  datos: any
  rol:any
  fechaInicio: any
  fechaFin: any
  valorRol:number=1
  valorRol1: number=0
  listaPersonal:any
  listaPersonal1: any
  personalUnidad:any=[]
  personalUnidad1:any=[]
  responsable:number=0
  responsable1: number=0
  equipo:any =[]
  idAccionIniciativa:any
  contribucionLider: number
  contribucion: number
  cargoServidor: string
  estado: boolean=true
  estado1: boolean=false
  constructor(private messageService: MessageService,
              private api: AccionIniciativaService,
              private accion: AccionIniciativaComponent) { }

  ngOnInit(): void {
    this.getDatos()
    this.loading=false
    this.getDocumento()
    this.getOrgano()
    this.getServidores()

  }
  getDatos(){
    this.api.datos.subscribe(res=>{
      this.datos=res

      this.accionIniciativa=this.datos.descripcion
      this.idOrgano=this.datos.idUnidad
      this.medioVerificacion=this.datos.medioVerificacion
      this.fechaInicio=this.datos.fecInicio
      this.fechaFin=this.datos.fecFin
      this.idAccionIniciativa=this.datos.idAccionIniciativa
      this.getRol()
      this.servidoresUnidad()
    })

  }

  agregarLider(){


    if(this.responsable!=0){
      if(this.valorRol!=0){

        if(this.contribucionLider>0){
          let nombre=this.listaPersonal.find(p=>p.cod_emp==this.responsable)

          let unidad=this.listaOrgano.find(o=>o.id==this.idOrgano)
          let cargo= nombre.nombre_crg_fisico
          let vRol=this.rol.find(r=>r.idRol===this.valorRol)

          this.equipo.push({idPlaza:this.responsable,nomServidor: nombre.a_paterno+' '+nombre.a_materno+' '+nombre.nom_emp,
            idAccionIniciativa:this.idAccionIniciativa, idUnidad: this.idOrgano,
            nomUnidad: unidad.nombre, contribucion: this.contribucionLider,
            idRol: this.valorRol, rol: vRol.descripcion, cargo: cargo })
            this.equipo=this.numeracion(this.equipo)
            this.estado=false
            this.estado1=true
            this.responsable=0
            this.valorRol=0
            this.contribucionLider=null
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que ingresar una contribución'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar un rol para el responsable'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar un responsable'});
    }
  }
  getRol(){
    this.api.getRol().subscribe(res=>{
      this.rol=res.content
    })
  }
  cancelar(){
    this.modalConformacionEquipo=false
    this.api.cerrarModal.emit(false)
    this.estado=true
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,.]+$/)? true:false);
  }
  validarFecha(e: any){
    let key = e.key;
    return (key.match(/^[0-9,-,/]+$/)? true:false);
  }
  validarLetrasNumero(e:any) {
    let key = e.key;
    return (!!key.match(/^[0-9,.,-,a-z\u00E0-\u00FC,A-Z\u00E0-\u00FC, ,ñ, Ñ,°,/,-]+$/));
  }
  validarLetras(e:any) {
    let key = e.key;
    return (!!key.match(/^[0-9,.,-,a-z,A-Z, ,ñ, Ñ]/));
  }
  getOrgano(){
    this.api.getUnidad().subscribe(res=>{
      this.listaOrgano=res
      this.listaOrgano1=res
    })
  }
  getDocumento(){
    this.api.getDocumento().subscribe(res=>{
      this.listDocumento=res.content
    })
  }
  getServidores(){
    this.api.getPersonal().subscribe(res=>{
      this.listaPersonal=res
      this.listaPersonal1=res
    })

  }
  servidoresUnidad(){
    this.personalUnidad=[]
    for(let i=0; i<this.listaPersonal.length; i++){
      if(this.listaPersonal[i].nombre_dependencia===this.datos.nomUnidad){
        this.personalUnidad.push(this.listaPersonal[i])
      }
    }
    this.personalUnidad=this.numeracion(this.personalUnidad)

  }
  servidoresUnidadC(){
    this.personalUnidad1=[]
    let nom=this.listaOrgano1.find(o=>o.id==this.idUnidadEquipo)
    for(let i=0; i<this.listaPersonal1.length; i++){
      if(this.listaPersonal1[i].nombre_dependencia===nom.nombre){
        this.personalUnidad1.push(this.listaPersonal[i])
      }
    }
    this.personalUnidad1=this.numeracion(this.personalUnidad1)

  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  agregarEquipo(){
    if(this.idUnidadEquipo!=0){
      if(this.responsable1!=0){
        if(this.valorRol1!=0){
          if(this.contribucion>0){
            let nombre=this.listaPersonal1.find(p=>p.cod_emp==this.responsable1)
            let unidad=this.listaOrgano1.find(o=>o.id==this.idUnidadEquipo)
            let cargo= nombre.nombre_crg_fisico
            let vrol= this.rol.find(r=>r.idRol==this.valorRol1)
            this.equipo.push({idPlaza:this.responsable1,
              nomServidor: nombre.a_paterno+' '+nombre.a_materno+' '+nombre.nom_emp,
              idAccionIniciativa:this.idAccionIniciativa, idUnidad: this.idUnidadEquipo,
              nomUnidad: unidad.nombre, contribucion: this.contribucion,
              idRol: this.valorRol1, rol:vrol.descripcion, cargo: cargo })
            this.equipo=this.numeracion(this.equipo)
            this.idUnidadEquipo=0
            this.responsable1=0
            this.valorRol1=0
            this.contribucion=null
          }else{
            this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que ingresar una contribución'});
          }
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar un rol para el responsable'});
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar un responsable'});
      }
    }else {
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que seleccionar una Dirección'});
    }
  }
  actualizarDatos(): void{
    this.accion.getAccionIniciativa()
  }
  guardarEquipo(){

    if(this.equipo.length>0){
        for (let i=0; i<this.equipo.length; i++){
          this.api.addEquipo(this.equipo[i]).subscribe(res=>{
            if(i==this.equipo.length-1){
              this.messageService.add({key: 'mensaje', severity:'success', summary: 'Conformación de Equipo', detail: 'Equipo Registrado'});
            }
          })
        }
      this.actualizarDatos()
      this.cancelar()
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Conformación de Equipo', detail: 'Tiene que agregar minimo un intregante'});
    }
  }
}
