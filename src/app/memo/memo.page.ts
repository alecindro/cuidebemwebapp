import { Component, OnInit } from '@angular/core';
import { Memorando } from '../models/memorando';
import { MemorandoService } from '../services/memorando-service';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { NavParams, ModalController, Platform, AlertController } from '@ionic/angular';

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
    private alertController: AlertController,
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
        this.memorando.usuario = this.authServerProvider.usuario;
    this.memorandoService.save(this.memorando).subscribe(res => {
      this.memorando = res.body;
      this.modalController.dismiss();
    });
  }

  update(){
    this.memorando.dataalteracao = new Date();
    this.memorando.usuario = this.authServerProvider.usuario;
    this.memorandoService.update(this.memorando).subscribe(res => {
      this.memorando = res.body;
      this.modalController.dismiss();
    });
  }
  fechar(){
    this.modalController.dismiss();
  }
  async delete(){    
    const alert = await this.alertController.create({
      header: 'Excluir',
      message: '<strong>Tem certeza?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confimar',
          handler: () => {
            this.memorandoService.delete(this.memorando.idmemorando).subscribe(res => {
              this.modalController.dismiss();
            }, err => {
              console.log(err);
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
    
  }
  


}
