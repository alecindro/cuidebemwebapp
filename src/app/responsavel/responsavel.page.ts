import { Component, OnInit } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { ResponsavelPacienteService } from '../services/responsavelpaciente-service';
import { Router } from '@angular/router';
import { ResponsavelPaciente } from '../models/responsavelpaciente';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { stringify } from '@angular/compiler/src/util';
import { ResponsavelPhotoService } from '../services/responsavelphoto-service';
import { ResponsavelPhoto } from '../models/responsavelphoto';

@Component({
  selector: 'app-responsavel',
  templateUrl: './responsavel.page.html',
  styleUrls: ['./responsavel.page.scss'],
})
export class ResponsavelPage implements OnInit {

  responsavelPaciente: ResponsavelPaciente;
  responsavelPhoto: ResponsavelPhoto;
  mobile: boolean = false;
  masculino: boolean = false;
  feminino: boolean = false;

  constructor(private loadingController: LoadingController,
    private responsavelPacienteService: ResponsavelPacienteService,
    private responsavelPhotoService: ResponsavelPhotoService,
    private router: Router,
    private camera: Camera,
    private platform: Platform) {
    this.mobile = false;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.mobile = true;
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.responsavelPaciente = this.responsavelPacienteService.responsavelPaciente;
    console.log(JSON.stringify(this.responsavelPaciente.responsavel.nome));
  }

  async getPhoto() {
    const loading = await this.loadingController.create({
      message: 'Carregando imagem ...'
    });
    await loading.present();
    this.responsavelPhotoService.get(this.responsavelPaciente.responsavel.idresponsavel)
      .subscribe(res => {
        this.responsavelPhoto = res.body;
        if(!this.responsavelPhoto){
          this.responsavelPhoto = new ResponsavelPhoto();
          this.responsavelPhoto.photo = '../../assets/imgs/rsz_1no-avatar.jpg'; 
        }
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async save() {
    const loading = await this.loadingController.create({
      message: 'Salvando ...'
    });
    await loading.present();
    this.responsavelPacienteService.save(this.responsavelPaciente)
      .subscribe(res => {
        this.responsavelPaciente = res.body;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    this.router.navigate(['responsaveis']);
  }
  async delete() {
    const loading = await this.loadingController.create({
      message: 'Salvando ...'
    });
    await loading.present();
    this.responsavelPacienteService.delete(this.responsavelPaciente);
    this.router.navigate(['responsaveis']);
  }

  loadPhoto() {
    if (!this.mobile) {
      document.getElementById('file').click();
    } else {
      this.takePicture();
    }
  }

  atualizaArquivo(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    reader.onload = () => {
      this.responsavelPhoto.photo = reader.result.toString();
    };
    reader.onerror = error => console.log(error);
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
      this.camera.cleanup();
    }, (err) => {
      console.log(err);
    });
  }

  changeMasculino() {
    this.feminino = !this.masculino;
  }
  changeFeminino() {
    this.masculino = !this.feminino;
  }
}
