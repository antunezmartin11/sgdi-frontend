import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {ValoracionService} from "../../service/valoracion.service";
import {AccioIniciativaValoracionComponent} from "../../accio-iniciativa-valoracion.component";

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css'],
  providers: [MessageService]
})
export class ValoracionComponent implements OnInit {

  impacto: number = 0
  complejidad: number=0
  valoracion: number=0
  val:any
  datos: any
  @Input() modalValoracion: boolean = false
  valoracionthis: any;
  constructor(private messageService: MessageService,
              private api: ValoracionService,
              private accion: AccioIniciativaValoracionComponent) { }

  ngOnInit(): void {
    this.getDatos()
  }
  getDatos(){
    this.api.datos.subscribe(res=>{
      this.datos=res

    })

  }
  cancelar(){
    this.modalValoracion=false
    this.api.cerrarModalValoracion.emit(false)
    this.complejidad=0
    this.impacto=0
    this.valoracion=0
    this.val=null

  }

  guardarValoracion(){
    if(this.impacto>0){
      if(this.complejidad>0){
        if(this.valoracion!=0){
          let datos={
            "impacto":this.impacto,
            "complejidad":this.complejidad,
            "valoracion":this.valoracion,
            "idAccionIniciativa":this.datos.idAccionIniciativa
          }
          this.api.addValoracion(datos).subscribe(res=>{
            if(res.estado){
              this.api.updateAccion(this.datos.idAccionIniciativa).subscribe(res=>{

              })
              this.messageService.add({key: 'mensaje', severity:'success', summary: 'Error en el proceso', detail: 'Valoración Registrada'});
              this.cancelar()

            }

          })

        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Error en el proceso', detail: 'No se complete la información requerida'});
        }
      }else {
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Error en el proceso', detail: 'Tiene que ingresar una complejidad a la acción o iniciativa'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Error en el proceso', detail: 'Tiene que ingresar un impacto a la acción o iniciativa'});
    }
  }
  calcular(){
    this.valoracion=this.impacto*this.complejidad
    this.val=this.valoracion.toFixed(2)
  }
}
