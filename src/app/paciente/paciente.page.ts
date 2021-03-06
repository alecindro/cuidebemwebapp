import { Component, OnInit } from '@angular/core';
import { Platform, NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { PacientedtoService } from 'src/app/services/pacientedto-service';
import { Patologias } from 'src/app/models/patologias';
import { PatologiaPacienteDTO } from 'src/app/models/patologiaPacienteDTO';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})


export class PacientePage implements OnInit {
  pacienteDTO: PacienteDTO;
  patologiaPacienteDTOs: Array<PatologiaPacienteDTO>;
  masculino: boolean = false;
  feminino: boolean = false;
  mobile: boolean = false;

  constructor(private pacientedtoService: PacientedtoService,
    private  router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private camera: Camera,
    private nav : NavController,
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController
    ) {
    this.mobile = false;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.mobile = true;
    }
  }

  ngOnInit() {
    this.pacienteDTO = this.pacientedtoService.pacienteDTO;
    if (!this.pacienteDTO) {
      this.pacienteDTO = new PacienteDTO();
    } else {
      let patologias = new Patologias();
      this.patologiaPacienteDTOs = patologias.resolve(this.pacienteDTO.patologiasDTO);
      if (this.pacienteDTO.paciente.genero) {
        this.masculino = true;
      } else {
        this.feminino = true;
      }
    }
    if (!this.pacienteDTO.photo) {
      this.pacienteDTO.photo = '../../../assets/imgs/rsz_1no-avatar.jpg';
    }

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
      this.pacienteDTO.photo = reader.result.toString();
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
      this.pacienteDTO.photo = base64Image;
      this.camera.cleanup();
    }, (err) => {
      this.presentToast(err.error);
    });
  }

  async save() {
    if (this.feminino) {
      this.pacienteDTO.paciente.genero = !this.feminino;
    } else {
      this.pacienteDTO.paciente.genero = this.masculino;
    }
    const loading = await this.loadingController.create({
      message: 'Salvando ...'
    });
    this.pacienteDTO.patologiasDTO = this.patologiaPacienteDTOs;
    await loading.present();
    await this.pacientedtoService.save(this.pacienteDTO).subscribe(res => {
      this.pacienteDTO = res.body;
      loading.dismiss();
      this.router.navigate(['/pacientes'],{ relativeTo: this.route });
    }, err => {
      loading.dismiss();
      this.presentToast(err.error);
    });
    
  }

  changeMasculino() {
    this.feminino = !this.masculino;
  }
  changeFeminino() {
    this.masculino = !this.feminino;
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
            this.pacientedtoService.delete(this.pacienteDTO.paciente.idpaciente).subscribe(res => {
              this.router.navigate(['pacientes']);
            }, err => {
              this.presentToast(err.error);
            });
          }
        }
      ]
    });
    await alert.present();
    
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
