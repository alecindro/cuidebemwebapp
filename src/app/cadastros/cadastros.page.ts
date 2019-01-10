import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.page.html',
  styleUrls: ['./cadastros.page.scss'],
})
export class CadastrosPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  pacientes(){
    this.route.navigate(['pacientes']);
  }
  responsaveis(){
    this.route.navigate(['responsaveis']);
  }
  agendas(){
    this.route.navigate(['agendas']);
  }
  usuarios(){
    this.route.navigate(['usuarios']);
  }

}
