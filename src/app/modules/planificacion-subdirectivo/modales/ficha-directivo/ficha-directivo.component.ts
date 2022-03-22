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
  valorMetaFinal: number
  listarPersonal: any =[]
  listaDireccion: any
  dependenciaEvaluador: any=[]
  idresponsable: any
  listaActividad: any []
  idAO:number
  listaProducto:any
  personalE: any=[]
  listaFinal: any=[]
  codigoDirectivo:string
  listaEquipo:any=[]
  constructor(private api: PlanificacionSubDirectivosService) { }

  ngOnInit(): void {
    this.getDatosEvaluado()
    this.getPersonal()
    this.cargarDireccion()
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
    this.codigoDirectivo=this.datosServidor.codigo
    this.getProductosAE()

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
      docResult.save(`ficha-Directivo.pdf`);
    });
  }
  getPersonal(){

    this.api.getPersonal().subscribe(res=>{
      this.personal=res
      let datos=this.personal.find(p=>p.cod_emp==this.idresponsable)
      this.dniEvaluador=datos.dni
      this.unidadEvaluador=datos.nombre_dependencia
    })
  }

  formula(){
    this.peso=this.peso
    this.valorFormulaPEI=(this.meta*this.peso*0.7)

  }

  cargarDireccion(){
    this.api.getListarDirecciones().subscribe(res=>{
      this.listaDireccion=res
      let dato=JSON.parse(localStorage.getItem('usuario'))
      this.dependenciaEvaluador=this.listaDireccion.find(d=>d.nombre=="GERENCIA GENERAL")
      this.idresponsable=this.dependenciaEvaluador.id_responsable
      this.nombreEvaluador=this.dependenciaEvaluador.nombre_responsable
      this.getPersonal()
    })
  }

  getProductosAE() {
    let sum = 0
    this.api.getProductoAE({nombreDireccion: this.unidad}).subscribe(res => {
      this.listaProducto = res.content
      for (let i = 0; i < this.listaProducto.length; i++) {
        this.getPeriodoAE(this.listaProducto[i].idAEDireccion,
          this.listaProducto[i].nombreAE, this.listaProducto[i].producto,
          this.listaProducto[i].pesoAE, this.listaProducto[i].medioVerificacion)
      }
      this.getEquipoAI()
    })
  }
  getPeriodoAE(id:number, ae, producto,peso,medio){
    let suma=0;
    this.api.getPeriodoAE(id).subscribe(res=>{
      for(let j=0; j<res.content.length; j++){
        suma+=res.content[j].peso
      }
      this.listaFinal.push({actividad:ae,
        producto:producto,
        peso:peso,
        meta:suma,
        evidencia:medio,
        plazo:'',
        tipo:1})

    })

  }
  getEquipoAI(){

    this.api.getEquipoAI({idPlaza: this.codigoDirectivo}).subscribe(res=>{
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
  valorMeta() {


    let v1 = 0
    let v2 = 0
    let v3 = 0
    for (let i = 0; i < this.listaFinal.length; i++) {
      if (this.listaFinal[i].tipo == 1) {
        v1 = this.listaFinal[i].peso * this.listaFinal[i].meta
        v2 += v1
      }
      if (this.listaFinal[i].tipo == 2) {
        v1 = this.listaFinal[i].peso * this.listaFinal[i].meta
        v3 += v1
      }
      this.valorMetaFinal = (v2 + v3) * 0.1

    }
  }
}
