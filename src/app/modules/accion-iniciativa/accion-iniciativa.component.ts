import { Component, OnInit } from '@angular/core';
import {AccionIniciativaService} from "./services/accion-iniciativa.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-accion-iniciativa',
  templateUrl: './accion-iniciativa.component.html',
  styleUrls: ['./accion-iniciativa.component.css']
})
export class AccionIniciativaComponent implements OnInit {

  listaAccion: any=[]
  loading: boolean
  modalCompletarRegistro:boolean
  modalAgregar: boolean
  modalConformacionEquipo: boolean
  constructor(private api: AccionIniciativaService) { }

  ngOnInit(): void {
    this.loading=false
    this.getAccionIniciativa()
  }

  abrilModalCompletarRegistro(dato){
      this.modalCompletarRegistro=true
      this.api.cerrarModalCompletarRegistro.subscribe(res=>{
        if(res!=undefined){
          this.modalCompletarRegistro=res
        }
      })
    this.api.datos.emit(dato)
  }
  abrilModalRegistro(){
    this.modalAgregar=true
    this.api.cerrarModal.subscribe(res=>{
      if(res!=undefined){
        this.modalAgregar=res
      }
    })
  }
  abrirModalEquipos(datos){
    this.modalConformacionEquipo=true
    this.api.datos.emit(datos)
    this.api.cerrarModal.subscribe(res=>{
      if(res!=undefined){
        this.modalConformacionEquipo=res
      }
    })
  }
  getAccionIniciativa(){
    this.api.getAccionIniciativa().subscribe(res=>{

      this.listaAccion=this.numeracion(res.content)

    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  generarInventario(){
    var docDefinition = {
      pageOrientation: 'landscape',
      header: {

        columns: [
          {
            text: 'Inventario y valoración de acciones e iniciativas de mejora',
            alignment: 'center',
            fontSize:15,
            color: '#5477c8'
          }
        ]
      },

      footer: {
        columns: [
          'Left part',
          { text: 'Right part', alignment: 'right' }
        ]
      },

      content: [ {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: [10,50, 100,50, 50,30,50,50,50,50,50,50,50],
          headerRows: 4,
          // keepWithHeaderRows: 1,
          body: [
            //Primera Fila de cabecera
            [{text:'Origen',style: 'tableHeader', alignment: 'center',colSpan: 2, rowSpan: 4},{text: 'Origen', },
              {text: 'Proceso Asociado en el inventario de procesos', rowSpan:4, style: 'tableHeader', alignment: 'center'},
              {text: 'Naturaleza', style: 'tableHeader',alignment: 'center',  colSpan: 2,}, {},
              {text: 'Inventario y Valoración', style: 'tableHeader', colSpan: 8, alignment: 'center'}, {},{},{},{},{},{},{}],
            //Segunda Fila de cabacera
            ['','', '', {text: 'Obligatorio', style: 'tableHeader', alignment: 'center', rowSpan: 3},
              {text: 'Voluntario',style: 'tableHeader', alignment: 'center',rowSpan: 3},
              {text: 'Acciónes de Mejora',style: 'tableHeader', alignment: 'center', colSpan: 4},'','','',
              {text: 'Iniciativas de mejora',style: 'tableHeader',alignment: 'center', colSpan: 4},'','',''],
            //Tercera Fila de cabecera
            ['','', '', '','',{text: 'Denominación',style: 'tableHeader', alignment: 'center', rowSpan: 2},{text: 'Valoración', colSpan: 3, style: 'tableHeader', alignment: 'center'},
              '','', {text: 'Denominación', style: 'tableHeader', alignment: 'center', rowSpan: 2},{text: 'Valoración', colSpan: 3, style: 'tableHeader', alignment: 'center'},'',''],
            //Cuarta
            ['','','','','','',{text: 'Impacto', style: 'tableHeader', alignment: 'center'},
              {text: 'Complejidad', style: 'tableHeader', alignment: 'center'},
              {text: 'Total', style: 'tableHeader', alignment: 'center'},'',
              {text: 'Impacto', style: 'tableHeader', alignment: 'center'},{text: 'Complejidad', style: 'tableHeader', alignment: 'center'},
              {text: 'Total',style: 'tableHeader', alignment: 'center'}],
            [{rowSpan: 5, text: '1', alignment: 'center'},
              {rowSpan: 5, text: 'Prioridad de politica/Disposición Normativa'},
              '1.1. Internacional', 'Sample value 3','','','','','','','','',''],
              ['','',{text: '1.2. Multisectorial'},'','','','','','','','','',''],
              ['','',{text: '1.3. Sectorial'},'','','','','','','','','',''],
              ['','',{text: '1.4. Intergubernamental'},'','','','','','','','','',''],
              ['','',{text: '1.5. Insitucional'},'','','','','','','','','',''],

              [2,{text: 'Sistema de Control Interno'},'','','','','','','','','','',''],
              [3,{text: 'Organos de sistema de control'},'','','','','','','','','','',''],
              [4,{text: 'Etapa de evaluacion del sistema GDR'},'','','','','','','','','','','']




          ]
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex <=3) ? '#d6dce4' : null;
          }
        }
      }],
      styles: {

        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: '#6b84a9',
          backgroundColor:'red'
        }
      },

    };
    pdfMake.createPdf(docDefinition).download();
  }
}
