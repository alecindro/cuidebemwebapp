import { Component, OnInit } from '@angular/core';
import { Memorando } from '../models/memorando';
import { MemorandoService } from '../services/memorando-service';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { NavParams, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.page.html',
  styleUrls: ['./memo.page.scss'],
})
export class MemoPage implements OnInit {

  memorando: Memorando;
  editable: boolean;
  rows: number;

  constructor(private memorandoService: MemorandoService, 
    private navParams: NavParams,public modalController: ModalController,
    private authServerProvider: AuthServerProvider,
    private platform: Platform) { }

  ngOnInit() {
    this.memorando = this.navParams.get('memorando');
    this.editable = this.navParams.get('editable');
    console.log("Editable "+ this.editable);
    this.changeRows();
    this.platform.resize.subscribe(x => 
      {
     this.changeRows();
      });
  }
  ionViewWillEnter(){
    this.ngOnInit();
  }

  changeRows(){
    this.rows = 10;
    if(this.platform.isLandscape()){
      this.rows = 5;
    }
  }

  commit(){
    if(this.memorando.idmemorando){
      this.update();
    }else{
      this.salvar();
    }
    
  }

  salvar(){
    this.memorando.dataregistro = new Date();
     /* this.authServerProvider.getUsuario().subscribe(usuario =>{
        this.memorando.usuario = usuario;
      });*/ 
    this.memorandoService.save(this.memorando).subscribe(res => {
      this.memorando = res.body;
      this.modalController.dismiss();
    });
  }

  update(){
    this.memorando.dataalteracao = new Date();
   /* this.authServerProvider.getUsuario().subscribe(usuario =>{
      this.memorando.usuario = usuario;
    });*/  
    this.memorandoService.update(this.memorando).subscribe(res => {
      this.memorando = res.body;
      this.modalController.dismiss();
    });
  }
  fechar(){
    this.modalController.dismiss();
  }
  delete(){
    console.log('delete');
  }

}
