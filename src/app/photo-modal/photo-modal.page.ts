import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { PacientePhoto } from '../models/paciente-photo';
import { PacientePhotoService } from '../services/pacientephoto-service';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.page.html',
  styleUrls: ['./photo-modal.page.scss'],
})
export class PhotoModalPage implements OnInit {

  mobile: boolean = false;
  pacientePhoto: PacientePhoto;
  editable: boolean = false;
  constructor( private platform: Platform, 
    private camera: Camera,
    public modalController: ModalController,
    private pacientePhotoService: PacientePhotoService,
    private alertController: AlertController,
    private navParams: NavParams,
    private toastController: ToastController) { }

  ngOnInit() {
    this.pacientePhoto = this.navParams.get('pacientePhoto');
    this.editable = this.navParams.get('editable');
  }


  loadPhoto() {
    if (!this.mobile) {
      document.getElementById('file').click();
    } else {
      this.takePicture();
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
      this.pacientePhoto.photo = base64Image;
      this.camera.cleanup();
    }, (err) => {
      this.presentToast(err.error);
    });
  }

  atualizaArquivo(event) {
    if (!this.mobile) {
      const reader = new FileReader();
      reader.readAsDataURL(event.srcElement.files[0]);
      reader.onload = () => {
        this.pacientePhoto.photo = reader.result.toString();
      };
      reader.onerror = error => console.log(error);
    }
  }

  salvar(){
    if(this.pacientePhoto.idpacientephoto){
      this.update();
    }else{
      this.save();
    }

    
  }

  private update(){
    this.pacientePhoto.dataregistro = new Date();
    this.pacientePhoto.principal = false;
    this.pacientePhotoService.update(this.pacientePhoto).subscribe(
      res => {
        this.modalController.dismiss("Foto atualizada com sucesso.");
      },
      err => {
        this.presentToast(err.error);
      }
    );
  }

  private save(){
    this.pacientePhoto.dataregistro = new Date();
    this.pacientePhoto.principal = false;
    this.pacientePhotoService.save(this.pacientePhoto).subscribe(
      res => {
        this.modalController.dismiss("Foto registrada com sucesso.");
      },
      err => {
        this.presentToast(err.error);
      }
    );
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
            this.pacientePhotoService.delete(this.pacientePhoto).subscribe(res => {
              this.modalController.dismiss("Foto excluída com sucesso.");
            }, err => {
              this.presentToast(err.error);
            });
          }
        }
      ]
    });
    await alert.present();
    
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
