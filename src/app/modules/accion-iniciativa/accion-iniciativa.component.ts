import { Component, OnInit } from '@angular/core';
import {AccionIniciativaService} from "./services/accion-iniciativa.service";

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
}
