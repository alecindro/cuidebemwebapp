import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
})
export class ConfiguracoesPage implements OnInit {

  constructor(private route: Router) { 
  }

  ngOnInit() {
   }

  alterarSenha(){
    this.route.navigate(['senha']);
  }

  meusdados(){
    this.route.navigate(['usuario']);
  }

  ionViewWillEnter(){
  }

}
