import { Component, OnInit} from '@angular/core';
import { PacienteDTO } from '../models/pacienteDTO';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Evento } from '../models/evento';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { EventoService } from '../services/evento-service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.page.html',
  styleUrls: ['./checkin.page.scss'],
})
export class CheckinPage implements OnInit {

   pacienteDTO:PacienteDTO = new PacienteDTO(); 
   evento:Evento;
   CHECKIN ="Entrou";
   CHECKOUT ="Saiu";
   datahora: string;
   

  constructor(private modalCtrl:ModalController,
     private eventoService: EventoService,
     private navParams: NavParams , 
     private authServerProvider: AuthServerProvider,
     private toastController: ToastController) { }

  ngOnInit() {
    this.pacienteDTO = this.navParams.get("pacienteDTO");
    this.evento = new Evento();
    this.evento.dataevento = new Date();
    this.evento.dataregistro = new Date();
    this.evento.paciente = this.pacienteDTO.paciente;
    this.evento.enabled = true;
    if(this.pacienteDTO.checkin){
      this.evento.grupoevento = this.CHECKIN;
    } else{
      this.evento.grupoevento = this.CHECKOUT;
    }
    this.evento.usuario = this.authServerProvider.usuario;
    this.evento.dataregistro.setHours(this.evento.dataregistro.getHours() - (this.evento.dataregistro.getTimezoneOffset() / 60));
       this.datahora = this.evento.dataregistro.toISOString();
    
  }

  check(){
    let _data = new Date(this.datahora);
    _data.setHours(_data.getHours() + (_data.getTimezoneOffset() / 60));
   this.evento.dataevento = _data;
    this.eventoService.save(this.evento).subscribe(res => {
      this.modalCtrl.dismiss("Registro efetuado com sucesso.");    
    }, err => {
      this.presentToast(err.error);
    })
  }
  fechar(){
    this.pacienteDTO.checkin = !this.pacienteDTO.checkin; 
    this.modalCtrl.dismiss();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
