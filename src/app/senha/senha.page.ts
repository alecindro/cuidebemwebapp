import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.page.html',
  styleUrls: ['./senha.page.scss'],
})
export class SenhaPage implements OnInit {

  constructor(private route: Router) {
    console.log("const senha");
   }

  ngOnInit() {
    console.log("senha init");
  }
  config(){
    this.route.navigateByUrl('/configuracoes');
  }
}
