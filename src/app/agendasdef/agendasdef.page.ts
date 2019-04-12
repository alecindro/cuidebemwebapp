import { Component, OnInit } from '@angular/core';
import { AgendaDef } from '../models/agendadef';
import { PacienteDTO } from '../models/pacienteDTO';
import { PacientedtoService } from '../services/pacientedto-service';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Paciente } from '../models/paciente';
import { AgendaDefPage } from '../agendadef/agendadef.page';
import { OverlayEventDetail } from '@ionic/core';
import { AgendaDefService } from '../services/agendadef-service';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendasdef.page.html',
  styleUrls: ['./agendasdef.page.scss'],
})
export class AgendasDefPage implements OnInit {

  agendadefs: Array<AgendaDef> = [];
  pacienteDTOS: Array<PacienteDTO> = [];
  paciente: Paciente;
  selectedPaciente: boolean = false;
  
  constructor( private pacientedtoService: PacientedtoService,
    private agendaDefService: AgendaDefService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getPacientes();
    if (this.paciente) {
      this.loadAgendas();
    }
  }

  async addAgenda() {
    let agendaDef = new AgendaDef();
    agendaDef.paciente = this.paciente;
    const modalEvento = await this.modalController.create({
      component: AgendaDefPage,
      componentProps: {
        agendaDef: agendaDef
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
  private async  loadAgendas() {
    const loading = await this.loadingController.create({
      message: 'Carregando Agendas...'
    });
   await loading.present();
   this.agendaDefService.getByPaciente(this.paciente.idpaciente).subscribe(
    res => {
      this.agendadefs  = res.body;
      loading.dismiss();
    },
    err => {
      this.presentToast(err.error);
      loading.dismiss();
    }
  );
    
  }

  changePaciente() {
    this.selectedPaciente = true;
    this.loadAgendas();
  }

  async getPacientes() {
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();
    await this.pacientedtoService.getPacientes()
      .subscribe(res => {
        this.pacienteDTOS = res.body;
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.presentToast(err.error);
      });
  }

  async edit(agendadef:AgendaDef){
  
    const modalEvento = await this.modalController.create({
      component: AgendaDefPage,
      componentProps: {
        agendaDef: agendadef
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


  async newAgenda(){
    let agendadef = new AgendaDef();
    agendadef.paciente = this.paciente;
    const modalEvento = await this.modalController.create({
      component: AgendaDefPage,
      componentProps: {
        agendaDef: agendadef
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

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

}
