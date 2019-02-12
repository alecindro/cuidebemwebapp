import { Component, OnInit } from "@angular/core";
import { Timeline } from "../models/timeline";
import { TimelineService } from "../services/timeline-service";
import { PacientedtoService } from "../services/pacientedto-service";
import { PacienteDTO } from "../models/pacienteDTO";
import { Memorando } from "../models/memorando";
import { ModalController } from "@ionic/angular";
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
  

  constructor(
    private timelineService: TimelineService,
    private pacientedtoService: PacientedtoService,
    private modalController: ModalController,
    private router: Router,
    private authServerProvider: AuthServerProvider
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
        editable: editable
      }
    });
    await modalEvento.present();
    await modalEvento.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.loadTimeline();
      }
    });
  }

  private loadTimeline() {
    this.timelineService.get(this.pacientedto.paciente.idpaciente).subscribe(
      res => {
        this.timelines = res.body;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  async addMemorando() {
    let memorando = new Memorando();
    memorando.paciente = this.pacientedto.paciente;
    const modalMemorando = await this.modalController.create({
      component: MemoPage,
      componentProps: {
        memorando: memorando
      }
    });
    await modalMemorando.present();
    await modalMemorando.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.loadTimeline();
      }
    });
  }

  async editMemorando(memorando: Memorando) {
    memorando.paciente = this.pacientedto.paciente;
    const modalMemorando = await this.modalController.create({
      component: MemoPage,
      componentProps: {
        memorando: memorando,
        editable: this.editable(memorando.usuario)
      }
    });
    await modalMemorando.present();
    await modalMemorando.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
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
        editable: false
      }
    });
    await modalPhoto.present();
    await modalPhoto.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        this.loadTimeline();
      }
    });
  }

  async editPhoto(pacientePhoto: PacientePhoto) {
    pacientePhoto.paciente = this.pacientedto.paciente;
    const modalPhoto = await this.modalController.create({
      component: PhotoModalPage,
      componentProps: {
        pacientePhoto: pacientePhoto,
        editable: this.editable(pacientePhoto.usuario)
      }
    });
    await modalPhoto.present();
    await modalPhoto.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
          this.loadTimeline();
        
      }
    });
  }

  voltar() {
    this.router.navigate(["home"]);
  }
}
