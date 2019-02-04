import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Evento } from '../models/evento';
import { EventoRotina } from '../models/eventorotina';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
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

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private authServerProvider: AuthServerProvider,
    private eventoService: EventoService) { }

  ngOnInit() {
   this.evento = this.navParams.get('evento');
    let _data = new Date();
    if(this.evento.idevento){
      _data = new Date(this.evento.dataregistro);
    }
    _data.setHours(_data.getHours() - (_data.getTimezoneOffset() / 60));
    this.datahora = _data.toISOString();
  this.grupoEventos = this.eventorotina.getDescricaoEvento();
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
  delete(){
    console.log('delete');
  }

  salvar(){
    let _data = new Date(this.datahora);
    _data.setHours(_data.getHours() + (_data.getTimezoneOffset() / 60));
   this.evento.dataevento = _data;
    this.evento.dataregistro = _data;
    //this.evento.usuario = this.authServerProvider.usuario; 
  /* this.authServerProvider.getUsuario().subscribe(usuario=>{
      this.evento.usuario = usuario;
    });*/
    this.eventoService.save(this.evento).subscribe(res=>{
      this.modalController.dismiss();
    }, err =>{
        console.log(err.erro);
    })
    
  }

}
