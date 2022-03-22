import { Component, OnInit } from '@angular/core';
import {InformeAuditoriaService} from "../informes-auditoria/services/informe-auditoria.service";
import {ControlInternoService} from "./service/control-interno.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sistema-control-interno',
  templateUrl: './sistema-control-interno.component.html',
  styleUrls: ['./sistema-control-interno.component.css']
})
export class SistemaControlInternoComponent implements OnInit {
  loading: boolean=false;
  constructor(private api: ControlInternoService,
              public router: Router) { }
  datos: any[];
  ngOnInit(): void {
    this.getProductoPriorizado()
    this.loading=false
  }

    getProductoPriorizado(){
      this.api.getProductoPriorizado().subscribe(res=>{
        this.datos=this.numeracion(res.content)
      })
    }

    numeracion(data: any) {
      for (let i = 0; i < data.length; i++) {
        data[i].numeracion = i + 1;
      }
      return data;
    }
    modificar(data){
      this.api.datosModificar.emit(data)
      localStorage.setItem('datosSCI', JSON.stringify(data))
      this.router.navigate(['../registroProducto']);
    }
  }
