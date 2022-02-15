import { Component, OnInit } from '@angular/core';
import {AccionIniciativaService} from "../accion-iniciativa/services/accion-iniciativa.service";
import {ValoracionService} from "./service/valoracion.service";

@Component({
  selector: 'app-accio-iniciativa-valoracion',
  templateUrl: './accio-iniciativa-valoracion.component.html',
  styleUrls: ['./accio-iniciativa-valoracion.component.css']
})
export class AccioIniciativaValoracionComponent implements OnInit {

  listaAccion: any=[]
  loading: boolean
  modalCompletarRegistro:boolean
  modalAgregar: boolean
  modalConformacionEquipo: boolean
  modalValoracion: boolean
  constructor(private api: AccionIniciativaService,
              private apiValoracion: ValoracionService) { }

  ngOnInit(): void {
    this.loading=false
    this.getAccionIniciativa()
  }


  getAccionIniciativa(){
    this.api.getAccionIniciativa().subscribe(res=>{
      console.log(res)
      this.listaAccion=this.numeracion(res.content)
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  abrirModalValoracion(datos){
    this.modalValoracion=true
    this.apiValoracion.datos.emit(datos)
    this.apiValoracion.cerrarModalValoracion.subscribe(res=>{
      if(res!=undefined){
        this.modalValoracion=res
      }
    })
  }

}
