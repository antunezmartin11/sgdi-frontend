import {Component, Input, OnInit} from '@angular/core';
import {PlanificacionDirectivoService} from "../../services/planificacion-directivo.service";
import {MessageService} from "primeng/api";
import {isNull} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-registro-hito',
  templateUrl: './registro-hito.component.html',
  styleUrls: ['./registro-hito.component.css'],
  providers: [MessageService]
})
export class RegistroHitoComponent implements OnInit {

  @Input() estadoHito: boolean;

  datos: any[];
  loading: boolean = true;
  datosDirectivo: any
  listaDirectivo: any = []
  fechaInicio: Date | null
  fechaFin: Date | null
  listaHitoDirectivo: any
  indexDirectivo:any
  directivosAdd:any=[]
  modalDatelleHito: boolean
  constructor(private api: PlanificacionDirectivoService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.datos=[
    ]
    this.loading=false
    this.getDirectivo()
    this.getHitoDirectivo()
  }
  getDirectivo(){
    this.api.getDirectivo().subscribe(res=>{
      this.datosDirectivo=this.numeracion(res)
      for(let i=0; i<this.datosDirectivo.length; i++){
        this.listaDirectivo.push({nombre: this.datosDirectivo[i].nombre,nombre_responsable:this.datosDirectivo[i].nombre_responsable,
          id_responsable: this.datosDirectivo[i].id_responsable,
          estado: false})
      }
      this.listaDirectivo=this.numeracion(this.listaDirectivo)
      console.log(this.listaDirectivo)
    })
  }
  getHitoDirectivo(){
    this.api.getHitoDirectivo(1).subscribe(res=>{
      this.listaHitoDirectivo=this.numeracion(res.content)
    })
  }
  numeracion(data: any) {
    for (let i = 0; i < data.length; i++) {
      data[i].numeracion = i + 1;
    }
    return data;
  }
  cancelar(){
    this.estadoHito=false
    this.api.cerrarModal.emit(false)
  }
  dato(id: number){
    console.log(id)
    this.agregarDirectivo(id)
  }
  guardarHito(){
    if(this.fechaInicio!=null){
      if(this.fechaFin!=null){
        if(this.fechaFin>this.fechaInicio){
            let datoHito={
              idCiclo:1,
              fecInicio: this.fechaInicio,
              fecFin: this.fechaFin,
              tipo: '1'
            }
            this.api.addHitoDirectivo(datoHito).subscribe(res=>{
              if(res.estado){
                this.fechaInicio=null
                this.fechaFin=null

                console.log(res)
                let idH=res.content.idHito
                console.log(idH)
                this.seleccionarDirectivos()
                for(let j=0; j<this.directivosAdd.length; j++){
                  let hitoV={
                    "cod":this.directivosAdd[j].id_responsable,
                    "nomResponsable":this.directivosAdd[j].nombre_responsable,
                    "idHito":idH,
                    "nomUnidad":this.directivosAdd[j].nombre
                  }
                  this.api.addvinculaHito(hitoV).subscribe(res=>{
                    if(j==this.directivosAdd.length-1){
                      this.messageService.add({key: 'mensaje', severity:'success', summary: 'Registrar Hito', detail: 'Registrado Correctamente'});
                    }
                  })
                }
              }else{
                this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registrar Hito', detail: 'No se pudo completar el registro'});
              }
            })
        }else{
          this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registrar Hito', detail: 'La fecha de fin no puede ser previa a la fecha de inicio'});
        }
      }else{

        this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registrar Hito', detail: 'Tiene especificar una fecha de fin'});
      }
    }else{
      this.messageService.add({key: 'mensaje', severity:'error', summary: 'Registrar Hito', detail: 'Tiene que especificar una fecha de inicio'});
    }
  }
  agregarDirectivo(id:number){
    this.indexDirectivo=this.listaDirectivo.findIndex((e: { id_responsable: number; })=>e.id_responsable===id)
    console.log(this.listaDirectivo[this.indexDirectivo])
    this.listaDirectivo[this.indexDirectivo]['estado']=true
    console.log(this.listaDirectivo)
  }
  seleccionarDirectivos(){
    for(let i=0; i<this.listaDirectivo.length; i++){
      if(this.listaDirectivo[i].estado==true){
        this.directivosAdd.push(this.listaDirectivo[i])
      }

    }
    console.log(this.directivosAdd)
  }
  validarNumero(e: any){
    let key = e.key;
    return (key.match(/^[0-9,/,-]+$/)? true:false);
  }
  abrilModalHitoDetalle(id: number){
    this.modalDatelleHito=true
    this.api.datos.emit(id)
    this.api.cerraModalHitoDetalle.subscribe(res=>{
      if(res!=undefined){
        this.modalDatelleHito=res
      }
    })
  }
}
