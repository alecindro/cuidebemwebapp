import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ResponsavelPhoto } from '../models/responsavelphoto';
import { ResponsavelTelefone } from '../models/responsaveltelefone';
import { Telefone } from '../models/telefone';
import { ResponsavelService } from '../services/responsavel-service';
import { ResponsavelPaciente } from '../models/responsavelpaciente';
import { ResponsavelPacienteService } from '../services/responsavelpaciente-service';
import { ResponsavelPhotoService } from '../services/responsavelphoto-service';
import { ResponsavelTelefoneService } from '../services/responsaveltelefone-service';
import { ResponsavelTelefoneList } from '../models/responsavelTelefoneList';



@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.page.html',
  styleUrls: ['./responsavel.page.scss'],
})
export class ResponsavelPage implements OnInit {

  responsavelTelefoneList: ResponsavelTelefoneList;
  responsavelPaciente: ResponsavelPaciente;
  responsavelPhoto: ResponsavelPhoto;
  responsavelTelefones: Array<ResponsavelTelefone>;
  mobile: boolean = false;
  masculino: boolean = false;
  feminino: boolean = false;
  telefone: Telefone;
  changefoto: boolean = false;

  constructor(private loadingController: LoadingController,
    private responsavelService: ResponsavelService,
    private responsavelPacienteService: ResponsavelPacienteService,
    private responsavelPhotoService: ResponsavelPhotoService,
    private responsavelTelefoneService: ResponsavelTelefoneService,
    private router: Router,
    private camera: Camera,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.mobile = false;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.mobile = true;
    }
  }

  ngOnInit() {
    this.responsavelPaciente = this.responsavelService.responsavelPaciente;
    this.responsavelPhoto = this.responsavelPaciente.responsavel.responsavelPhoto;
    this.responsavelTelefones = this.responsavelPaciente.responsavel.responsavelTelefones;
  }

  ionViewWillEnter() {
    this.responsavelTelefoneList = new ResponsavelTelefoneList();
    this.responsavelPaciente = this.responsavelService.responsavelPaciente;
    this.responsavelPhoto = this.responsavelPaciente.responsavel.responsavelPhoto;
    this.responsavelTelefones = this.responsavelPaciente.responsavel.responsavelTelefones;
    if (!this.responsavelTelefones) {
      this.responsavelTelefones = new Array<ResponsavelTelefone>();
    }
    if (!this.responsavelPhoto) {
      this.responsavelPhoto = new ResponsavelPhoto();
    }
    if (this.responsavelPaciente.responsavel.genero) {
      this.masculino = true;
    } else {
      this.feminino = true;
    }
    this.changefoto = false;
  }


  async save() {
    const loading = await this.loadingController.create({
      message: 'Salvando ...'
    });
    await loading.present();
    //this.responsavelPaciente.responsavel.responsavelTelefones = this.responsavelTelefones;
    let rp = {... this.responsavelPaciente};
    rp.responsavel.responsavelPhoto = null;
    rp.responsavel.responsavelTelefones = null;
    this.responsavelPacienteService.save(rp)
      .subscribe(res => {
        this.responsavelPaciente = res.body;
        this.savePhoto();
        this.saveTelefone();
        loading.dismiss();
        this.router.navigate(['responsaveis']);
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  private async savePhoto() {
    if(this.changefoto){
    this.responsavelPhoto.idresponsavel = this.responsavelPaciente.responsavel.idresponsavel;
    this.responsavelPhotoService.save(this.responsavelPhoto).subscribe(res => {
      this.responsavelPhoto = res.body;
      this.changefoto = false;
    }, err => {
      console.log(err);
    });
  }
  }
  async delete() {
    const loading = await this.loadingController.create({
      message: 'Excluindo ...'
    });
    await loading.present();
    this.responsavelService.delete(this.responsavelPaciente.responsavel).subscribe(res => {
      loading.dismiss();
      this.router.navigate(['responsaveis']);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  loadPhoto() {
    if (!this.mobile) {
      document.getElementById('file').click();
    } else {
      this.takePicture();
    }
  }

  atualizaArquivo(event) {
    if (!this.mobile) {
      const reader = new FileReader();
      reader.readAsDataURL(event.srcElement.files[0]);
      reader.onload = () => {
        this.responsavelPhoto.photo = reader.result.toString();
        this.changefoto = true;
      };
      reader.onerror = error => console.log(error);
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.responsavelPhoto.photo = base64Image;
      this.changefoto = true;
      this.camera.cleanup();
    }, (err) => {
      console.log(err);
    });
  }
  /* async addTelefone() {
     let telefone = new Telefone();
      let responsavelTelefone = new ResponsavelTelefone();
      responsavelTelefone.telefone = new Telefone();
      this.responsavelTelefones.push(responsavelTelefone);
      console.log("Tamanho do telefone: " + this.responsavelTelefones.length);
     const modalTelefone = await this.modalCtrl.create({
       component: ModalTelefonePage,
       componentProps: {
         'telefone': telefone
       }
     });
     await modalTelefone.present();
     await modalTelefone.onDidDismiss().then((data: OverlayEventDetail) => {
       let responsavelTelefone = new ResponsavelTelefone();
       let _telefone = data.data;
       responsavelTelefone.telefone = _telefone;
       responsavelTelefone.responsavel = this.responsavelPaciente.responsavel;
       this.responsavelTelefones.push(responsavelTelefone);
     });
   }
   
    async editTelefone(responsavelTelefone: ResponsavelTelefone) {
     const modalTelefone = await this.modalCtrl.create({
       component: ModalTelefonePage,
       componentProps: {
         'telefone': responsavelTelefone.telefone
       }
     });
     await modalTelefone.present();
     await modalTelefone.onDidDismiss().then((data: OverlayEventDetail) => {
       let _telefone = data.data;
       responsavelTelefone.telefone = _telefone;
     });
   }
 
   
   */

  addTelefone(tel: Telefone) {

    let responsavelTelefone = new ResponsavelTelefone();
    let _tel = new Telefone();
    _tel.ddd = tel.ddd;
    _tel.telefone = tel.telefone
    responsavelTelefone.telefone = _tel;
    responsavelTelefone.responsavel = this.responsavelPaciente.responsavel;
    this.responsavelTelefones.push(responsavelTelefone);
    this.responsavelTelefoneList.responsavelTelefones.push(responsavelTelefone);
  }

  private saveTelefone(){
    if(this.responsavelTelefoneList.responsavelTelefones.length > 0){
      this.responsavelTelefoneList.responsavelTelefones.map(e1 => {
        e1.responsavel = this.responsavelPaciente.responsavel;
      });
    this.responsavelTelefoneService.saveDTO(this.responsavelTelefoneList).subscribe(res => {
      this.responsavelTelefoneList = res.body;
    }, err => {
      console.log(err);
    })
  }
  }


  delTelefone(responsavelTelefone: ResponsavelTelefone) {
    if (responsavelTelefone.idresponsavelTelefone) {
      this.responsavelTelefoneService.delete(responsavelTelefone.idresponsavelTelefone).subscribe(res => {
        this.responsavelTelefones = this.responsavelTelefones.filter(e1 => {
          return e1.telefone.idtelefone !== responsavelTelefone.telefone.idtelefone
        });
      }, err => {
        console.log(err);
      });
    } else {
      this.responsavelTelefones = this.responsavelTelefones.filter(e1 => {
        return e1.telefone.ddd !== responsavelTelefone.telefone.ddd && e1.telefone.telefone !== responsavelTelefone.telefone.telefone 
      });
    }
  }

  changeMasculino() {
    this.feminino = !this.masculino;
    this.responsavelPaciente.responsavel.genero = this.masculino;
  }
  changeFeminino() {
    this.masculino = !this.feminino;
    this.responsavelPaciente.responsavel.genero = this.masculino;
  }
  async deleteResponsavel() {
    const alert = await this.alertController.create({
      header: 'Excluir',
      message: '<strong>Tem certeza?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.responsavelService.delete(this.responsavelPaciente.responsavel).subscribe(res => {
              this.router.navigate(['responsaveis']);
            }, err => {
              console.log(err);
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }


}
