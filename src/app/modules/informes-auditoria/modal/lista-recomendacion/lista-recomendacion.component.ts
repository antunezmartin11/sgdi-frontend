import {Component, Input, OnInit} from '@angular/core';
import {InformeAuditoriaService} from "../../services/informe-auditoria.service";

@Component({
  selector: 'app-lista-recomendacion',
  templateUrl: './lista-recomendacion.component.html',
  styleUrls: ['./lista-recomendacion.component.css']
})
export class ListaRecomendacionComponent implements OnInit {

  @Input() estado: boolean;
  constructor(private api: InformeAuditoriaService) { }


  listaRecomendacion: any[]
  loading: boolean = true;
  ngOnInit(): void {
    this.listaRecomendacion=[]
    this.loading=false
    this.gerRecomendacion()
  }
  gerRecomendacion(){
    this.api.data.subscribe(res=>{

      this.api.getRecomendacionId(res).subscribe(data=>{
        this.listaRecomendacion=this.numeracion(data.content)
      })
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  cancelar(){
    this.estado=false
    this.api.dataModal.emit(false)
  }
}
