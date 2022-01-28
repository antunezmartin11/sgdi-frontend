import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-menu-planificacion',
  templateUrl: './menu-planificacion.component.html',
  styleUrls: ['./menu-planificacion.component.css'],
  providers:[HomeComponent]
})
export class MenuPlanificacionComponent implements OnInit {

  constructor(private app: HomeComponent) { }
  @ViewChild('contenido') element: ElementRef;
  ngOnInit(): void {
  this.app.getUsuario()
  }


}
