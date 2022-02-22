import { Component, OnInit } from '@angular/core';
import {AccionIniciativaService} from "../../services/accion-iniciativa.service";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor(private api: AccionIniciativaService) { }
  listaAccion: any=[]
  listaAuditoria: any=[]
  listaProductosPriorizados: any=[]
  ngOnInit(): void {
    this.getLista()
  }
  getLista(){
    this.api.getAccionIniciativa().subscribe(res=>{
      this.listaAccion=res.content
      for(let i=0; i<this.listaAccion.length; i++){
        if(this.listaAccion[i].idProductoPriorizado!=null){
          this.listaProductosPriorizados.push(this.listaAccion[i])
        }
        if(this.listaAccion[i].idInformeAuditoria!=null){
          this.listaAuditoria.push(this.listaAccion[i])
        }
      }
      console.log(this.listaAuditoria)
      console.log(this.listaProductosPriorizados)
    })
  }
  getPDF(){
    // Extraemos el
    const DATA = document.getElementById('htmlData');
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
      docResult.save(`Inventario-Acciones-Iniciativas.pdf`);
    });
  }
}
