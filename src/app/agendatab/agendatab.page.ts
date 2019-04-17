import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../services/agenda-service';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PacientedtoService } from '../services/pacientedto-service';
import { PacienteDTO } from '../models/pacienteDTO';
import { Agenda } from '../models/agenda';
import { OverlayEventDetail } from '@ionic/core';
import { AgendatabmodalPage } from '../agendatabmodal/agendatabmodal.page';

@Component({
  selector: 'app-agendatab',
  templateUrl: './agendatab.page.html',
  styleUrls: ['./agendatab.page.scss'],
})
export class AgendatabPage implements OnInit {

  pacientedto: PacienteDTO;
  agendas:Array<Agenda> = new Array<Agenda>();
  page:number = 0;
  disableLoad:boolean = false;

  constructor(private agendaService: AgendaService,
    private pacientedtoService: PacientedtoService,    
    private modalController: ModalController,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController ) { }

  ngOnInit() {
    this.pacientedto = this.pacientedtoService.pacienteDTO;
    this.loadAgendas();
  }

  private async loadAgendas(){
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();
    this.page = 0;
    this.agendaService.get(this.pacientedto.paciente.idpaciente,0).subscribe(
      res => {
        this.agendas  = res.body;
        loading.dismiss();
      },
      err => {
        this.presentToast(err.error);
        loading.dismiss();
      }
    );
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  voltar() {
    this.router.navigate(["home"]);
  }

  loadData(event) {
    this.page = this.page +1;
    this.moreData().then( res =>{  
      event.target.complete();
      if(this.disableLoad){
        event.target.disabled = true;
      }
    });
  }
  private async moreData() {
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();

    this.agendaService.get(this.pacientedto.paciente.idpaciente,this.page).subscribe(
      res => {
        let _agendas  = res.body;
        if(_agendas.length == 0){
          this.disableLoad = true;
        }
        this.agendas = this.agendas.concat(_agendas);
        loading.dismiss();
      },
      err => {
        this.presentToast(err.error);
        loading.dismiss();
      }
    );
  }


  async registerEvento(agenda:Agenda) {
    const modalEvento = await this.modalController.create({
      component: AgendatabmodalPage,
      componentProps: {
        agenda: agenda,
        pacientedto: this.pacientedto
      }
    });
    await modalEvento.present();
    await modalEvento.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data);
        this.loadAgendas();
      }
    });
  }
}
