import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionServidoresService} from "../../service/planificacion-servidores.service";
import {PlanificacionServidorService} from "../../../planificacion-servidores/service/planificacion-servidor.service";
import {MessageService} from "primeng/api";
import {PlanificacionServidorComponent} from "../../planificacion-servidor.component";

@Component({
  selector: 'app-completar-registro',
  templateUrl: './completar-registro.component.html',
  styleUrls: ['./completar-registro.component.css'],
  providers: [MessageService]
})
export class CompletarRegistroComponent implements OnInit {
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
  idEne: number
  idFeb: number
  idMar: number
  idAbr: number
  idMay: number
  idJun: number
  idJul: number
  idAgo: number
  idSet: number
  idOct: number
  idNov: number
  idDic: number
  @Input() completarRegistroModal: boolean
  actividadOperativa: any
  objetivo: any
  producto: any
  idProductoAO: number
  periodos: any=[]
  constructor( private plani: PlanificacionServidoresService,
               private api: PlanificacionServidorService,
               private cargar: PlanificacionServidorComponent,
               private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerDatos()
  }
  asignarValor(valor){
    console.log(valor)
    switch (valor.idPeriodo){
      case 1:
        this.chkEne=true
        this.txtEne=false
        this.valEne=valor.peso
        this.idEne=valor.idPeriodoActividad
        break;
      case 2:
        this.chkFeb=true
        this.txtFeb=false
        this.valFeb=valor.peso
        this.idFeb=valor.idPeriodoActividad
        break;
      case 3:
        this.chkMar=true
        this.txtMar=false
        this.valMar=valor.peso
        this.idMar=valor.idPeriodoActividad
        break;
      case 4:
        this.chkAbr=true
        this.txtAbr=false
        this.valAbr=valor.peso
        this.idAbr=valor.idPeriodoActividad
        break;
      case 5:
        this.chkMay=true
        this.txtMay=false
        this.valMay=valor.peso
        this.idMay=valor.idPeriodoActividad
        break;
      case 6:
        this.chkJun=true
        this.txtJun=false
        this.valJun=valor.peso
        this.idJul=valor.idPeriodoActividad
        break;
      case 7:
        this.chkJul=true
        this.txtJul=false
        this.valJul=valor.peso
        this.idJul=valor.idPeriodoActividad
        break;
      case 8:
        this.chkAgo=true
        this.txtAgo=false
        this.valAgo=valor.peso
        this.idAgo=valor.idPeriodoActividad
        break;
      case 9:
        this.chkSet=true
        this.txtSet=false
        this.valSet=valor.peso
        this.idSet=valor.idPeriodoActividad
        break;
      case 10:
        this.chkOct=true
        this.txtOct=false
        this.valOct=valor.peso
        this.idOct=valor.idPeriodoActividad
        break;
      case 11:
        this.chkNov=true
        this.txtNov=false
        this.valNov=valor.peso
        this.idNov=valor.idPeriodoActividad
        break;
      case 12:
        this.chkDic=true
        this.txtDic=false
        this.valDic=valor.peso
        this.idDic=valor.idPeriodoActividad
        break;
    }
  }
  obtenerDatos(){
    this.plani.datosCompletar.subscribe(res=>{
      this.actividadOperativa=res.nomActividad
      this.objetivo=res.nomObjetivo
      this.producto=res.nomProducto
      this.idProductoAO=res.idProductoAOActividad
      this.plani.getPeriodo(this.idProductoAO).subscribe(resp=>{
        this.periodos=resp.content
        for (let i=0; i<this.periodos.length; i++){
          console.log(this.periodos[i])
            this.asignarValor(this.periodos[i])
        }
      })

    })
  }

  cancelar(){
    this.completarRegistroModal=false
    this.plani.modalRegistro.emit(false)
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
  programacion(peso: number, idPeriodo: number, idAE:number){
    let datos={
      "peso": peso,
      "idPeriodo":idPeriodo,
      "idProductoAO_Actividad":idAE
    }
    this.api.addProgramacionServidor(datos).subscribe(res=>{
      console.log(res)
    })
  }

  addProgramacion(idAE: number){
    if(this.valEne!=null){
      if(this.idEne!=null){
        this.update(this.idEne,this.valEne, 1)
      }else{
        this.programacion(this.valEne, 1, idAE)
      }

    }
    if(this.valFeb!=null){
      if(this.idFeb!=null){
        this.update(this.idFeb, this.valFeb, 2);
      }else {
        this.programacion(this.valFeb, 2, idAE)
      }

    }
    if(this.valMar!=null){
      if(this.idMar!=null){
        this.update(this.idMar, this.valMar, 3)
      }else {
        this.programacion(this.valMar, 3, idAE)
      }

    }
    if(this.valAbr!=null){
      if(this.idAbr!=null){
        this.update(this.idAbr, this.valAbr, 4)
      }else{
        this.programacion(this.valAbr, 4, idAE)
      }

    }
    if(this.valMay!=null){
      if(this.idMay){
        this.update(this.idMay,this.valMay, 5)
      }else{
        this.programacion(this.valMay, 5, idAE)
      }
    }
    if(this.valJun!=null){
      if(this.idJun!=null){
        this.update(this.idJun, this.valJun, 6)
      }else{
        this.programacion(this.valJun, 6, idAE)
      }
    }
    if(this.valJul!=null){
      if(this.idJul!=null){
        this.update(this.idJul, this.valJul, 7)
      }else{
        this.programacion(this.valJul, 7, idAE)
      }
    }
    if(this.valAgo!=null){
      if(this.idAgo!=null){
        this.update(this.idAgo, this.valAgo, 8)
      }else{
        this.programacion(this.valAgo, 8, idAE)
      }

    }
    if(this.valSet!=null){
      if(this.idSet!=null){
        this.update(this.idSet, this.valSet, 9)
      }else{
        this.programacion(this.valSet, 9, idAE)
      }

    }
    if(this.valOct!=null){
      if(this.idOct!=null){
        this.update(this.idOct, this.valOct, 10)
      }else{
        this.programacion(this.valOct, 10, idAE)
      }
    }
    if(this.valNov!=null){
      if(this.idNov!=null){
        this.update(this.idNov, this.valDic, 11)
      }else{
        this.programacion(this.valNov, 11, idAE)
      }

    }
    if(this.valDic!=null){
      this.programacion(this.valDic, 12, idAE)
    }

  }

  validarProgramacion(){//Validar que se realiza una programacion
    let val=false;
    val = this.valEne != undefined || this.valFeb != undefined || this.valMar != undefined
      || this.valAbr != undefined || this. valMay != undefined || this.valJun != undefined
      || this.valJul != undefined || this.valAgo != undefined || this.valSet != undefined
      || this.valOct != undefined || this.valNov != undefined || this.valDic != undefined;
    return val

  }
  actualizarDatos(): void{
    this.cargar.cargarAsingacion()
  }
  guardar(){
    if(this.validarProgramacion()){

      this.addProgramacion(this.idProductoAO)
      this.api.updateEstado({flag:1},this.idProductoAO).subscribe(res=>{
        console.log(res)
      })
      this.actualizarDatos()
      this.cancelar()
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Asignación de actividades', detail: 'Tiene que ingresar minimo un mes de contribución'});
    }
  }
  update(id: number, peso: number, idPeriod: number){
    let dato={
      peso: peso,
      idPeriodo: idPeriod
    }
    this.plani.updatePeriodoServidor(id, dato).subscribe()
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,.]+$/)? true:false);
  }
}
