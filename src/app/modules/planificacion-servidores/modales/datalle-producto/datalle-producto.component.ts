import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionSubDirectivosService} from "../../../planificacion-subdirectivo/service/planificacion-sub-directivos.service";
import {PlanificacionServidorService} from "../../service/planificacion-servidor.service";

@Component({
  selector: 'app-datalle-producto',
  templateUrl: './datalle-producto.component.html',
  styleUrls: ['./datalle-producto.component.css']
})
export class DatalleProductoComponent implements OnInit {
  loading: boolean = true;
  @Input() modalProductos: boolean;
  listaProductos: any

  constructor(private api: PlanificacionServidorService) { }

  ngOnInit(): void {
    this.loading=false
    this.cargarProductos()
  }
  cargarProductos(){
    this.api.datoProducto.subscribe(res=>{
      this.api.listarProductoServidor(res).subscribe(data=>{
        this.listaProductos=this.numeracion(data.content)
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
    this.api.modalProducto.emit(false)
  }

}
