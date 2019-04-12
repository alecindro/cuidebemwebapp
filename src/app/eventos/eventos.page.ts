import { Component, OnInit, ViewChild } from "@angular/core";
import { Timeline } from "../models/timeline";
import { TimelineService } from "../services/timeline-service";
import { PacientedtoService } from "../services/pacientedto-service";
import { PacienteDTO } from "../models/pacienteDTO";
import { Memorando } from "../models/memorando";
import { ModalController, LoadingController, ToastController } from "@ionic/angular";
import { OverlayEventDetail } from "@ionic/core";
import { MemoPage } from "../memo/memo.page";
import { Router } from "@angular/router";
import { PhotoModalPage } from "../photo-modal/photo-modal.page";
import { PacientePhoto } from "../models/paciente-photo";
import { AuthServerProvider } from "../services/auth-jwt.service";
import { Evento } from "../models/evento";
import { EventoModalPage } from "../evento-modal/evento-modal.page";
import { Usuario } from "../models/usuario";
import { EventoRotina } from "../models/eventorotina";

@Component({
  selector: "app-eventos",
  templateUrl: "./eventos.page.html",
  styleUrls: ["./eventos.page.scss"]
})
export class EventosPage implements OnInit {
  timelines: Array<Timeline> = new Array<Timeline>();
  pacientedto: PacienteDTO;
  eventoRotina: EventoRotina = new EventoRotina();
  grupoEventos: string[];
  page:number = 0;
  disableLoad:boolean = false;
  
  
  

  constructor(
    private timelineService: TimelineService,
    private pacientedtoService: PacientedtoService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private router: Router,
    private authServerProvider: AuthServerProvider,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.grupoEventos = this.eventoRotina.getDescricaoEvento();
    this.pacientedto = this.pacientedtoService.pacienteDTO;
    this.loadTimeline();
  }
  async addEvento() {
    let evento = new Evento();
    evento.paciente = this.pacientedto.paciente;
    const modalEvento = await this.modalController.create({
      component: EventoModalPage,
      componentProps: {
        evento: evento
      }
    });
    await modalEvento.present();
    await modalEvento.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data);
        this.loadTimeline();
      }
    });
  }

  private editable(usuario: Usuario): boolean {
    let editable = false;
      if (this.authServerProvider.usuario.login === usuario.login) {
        editable = true;
      }
    return editable;
  }

  async editEvento(evento: Evento) {
    let editable = this.editable(evento.usuario);
    evento.paciente = this.pacientedto.paciente;
    const modalEvento = await this.modalController.create({
      component: EventoModalPage,
      componentProps: {
        evento: evento,
        editable: editable,
        deletable: editable
      }
    });
    await modalEvento.present();
    await modalEvento.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data)
        this.loadTimeline();
      }
    });
  }

  private async loadTimeline() {
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();
    this.page = 0;
    this.timelineService.get(this.pacientedto.paciente.idpaciente,0).subscribe(
      res => {
        this.timelines  = res.body;
        loading.dismiss();
      },
      err => {
        this.presentToast(err.error);
        loading.dismiss();
      }
    );
  }

  private async moreData() {
    const loading = await this.loadingController.create({
      message: 'Carregando ...'
    });
    await loading.present();

    this.timelineService.get(this.pacientedto.paciente.idpaciente,this.page).subscribe(
      res => {
        let _timelines  = res.body;
        if(_timelines.length == 0){
          this.disableLoad = true;
        }
        this.timelines = this.timelines.concat(_timelines);
        loading.dismiss();
      },
      err => {
        this.presentToast(err.error);
        loading.dismiss();
      }
    );
  }

  async addMemorando() {
    let memorando = new Memorando();
    memorando.paciente = this.pacientedto.paciente;
    const modalMemorando = await this.modalController.create({
      component: MemoPage,
      componentProps: {
        memorando: memorando,
        editable: true,
        deletable: false
      }
    });
    await modalMemorando.present();
    await modalMemorando.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data);
        this.loadTimeline();
      }
    });
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async editMemorando(memorando: Memorando) {
    memorando.paciente = this.pacientedto.paciente;
    let editable = this.editable(memorando.usuario);
    const modalMemorando = await this.modalController.create({
      component: MemoPage,
      componentProps: {
        memorando: memorando,
        editable: editable,
        deletable: editable
      }
    });
    await modalMemorando.present();
    await modalMemorando.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data);
        this.loadTimeline();
      }
    });
  }
  async addPhoto() {
    let pacientePhoto = new PacientePhoto();
    pacientePhoto.paciente = this.pacientedto.paciente;
    pacientePhoto.usuario = this.authServerProvider.usuario;
    
    const modalPhoto = await this.modalController.create({
      component: PhotoModalPage,
      componentProps: {
        pacientePhoto: pacientePhoto,
        editable: true,
        deletable: false
      }
    });
    await modalPhoto.present();
    await modalPhoto.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data)
        this.loadTimeline();
      }
    });
  }

  async editPhoto(pacientePhoto: PacientePhoto) {
    let editable = this.editable(pacientePhoto.usuario);
    pacientePhoto.paciente = this.pacientedto.paciente;
    const modalPhoto = await this.modalController.create({
      component: PhotoModalPage,
      componentProps: {
        pacientePhoto: pacientePhoto,
        editable: editable,
        deletable: editable
      }
    });
    await modalPhoto.present();
    await modalPhoto.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.presentToast(data.data);
          this.loadTimeline();
        
      }
    });
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

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      /*if (data.length == 1000) {
        event.target.disabled = true;
      }*/
    
  }
}
