import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { PhotoDTO } from './photo-dto';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.page.html',
  styleUrls: ['./photo-modal.page.scss'],
})
export class PhotoModalPage implements OnInit {

  mobile: boolean = false;
  photodto: PhotoDTO;

  constructor( private platform: Platform, 
    private camera: Camera,
    public modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.photodto = this.navParams.get('photodto');
    if(!this.photodto){
      this.photodto = new PhotoDTO();
    }
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
      this.photodto.photo = base64Image;
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
        this.photodto.photo = reader.result.toString();
      };
      reader.onerror = error => console.log(error);
    }
  }

  salvar(){
    this.modalController.dismiss(this.photodto);
  }

  fechar(){
    this.modalController.dismiss();
  }
}
