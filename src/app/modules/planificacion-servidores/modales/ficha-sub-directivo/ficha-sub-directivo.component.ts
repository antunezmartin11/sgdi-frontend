import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionServidoresService} from "../../../planificacion-servidor/service/planificacion-servidores.service";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {PlanificacionServidorService} from "../../service/planificacion-servidor.service";
import {CONSTRUCTOR} from "@angular/compiler-cli/ngcc/src/host/esm2015_host";
@Component({
  selector: 'app-ficha-sub-directivo',
  templateUrl: './ficha-sub-directivo.component.html',
  styleUrls: ['./ficha-sub-directivo.component.css']
})
export class FichaSubDirectivoComponent implements OnInit {

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
  listaDireccion: any
  dependenciaEvaluador: any=[]
  idresponsable: any
  listaActividad: any []
  idAO:number
  listaProducto:any
  listaGenerada: any
  listaAE:any
  listaFinal: any =[]
  listaAESeleccionada:any
  listaAO: any=[]
  lista_ae: any=[]
  listaPlazos: any=[]
  constructor(private api: PlanificacionServidorService) { }

  ngOnInit(): void {

    this.getDatosEvaluado()
    this.getPersonal()
    this.getPlanificacion()
    this.cargarDireccion()
    this.getActividadOperativa()
    this.getProductoSubDirectivo()
  }

  cancelar(){
    this.abrirFicha=false
    this.api.modalFichaSubdirectivo.emit(false)
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

        doc.addPage();
        doc.addImage(img, 'PNG', 15, -280, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      return doc;
    }).then((docResult) => {
      docResult.save(`ficha-SubDirectivo.pdf`);
    });
  }
  getPersonal(){
    let datoPersona=JSON.parse(localStorage.getItem('usuario'))
    this.api.getPersonal().subscribe(res=>{
      this.personal=res
      let datos=this.personal.find(p=>p.cod_emp==this.idresponsable)

      this.dniEvaluador=datos.dni
      this.nombreEvaluador=datos.a_paterno+' '+datos.a_materno+' '+datos.nom_emp
      this.puestoEvaluador=datos.nombre_crg_fisico
      this.unidadEvaluador=datos.nombre_dependencia
    })
  }
  getPlanificacion(){
    this.api.modalDatosSubdirectivo.subscribe(res=>{
      this.listaPlanificada=res
      this.actividad=this.listaPlanificada[0].nomActividad

      this.idProductoA0=this.listaPlanificada[0].idProductoAOActividad

      for (let i=0; i<this.listaPlanificada.length; i++){
        this.peso=this.peso+this.listaPlanificada[i].peso
      }


    })

  }

  formula(){
    this.peso=this.peso
    this.valorFormulaPEI=(this.meta*this.peso*0.7)

  }

  cargarDireccion(){
    this.api.getDireccion().subscribe(res=>{
      this.listaDireccion=res
      let dato=JSON.parse(localStorage.getItem('usuario'))
      this.dependenciaEvaluador=this.listaDireccion.find(d=>d.nombre==dato.dependencia)
      this.idresponsable=this.dependenciaEvaluador.id_responsable
      let organoResponsable=this.listaDireccion.find(a=>a.nombre==dato.dependencia)
      this.obtenerAO(organoResponsable)
    })

  }
  getActividadOperativa(){
    let dato=JSON.parse(localStorage.getItem('usuario'))

    this.api.getAOXunidad(dato.unidad).subscribe(res=>{

      this.listaActividad=res.content
      this.getProductoAO()
    })

  }
  getProductoAO(){
    for(let i=0; i<this.listaActividad.length; i++){
      this.api.getProductoAOUnidad(this.listaActividad[i].idAOUnidad).subscribe(res=>{
        this.listaProducto=res.content

      })
    }


  }
  getProductoSubDirectivo(){
    this.datosServidor=JSON.parse(localStorage.getItem('usuario'))
    this.unidad=this.datosServidor.unidad
    this.api.getProductos({nombreUnidad:this.unidad}).subscribe(res=>{

      this.listaGenerada=res.content

    })
  }
  obtenerAO(dato){

    this.api.getCEPLAN(dato.id,2022).subscribe(res=>{
      this.listaAE=res[0].lista_ae
      console.log(this.listaAE)
      console.log(this.listaGenerada)
      for(let i=0; i<this.listaGenerada.length; i++){
        this.lista_ae=this.listaAE.find(a=>a.nombre==this.listaGenerada[i].nombreAE)

        if(this.lista_ae!=undefined){
          this.listaAO=this.lista_ae.lista_ao
          let ao=this.listaAO.find(a=>a.nombre=this.listaGenerada[i].nombreActividadOperativa)
          this.listaPlazos=ao.lista_periodo
          let mes=''
          for(let j=0; j<this.listaPlazos.length; j++){
            if(this.listaPlazos[i].meta_fisica>0){
              switch (j){
                case 0:
                    mes+='ENERO'
                  break;
                case 1:
                    mes+=' FEBRERO'
                  break;
                case 2:
                    mes+=' MARZO'
                  break;
                case 3:
                    mes+=' ABRIL'
                  break;
                case 4:
                    mes+=' MAYO'
                  break;
                case 5:
                    mes+=' JUNIO'
                  break;
                case 6:
                    mes+=' JULIO'
                  break;
                case 7:
                    mes+=' AGOSTO'
                  break;
                case 8:
                    mes+=' SETIEMBRE'
                  break;
                case 9:
                    mes+=' OCTUBRE'
                  break;
                case 10:
                    mes+=' NOVIEMBRE'
                  break;
                case 11:
                    mes+=' DICIEMBRE'
                  break;
              }
            }
          }
          console.log(mes)
          this.listaFinal.push({nombreAO: this.listaGenerada[i].nombreActividadOperativa,
           nombreProducto: this.listaGenerada[i].nombreProducto, meta: ao.meta_fisica,
             peso:this.listaGenerada[i].peso, evidencia: this.listaGenerada[i].evidencia, plazo: mes})
        }

      }
      console.log(this.listaPlazos)
      console.log(this.listaFinal)
    })
  }
}
