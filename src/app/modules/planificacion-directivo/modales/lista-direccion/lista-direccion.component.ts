import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionDirectivoService} from "../../services/planificacion-directivo.service";

@Component({
  selector: 'app-lista-direccion',
  templateUrl: './lista-direccion.component.html',
  styleUrls: ['./lista-direccion.component.css']
})
export class ListaDireccionComponent implements OnInit {
  loading: boolean = true;
  @Input() modalDireccion: boolean;
  listaDireccion: any
  idAE:number
  constructor(private api: PlanificacionDirectivoService) { }
  modalProducto: boolean
  ngOnInit(): void {
    this.loading=false
    this.cargarDireccion()
  }
  cargarDireccion(){
    this.api.datosDireccion.subscribe(res=>{
      this.api.getAEDireccion(res).subscribe(data=>{
        this.listaDireccion=this.numeracion(data.content)

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
    this.modalDireccion=false
    this.api.cerraModalDireccion.emit(false)
  }
  abriModalProducto(id: number){
    this.modalProducto=true
    this.api.cerraModalProducto.subscribe(res=>{
      if(res!=undefined){
        this.modalProducto=res
      }
    })
    this.api.datosProducto.emit(id)
  }
}
