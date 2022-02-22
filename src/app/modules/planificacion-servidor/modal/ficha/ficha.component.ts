import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionServidorService} from "../../../planificacion-servidores/service/planificacion-servidor.service";
import {PlanificacionServidoresService} from "../../service/planificacion-servidores.service";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  @Input() abrirFicha: boolean = false
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

    console.log(this.datosServidor)
    console.log(this.nombreCompleto)
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
    this.api.getPersonal().subscribe(res=>{
      this.personal=res
      this.api.getUGP().subscribe(res=>{
        this.listaUGP=res

        let encargado=this.listaUGP.find(u=>u.nombre==this.unidad)

        let directivo=this.personal.find(p=>p.cod_emp===encargado.id_responsable)
        this.dniEvaluador=directivo.dni
        this.nombreEvaluador=encargado.nombre_responsable
        this.puestoEvaluador=encargado.cargo
        this.unidadEvaluador=directivo.nombre_crg_fisico
      })
    })
  }
  getPlanificacion(){
    this.api.datosFicha.subscribe(res=>{
      this.listaPlanificada=res
      this.actividad=this.listaPlanificada[0].nomActividad
      console.log(this.listaPlanificada)
      this.idProductoA0=this.listaPlanificada[0].idProductoAOActividad
      console.log(this.idProductoA0)
      for (let i=0; i<this.listaPlanificada.length; i++){
        this.peso=this.peso+this.listaPlanificada[i].peso
      }

      this.getPeriodo()
    })

  }
  getPeriodo(){
    this.api.getPeriodo(this.idProductoA0).subscribe(res=>{
        for(let i=0; i<res.content.length; i++){
          this.meta=this.meta+res.content[i].peso
         this.plazo=this.plazo+' '+res.content[i].mes
        }
      this.formula()

    })

  }
  formula(){
    console.log(this.meta)
    console.log(this.peso)
    this.peso=this.peso
    this.valorFormulaPEI=(this.meta*this.peso*0.7)
    console.log(this.valorFormulaPEI)
  }
}
