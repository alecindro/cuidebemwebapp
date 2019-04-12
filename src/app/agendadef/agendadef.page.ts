import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController, ToastController } from '@ionic/angular';
import { AgendaDef } from '../models/agendadef';
import { EventoRotina } from '../models/eventorotina';
import { Dia } from '../models/dia';
import { DiaSemana } from '../models/diasemana';
import { AgendaDefService } from '../services/agendadef-service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agendadef.page.html',
  styleUrls: ['./agendadef.page.scss'],
})
export class AgendaDefPage implements OnInit {

  dataFim: string;
  dataInicio: string;
  agendadef: AgendaDef;
  grupoSelected: string = "";
  subgrupoSelected: string = "";
  eventorotina: EventoRotina = new EventoRotina();
  subgrupos: any;
  grupoEventos: string[];
  repetirHoras: boolean = false;
  dias: Array<Dia> = [];
  diaSemana: DiaSemana = new DiaSemana();
  min:String;

  ngOnInit() {


  }

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private agendaDefService: AgendaDefService,
    private alertController: AlertController,
    private toastController: ToastController) { 
      this.min = (new Date()).toISOString();
      this.agendadef = this.navParams.get('agendaDef');
      
      if(this.agendadef.idagendadef){
         this.dias = this.diaSemana.resolve(this.agendadef);
         if(this.agendadef.grupoevento){
          this.grupoSelected = this.agendadef.grupoevento;
          this.subgrupos = this.eventorotina.getRotinas(this.grupoSelected);
         }
         if(this.agendadef.subgrupoevento){
           this.selectedSubgrupo(this.agendadef.subgrupoevento);
         }
         if(this.agendadef.repetirHoras){
          this.repetirHoras = true;
         }
       }else{
        
        this.dias = this.diaSemana.dias;
       }
     
       
     this.grupoEventos = this.eventorotina.getDescricaoEventoDefault();

    }

    changeDias(){
      if(this.agendadef.diaspersonalizado){
      this.repetirHoras = false;
      }
    }
    changeHoras(){
      if(this.repetirHoras){
      this.agendadef.diaspersonalizado = false;
      }
    }

    private fromDate(date:Date): string{
      return date.getDay()+'/'+date.getMonth()+1+'/'+date.getFullYear();
    }

    private update(){
      this.diaSemana.result(this.agendadef,this.dias);
      this.agendaDefService.update(this.agendadef).subscribe(res =>{
        this.modalController.dismiss("Evento salvo com sucesso.");
      }, err => {
        this.presentToast(err.error);
      });
    }

    salvar(){
      if(this.agendadef.idagendadef){
        this.update();
      } else{
        this.save();
      }
    }

    private save(){
      this.diaSemana.result(this.agendadef,this.dias);
      let _datainicio = new Date(this.agendadef.datainicio);
      _datainicio.setHours(0);
      let _datafim = new Date(this.agendadef.datainicio);
      _datafim.setHours(0);
      this.agendadef.datainicio = _datainicio.toISOString();
      this.agendadef.datafim = _datafim.toISOString();
      this.agendaDefService.save(this.agendadef).subscribe(res =>{
        this.modalController.dismiss("Evento salvo com sucesso.");
      }, err => {
        this.presentToast(err.error);
      });
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
              this.agendaDefService.delete(this.agendadef).subscribe(res => {
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

  

  selectedGrupo(grupoevento: string) {
    this.grupoSelected = grupoevento;
    this.subgrupoSelected = "";
    this.agendadef.subgrupoevento = "";
    this.subgrupos = this.eventorotina.getRotinas(grupoevento);
  }

  selectedSubgrupo(subgrupoevento: string) {
    this.subgrupoSelected = subgrupoevento;
  }

  fechar(){
    this.modalController.dismiss();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
