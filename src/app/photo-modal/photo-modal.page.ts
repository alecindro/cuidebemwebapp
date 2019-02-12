import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams, AlertController } from '@ionic/angular';
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
    private navParams: NavParams) { }

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
      console.log(err);
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
        this.modalController.dismiss();
      },
      err => {
        console.log(err.error);
      }
    );
  }

  private save(){
    this.pacientePhoto.dataregistro = new Date();
    this.pacientePhoto.principal = false;
    this.pacientePhotoService.save(this.pacientePhoto).subscribe(
      res => {
        this.modalController.dismiss();
      },
      err => {
        console.log(err.error);
      }
    );
  }

  excluir(){

    this.pacientePhotoService.delete(this.pacientePhoto).subscribe(
      res => {
        this.modalController.dismiss();
      },
      err => {
        console.log(err.error);
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
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confimar',
          handler: () => {
            this.pacientePhotoService.delete(this.pacientePhoto).subscribe(res => {
              this.modalController.dismiss();
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



  fechar(){
    this.modalController.dismiss();
  }
}
