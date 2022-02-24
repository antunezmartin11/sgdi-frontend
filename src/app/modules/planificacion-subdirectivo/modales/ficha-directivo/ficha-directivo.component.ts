import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionServidorService} from "../../../planificacion-servidores/service/planificacion-servidor.service";
import html2canvas from "html2canvas";

import jsPDF from 'jspdf';
import {PlanificacionSubDirectivosService} from "../../service/planificacion-sub-directivos.service";

@Component({
  selector: 'app-ficha-directivo',
  templateUrl: './ficha-directivo.component.html',
  styleUrls: ['./ficha-directivo.component.css']
})
export class FichaDirectivoComponent implements OnInit {

  @Input() abrirFichaDirectivo: boolean = false
  datosServidor: any
  nombreCompleto: string
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
  valorMeta: number
  listaDireccion: any
  dependenciaEvaluador: any=[]
  idresponsable: any
  listaActividad: any []
  idAO:number
  listaProducto:any
  constructor(private api: PlanificacionSubDirectivosService) { }

  ngOnInit(): void {

    this.getDatosEvaluado()
    this.getPersonal()/*
    this.getPlanificacion()
    this.cargarDireccion()
    this.getActividadOperativa()*/
  }


  cancelar(){
    this.abrirFichaDirectivo=false
    this.api.modalFichaDirectivo.emit(false)
  }
  getDatosEvaluado(){
    this.datosServidor=JSON.parse(localStorage.getItem('usuario'))
    this.nombreCompleto=this.datosServidor.aPaterno+' '+this.datosServidor.aMaterno+' '+this.datosServidor.nombre
    this.puesto=this.datosServidor.cargo
    this.unidad=this.datosServidor.unidad


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
        console.log(position)
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
    let datoPersona=JSON.parse(localStorage.getItem('usuario'))
    this.api.getPersonal().subscribe(res=>{
      this.personal=res
      let datos=this.personal.find(p=>p.cod_emp==this.idresponsable)
      console.log(datos)
      this.dniEvaluador=datos.dni
      this.nombreEvaluador=datos.a_paterno+' '+datos.a_materno+' '+datos.nom_emp
      this.puestoEvaluador=datos.nombre_crg_fisico
      this.unidadEvaluador=datos.nombre_dependencia
    })
  }
  /*getPlanificacion(){
    this.api.modalDatosSubdirectivo.subscribe(res=>{
      this.listaPlanificada=res
      this.actividad=this.listaPlanificada[0].nomActividad
      console.log(this.listaPlanificada)
      this.idProductoA0=this.listaPlanificada[0].idProductoAOActividad
      console.log(this.idProductoA0)
      for (let i=0; i<this.listaPlanificada.length; i++){
        this.peso=this.peso+this.listaPlanificada[i].peso
      }


    })

  }*/

  formula(){
    this.peso=this.peso
    this.valorFormulaPEI=(this.meta*this.peso*0.7)

  }

  /*cargarDireccion(){
    this.api.getDireccion().subscribe(res=>{
      this.listaDireccion=res
      let dato=JSON.parse(localStorage.getItem('usuario'))
      this.dependenciaEvaluador=this.listaDireccion.find(d=>d.nombre==dato.dependencia)
      this.idresponsable=this.dependenciaEvaluador.id_responsable

    })

  }*/
  /*
  getActividadOperativa(){
    let dato=JSON.parse(localStorage.getItem('usuario'))

    this.api.getAOXunidad(dato.unidad).subscribe(res=>{

      this.listaActividad=res.content
      console.log(this.listaActividad)
      this.getProductoAO()
    })

  }*/
  /*
  getProductoAO(){
    for(let i=0; i<this.listaActividad.length; i++){
      this.api.getProductoAOUnidad(this.listaActividad[i].idAOUnidad).subscribe(res=>{
        this.listaProducto=res.content

      })
    }


  }*/
}
