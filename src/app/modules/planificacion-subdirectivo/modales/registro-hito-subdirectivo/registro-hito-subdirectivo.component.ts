import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionSubDirectivosService} from "../../service/planificacion-sub-directivos.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-registro-hito-subdirectivo',
  templateUrl: './registro-hito-subdirectivo.component.html',
  styleUrls: ['./registro-hito-subdirectivo.component.css'],
  providers: [MessageService]
})
export class RegistroHitoSubdirectivoComponent implements OnInit {
  @Input() estadoHitoSub: boolean;

  datos: any[];
  loading: boolean = true;
  fechaInicio: Date | null
  fechaFin: Date | null
  constructor(private api: PlanificacionSubDirectivosService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.datos=[

    ]
    this.loading=false

  }
  guardarHitoSubDirectivo(){
    if(this.fechaInicio!=null){
      if(this.fechaFin!=null){
        if(this.fechaFin>this.fechaInicio){
            console.log('agrega')
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de hito para sub directivos', detail: 'La fecha de fin no puede ser previa a la fecha de inicio'})
        }
      }else{
        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de hito para sub directivos', detail: 'Tiene que especificar una fecha de fin'})
      }
    }else {
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro de hito para sub directivos', detail: 'Tiene que especificar una fecha de inicio'});
    }
  }

  cancelar(){
    this.estadoHitoSub=false
    this.api.cerrarModal.emit(false)
  }


}
