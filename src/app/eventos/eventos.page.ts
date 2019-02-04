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
import { PacientePhotoService } from "../services/pacientephoto-service";
import { PacientePhoto } from "../models/paciente-photo";
import { AuthServerProvider } from "../services/auth-jwt.service";
import { PhotoDTO } from "../photo-modal/photo-dto";
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
  usuario: Usuario;

  constructor(
    private timelineService: TimelineService,
    private pacientedtoService: PacientedtoService,
    private modalController: ModalController,
    private router: Router,
    private pacientePhotoService: PacientePhotoService,
    private authServerProvider: AuthServerProvider
  ) {}

  ngOnInit() {
    console.log("TAB EVENTO");
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
     this.authServerProvider.user().then(login => {
      if (login === usuario.login) {
        editable = true;
      }
    });
    return editable;
  }

  async editEvento(evento: Evento) {
    let editable = this.editable(evento.usuario);
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
    let photodto = new PhotoDTO();
    const modalPhoto = await this.modalController.create({
      component: PhotoModalPage,
      componentProps: {
        photodto: photodto
      }
    });
    await modalPhoto.present();
    await modalPhoto.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        let photodto: PhotoDTO = data.data;
        let pacientePhoto = new PacientePhoto();
        pacientePhoto.descricao = photodto.descricao;
        pacientePhoto.photo = photodto.photo;
        pacientePhoto.dataregistro = new Date();
        pacientePhoto.paciente = this.pacientedto.paciente;
     /*   this.authServerProvider.usuario().then(usuario => {
          pacientePhoto.usuario = usuario;
        });*/
        /*this.authServerProvider.getUsuario().then(usuario =>{
        pacientePhoto.usuario = usuario;
       })*/
        pacientePhoto.principal = false;
        this.pacientePhotoService.save(pacientePhoto).subscribe(
          res => {
            this.loadTimeline();
          },
          err => {
            console.log(err.error);
          }
        );
      }
    });
  }

  async editPhoto(pacientePhoto: PacientePhoto) {
    let photodto = new PhotoDTO();
    photodto.descricao = pacientePhoto.descricao;
    photodto.photo = pacientePhoto.photo;
    const modalPhoto = await this.modalController.create({
      component: PhotoModalPage,
      componentProps: {
        photodto: photodto,
        editable: this.editable(pacientePhoto.usuario)
      }
    });
    await modalPhoto.present();
    await modalPhoto.onDidDismiss().then((data: OverlayEventDetail) => {
      if (data.data) {
        photodto = data.data;
        pacientePhoto.descricao = photodto.descricao;
        pacientePhoto.photo = photodto.photo;
        this.pacientePhotoService.update(pacientePhoto).subscribe(res => {
          this.loadTimeline();
        });
      }
    });
  }

  voltar() {
    this.router.navigate(["home"]);
  }
}
