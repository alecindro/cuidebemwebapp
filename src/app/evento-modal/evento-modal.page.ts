import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Evento } from '../models/evento';
import { EventoRotina } from '../models/eventorotina';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { EventoService } from '../services/evento-service';

@Component({
  selector: 'app-evento-modal',
  templateUrl: './evento-modal.page.html',
  styleUrls: ['./evento-modal.page.scss'],
})
export class EventoModalPage implements OnInit {

  datahora: string;
  evento: Evento;
  grupoSelected: string = "";
  subgrupoSelected: string = "";
  eventorotina: EventoRotina = new EventoRotina();
  subgrupos: any;
  grupoEventos: string[];
  editable:boolean = false;
  deletable:boolean = false;

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private authServerProvider: AuthServerProvider,
    private alertController: AlertController,
    private eventoService: EventoService,
    private toastController: ToastController) { 
      this.evento = this.navParams.get('evento');
      this.editable = this.navParams.get('editable');
      this.deletable = this.navParams.get('deletable');
      
      let _data = new Date();
      if(this.evento.idevento){
         _data = new Date(this.evento.dataregistro);
         if(this.evento.grupoevento){
         this.grupoSelected = this.evento.grupoevento;
         this.subgrupos = this.eventorotina.getRotinas(this.grupoSelected);
         }
         if(this.evento.subgrupoevento){
           this.subgrupoSelected = this.evento.subgrupoevento;
         }
       }
       _data.setHours(_data.getHours() - (_data.getTimezoneOffset() / 60));
       this.datahora = _data.toISOString();
       
     this.grupoEventos = this.eventorotina.getDescricaoEvento();

    }

  ngOnInit() {
  


  }

  selectedGrupo(grupoevento: string) {
    this.grupoSelected = grupoevento;
    this.subgrupoSelected = "";
    this.evento.subgrupoevento = "";
    this.subgrupos = this.eventorotina.getRotinas(grupoevento);
  }

  selectedSubgrupo(subgrupoevento: string) {
    this.subgrupoSelected = subgrupoevento;
    this.evento.peso = null;
    this.evento.descricao = null;
    this.evento.descevento = null;
    this.evento.aspecto = null;
    this.evento.value = null;
    this.evento.quantidade = null;
    this.evento.pressaofinal = null;
    this.evento.pressaoinicial = null;
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
            
          }
        }, {
          text: 'Confimar',
          handler: () => {
            this.eventoService.delete(this.evento).subscribe(res => {
              this.modalController.dismiss("Evento excluído com sucesso.");
            }, err => {
              this.presentToast(err.error);
            });
           
          }
        }
      ]
    });
    await alert.present();
    
  }

  salvar(){
    if(this.evento.idevento){
      this.update();
    }else{
      this.save();
    }
    
  }

  private save(){
    let _data = new Date(this.datahora);
    _data.setHours(_data.getHours() + (_data.getTimezoneOffset() / 60));
   this.evento.dataevento = _data;
    this.evento.dataregistro = _data;
    this.evento.usuario = this.authServerProvider.usuario; 
    this.eventoService.save(this.evento).subscribe(res=>{
      this.modalController.dismiss("Evento registrado com sucesso.");
    }, err =>{
        this.presentToast(err.error);
    })
  }

  private update(){
    let _data = new Date(this.datahora);
    _data.setHours(_data.getHours() + (_data.getTimezoneOffset() / 60));
    this.evento.dataregistro = _data;
    this.evento.usuario = this.authServerProvider.usuario; 
    this.eventoService.update(this.evento).subscribe(res=>{
      this.modalController.dismiss("Evento atualizado com sucesso.");
    }, err =>{
      this.presentToast(err.error);
    })
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
