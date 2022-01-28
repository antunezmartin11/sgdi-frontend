import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionDirectivoService} from "../../services/planificacion-directivo.service";

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  loading: boolean = true;
  @Input() modalProductos: boolean;
  listaProductos: any
  idAE:number
  constructor(private api: PlanificacionDirectivoService) { }

  ngOnInit(): void {
    this.loading=false
    this.cargarProductos()
  }

  cargarProductos(){
    this.api.datosProducto.subscribe(res=>{
      this.api.getProductoAE(res).subscribe(data=>{
        this.listaProductos=this.numeracion(data.content)
        console.log(this.listaProductos)
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
    this.modalProductos=false
    this.api.cerraModalProducto.emit(false)
  }
}
