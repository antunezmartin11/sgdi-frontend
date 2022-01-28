import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionSubDirectivosService} from "../../service/planificacion-sub-directivos.service";

@Component({
  selector: 'app-lista-productos-ao',
  templateUrl: './lista-productos-ao.component.html',
  styleUrls: ['./lista-productos-ao.component.css']
})
export class ListaProductosAOComponent implements OnInit {
  loading: boolean = true;
  @Input() modalProductosAO: boolean;
  listaProductos: any

  constructor(private api: PlanificacionSubDirectivosService) { }

  ngOnInit(): void {
    this.loading=false
    this.cargarProductos()
  }
  cargarProductos(){
    this.api.datos.subscribe(res=>{
      this.api.gerProductoAO(res).subscribe(data=>{
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
    this.modalProductosAO=false
    this.api.cerrarModal.emit(false)
  }
}
