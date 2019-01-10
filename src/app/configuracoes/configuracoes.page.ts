import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  constructor(private route: Router) { 
    console.log("const config");
  }

  ngOnInit() {
    console.log("init config");
  }

  alterarSenha(){
    this.route.navigate(['senha']);
  }

  meusdados(){
    this.route.navigate(['usuario']);
  }

  ionViewWillEnter(){
    console.log("ionView config");
  }

}
