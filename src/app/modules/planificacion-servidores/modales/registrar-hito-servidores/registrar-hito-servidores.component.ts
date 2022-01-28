import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {PlanificacionServidorService} from "../../service/planificacion-servidor.service";

@Component({
  selector: 'app-registrar-hito-servidores',
  templateUrl: './registrar-hito-servidores.component.html',
  styleUrls: ['./registrar-hito-servidores.component.css'],
  providers: [MessageService]
})
export class RegistrarHitoServidoresComponent implements OnInit {

  @Input()estadoHitoS: boolean;

  datos: any[];
  loading: boolean = true;
  fechaInicio: Date | null
  fechaFin: Date | null
  constructor(private messageService: MessageService,
              private api: PlanificacionServidorService) { }

  ngOnInit(): void {
    this.loading=false
  }
  cancelar(){
    this.estadoHitoS=false
    this.api.cerrarModal.emit(false)
  }

  guardarServidor(){
    if(this.fechaInicio!=null){
      if(this.fechaFin!=null){
        if(this.fechaFin>this.fechaInicio){
          console.log('agregar')
        }else {
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro hito para servidores', detail: 'La fecha de fin no puede ser previa a la fecha de inicio'});
        }
      }else{

        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro hito para servidores', detail: 'Tiene que especificar una fecha de fin'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registro hito para servidores', detail: 'Tiene que especificar una fecha de inicio'});
    }
  }
}
