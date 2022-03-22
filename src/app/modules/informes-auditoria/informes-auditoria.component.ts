import {Component, Input, OnInit, Output} from '@angular/core';
import {InformeAuditoriaService} from "./services/informe-auditoria.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {stringify} from "querystring";

@Component({
  selector: 'app-informes-auditoria',
  templateUrl: './informes-auditoria.component.html',
  styleUrls: ['./informes-auditoria.component.css'],

})
export class InformesAuditoriaComponent implements OnInit {



  datos: any[];
  loading: boolean = true;
  constructor(private api: InformeAuditoriaService,  private location: Location) { }
  modalRegistro: boolean;
  modalRecomendacion: boolean;
  ngOnInit(): void {
    this.getListaInformes()

    this.loading=false

  }
  abrirModalRegistro(){
    this.modalRegistro=true

  }
  getListaInformes(){
    this.api.listarInformes().subscribe(res=>{

      this.datos=this.numeracion(res.content)
    })
  }
  getRecomendaciones(id: any){

    this.modalRecomendacion=true
    this.api.data.emit(id)
    this.api.dataModal.subscribe(data=>{
      if(data!=undefined){
        this.modalRecomendacion=data
      }
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  modificar(datos){
    window.location.href='../registroInforme'
    localStorage.setItem('datos',JSON.stringify(datos))
  }
}
