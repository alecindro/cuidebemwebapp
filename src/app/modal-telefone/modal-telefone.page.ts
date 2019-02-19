import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Telefone } from '../models/telefone';

@Component({
  selector: 'app-modal-telefone',
  templateUrl: './modal-telefone.page.html',
  styleUrls: ['./modal-telefone.page.scss'],
})
export class ModalTelefonePage implements OnInit {

  telefone: Telefone;

  constructor(private navParams: NavParams,public modalController: ModalController) { 
    
 
  }

  ngOnInit() {
    this.telefone = this.navParams.get('telefone');
  }

  async closeModal(telefone: Telefone){
    this.modalController.dismiss(telefone);
  }


}
