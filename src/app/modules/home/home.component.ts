import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  estadoLogin: boolean
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.getUsuario()
  }
  getUsuario(){
    let usu=localStorage.getItem('usuario')
    if(usu!=undefined){
      this.estadoLogin=true
    }else{
     this.router.navigate(['login'])
    }
  }
}
