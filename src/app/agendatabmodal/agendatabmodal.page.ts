import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { Agenda } from '../models/agenda';
import { Evento } from '../models/evento';
import { Paciente } from '../models/paciente';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { EventoRotina } from '../models/eventorotina';
import { EventoService } from '../services/evento-service';

@Component({
  selector: 'app-agendatabmodal',
  templateUrl: './agendatabmodal.page.html',
  styleUrls: ['./agendatabmodal.page.scss'],
})
export class AgendatabmodalPage implements OnInit {

  agenda: Agenda;
  evento: Evento;
  datahora: string;
  eventorotina = new EventoRotina();
  grupoEventos: string[];

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private authServerProvider: AuthServerProvider,
    private eventoService: EventoService,
    private toastController: ToastController) { 
      this.agenda = this.navParams.get('agenda');
      
      let pacientedto = this.navParams.get('pacientedto');
      this.evento = new Evento();
      this.evento.grupoevento = this.agenda.grupoEvento;
      this.evento.subgrupoevento = this.agenda.subGrupoEvento;
      this.evento.obsevento = this.agenda.observacao;
      this.evento.paciente = pacientedto.paciente;
      this.evento.usuario = this.authServerProvider.usuario; 
      this.evento.dataevento = this.agenda.data;
      this.evento.agenda = this.agenda; 
      let _data = new Date(this.agenda.data);
      _data.setHours(_data.getHours() - (_data.getTimezoneOffset() / 60));
      this.datahora = _data.toISOString();
      this.grupoEventos = this.eventorotina.getDescricaoEvento();

    }

  ngOnInit() {
  }

  fechar(){
    this.modalController.dismiss();
  }
  salvar(){
    let _data = new Date(this.datahora);
    _data.setHours(_data.getHours() + (_data.getTimezoneOffset() / 60));
   this.evento.dataevento = _data;
   this.eventoService.save(this.evento).subscribe(res=>{
    this.modalController.dismiss("Evento registrado com sucesso.");
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
