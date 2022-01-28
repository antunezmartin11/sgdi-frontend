import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionDirectivoService} from "../../services/planificacion-directivo.service";

@Component({
  selector: 'app-detalle-hito',
  templateUrl: './detalle-hito.component.html',
  styleUrls: ['./detalle-hito.component.css']
})
export class DetalleHitoComponent implements OnInit {

  datelleHito: any
  loading: boolean
  idHito: number
  @Input() modalDetalleHito: boolean;
  constructor(private api: PlanificacionDirectivoService) { }

  ngOnInit(): void {
    this.loading=false


  }
  getHitoVinculado(){
    console.log(this.idHito)
    this.api.getHitoVinculado(1, this.idHito).subscribe(res=>{
      console.log(res.content)
      this.datelleHito=this.numeracion(res.content)
    })
  }
  cancelar(){
    this.modalDetalleHito=false
    this.api.cerraModalHitoDetalle.emit(false)
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
}
