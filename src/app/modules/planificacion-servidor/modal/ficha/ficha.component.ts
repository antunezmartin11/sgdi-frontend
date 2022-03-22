import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionServidorService} from "../../../planificacion-servidores/service/planificacion-servidor.service";
import {PlanificacionServidoresService} from "../../service/planificacion-servidores.service";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {CONSTRUCTOR} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  @Input() abrirFicha: boolean = false
  datosServidor: any
  nombreCompleto: string
  codigoServidor: string
  puesto: string
  unidad: string
  listaUGP: any
  personal: any=[]
  dniEvaluador: any
  nombreEvaluador: string
  puestoEvaluador: string
  unidadEvaluador: string
  actividad: string
  listaPlanificada: any
  producto: string
  meta: number = 0
  peso: number = 0
  idProductoA0: number
  plazo:string = ''
  min: number
  minComparar: number
  max: number
  valorFormulaPEI: number
  valorAccion: number
  valorIniciativa: number
  valorMetaFinal: number
  listaPeriodo: any[]
  idServidorActividad: number
  productosServidor: any[]=[]
  listaFinal: any[]=[]
  listaEquipo: any
  constructor(private api: PlanificacionServidoresService) { }

  ngOnInit(): void {

    this.getDatosEvaluado()
    this.getPersonal()
    this.getPlanificacion()
  }



  cancelar(){
    this.abrirFicha=false
    this.api.modalFicha.emit(false)

  }
  getDatosEvaluado(){
    this.datosServidor=JSON.parse(localStorage.getItem('usuario'))
    this.nombreCompleto=this.datosServidor.aPaterno+' '+this.datosServidor.aMaterno+' '+this.datosServidor.nombre
    this.puesto=this.datosServidor.cargo
    this.unidad=this.datosServidor.unidad
    this.codigoServidor=this.datosServidor.codigo
  }
  getDatosEvaluador(){

  }
  getPDF(){
    // Extraemos el
    const DATA = document.getElementById('fichaServidor');
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
      pagesplit: true
    };
    html2canvas(DATA, options).then((canvas) => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var position = 0;
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;

        doc.addPage();
        doc.addImage(img, 'PNG', 15, -280, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      return doc;
    }).then((docResult) => {
      docResult.save(`fichaServidor.pdf`);
    });
  }
  getPersonal(){
    this.api.getPersonal().subscribe(res=>{

      this.personal=res
      this.api.getUGP().subscribe(res=>{
        this.listaUGP=res

        let encargado=this.listaUGP.find(u=>u.nombre==this.unidad)

        let directivo=this.personal.find(p=>p.cod_emp===encargado.id_responsable)

        this.dniEvaluador=directivo.dni
        this.nombreEvaluador=encargado.nombre_responsable
        this.puestoEvaluador=directivo.nombre_crg_fisico
        this.unidadEvaluador=directivo.nombre_unidad
      })
    })
  }
  getPlanificacion(){

    this.api.datosFicha.subscribe(res=>{

      this.listaPlanificada=res

      this.actividad=this.listaPlanificada[0].nomActividad

      this.idProductoA0=this.listaPlanificada[0].idProductoAOActividad

      for (let i=0; i<this.listaPlanificada.length; i++){
        this.idServidorActividad=this.listaPlanificada[i].idActividadServidor
        this.peso=this.peso+this.listaPlanificada[i].peso
      }
      this.listaFinal=[]
      this.api.getProductosPeriodo(this.idServidorActividad).subscribe(res=>{
        this.productosServidor=res.content
        for (let j = 0; j < this.productosServidor.length; j++) {
          this.listaFinal.push({
            actividad: this.productosServidor[j].nomActividad,
            producto: this.productosServidor[j].nomProducto,
            meta: this.sumarPeriodo(this.productosServidor[j].idProAIAct),
            peso: this.productosServidor[j].peso,
            evidencia: this.productosServidor[j].evidencia,
            plazo: this.obtenerPlazo(this.productosServidor[j].idProAIAct),
            tipo: 1
          })
        }
        this.getEquipoAI()

      })
    })

  }
  sumarPeriodo(id){
    let total=0;
    let d=this.productosServidor.find(a=>a.idProAIAct==id)
    for(let i=0; i<d.listaPeriodo.length; i++){
      total=total+d.listaPeriodo[i].peso
    }
    return total
  }
  obtenerPlazo(id){
    let plazo=''
    let d=this.productosServidor.find(a=>a.idProAIAct==id)
    for(let i=0; i<d.listaPeriodo.length; i++){
      plazo=d.listaPeriodo[0].mes+'-'+d.listaPeriodo[i].mes
    }
    return plazo
  }

  valorMeta(){

    let v1=0
    let v2=0
    let v3=0

    for (let i=0; i<this.listaFinal.length; i++){
      if(this.listaFinal[i].tipo==1){
        v1=this.listaFinal[i].peso*this.listaFinal[i].meta
        v2+=v1
      }
      if(this.listaFinal[i].tipo==2){
        v1=this.listaFinal[i].peso*this.listaFinal[i].meta
        v3+=v1
      }

      this.valorMetaFinal=(v2+v3)*0.1

    }


  }
  getEquipoAI(){

    this.api.getEquipoAI({idPlaza: this.codigoServidor}).subscribe(res=>{
      this.listaEquipo=res.content
      for (let i=0; i<this.listaEquipo.length; i++){
        this.listaFinal.push({
          actividad: this.listaEquipo[i].descripcion,
          producto: this.listaEquipo[i].priorizado,
          meta: this.listaEquipo[i].valoracion,
          peso: this.listaEquipo[i].contribucion,
          evidencia: this.listaEquipo[i].medioVerificacion,
          plazo: this.listaEquipo[i].fecInicio+' '+this.listaEquipo[i].fecFin,
          tipo: 2
        })
      }
      this.valorMeta()
    })

  }

}
