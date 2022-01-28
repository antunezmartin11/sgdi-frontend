import {Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {CicloService} from "./services/ciclo.service";
import {MessageService} from 'primeng/api';
import {Respuesta} from "../../modelos/respuesta";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-aperturar-ciclo',
  templateUrl: './aperturar-ciclo.component.html',
  styleUrls: ['./aperturar-ciclo.component.css'],
  providers: [MessageService]
})
export class AperturarCicloComponent implements OnInit {



  fechaInicial:Date;
  fechaFin: Date;
  datos:any[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  listaCiclo: Respuesta<any>[]=[];
  listaC: any=[];
  @ViewChild('dt1') table : Table;
  constructor(private api: CicloService,
              private messageService: MessageService) {

  }

  ngOnInit() {
    this.listarCiclo()

    this.loading=false

  }
  listarCiclo(){
    this.api.listarCiclo().subscribe(res=>{
      this.listaCiclo=res.content
      this.listaC=this.numeracion(this.listaCiclo)
      console.log(this.listaC)

    });
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  agregarCiclo(){
    if(this.fechaInicial==null || this.fechaInicial==undefined){
      this.messageService.add({key: 'mensaje', severity:'warn', summary: 'No se completo el registro', detail: 'No se selecciono la fecha inicial'});
    }else{
      if (this.fechaFin==null || this.fechaFin==undefined){
        this.messageService.add({key: 'mensaje', severity:'warn', summary: 'No se completo el registro', detail: 'No se selecciono la fecha de cierre'});
      }else{
        if(this.fechaFin<this.fechaInicial){
          this.messageService.add({key: 'mensaje', severity:'warn', summary: 'No se completo el registro', detail: 'La fecha de cierre tiene que ser posterior a la fecha de inicio'});
        }else{
          let ciclo={
            fecInicio:this.fechaInicial,
            fecFin: this.fechaFin,
            usuarioReg: 'DEV',
            fecMod:'',
            usuMod: ''
          }
          this.api.addCiclo(ciclo).subscribe(res=>{
            this.messageService.add({key: 'mensaje', severity:'success', summary: 'No se completo el registro', detail: 'Se registro el ciclo de Desemepeño Institucional'});
            this.listarCiclo()
            }, error=>
              console.log(error())
          );
        }

      }

    }



  }




}
