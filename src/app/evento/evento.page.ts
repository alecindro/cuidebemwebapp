import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/evento';
import { EventoRotina } from '../models/eventorotina';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  datahora: string;
  evento: Evento;
  grupoSelected: string = "";
  subgrupoSelected: string = "";
  eventorotina: EventoRotina = new EventoRotina();
  subgrupos: any;
  grupoEventos: string[];
  
  constructor(private navParams: NavParams,public modalController: ModalController) { }

  ngOnInit() {
  /*  this.evento = this.navParams.get('evento');
    let _data = new Date();
    if(this.evento.idevento){
      _data = new Date(this.evento.dataregistro);
    }
    _data.setHours(_data.getHours() - (_data.getTimezoneOffset() / 60));
    this.datahora = _data.toISOString();
  this.grupoEventos = this.eventorotina.getDescricaoEvento();*/
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

  

}
