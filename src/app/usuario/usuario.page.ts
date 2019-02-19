import { Component, OnInit } from '@angular/core';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { UsuarioService } from '../services/usuario-service';
import { Usuario } from '../models/usuario';
import { Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { UsuarioPhoto } from '../models/usuariophoto';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { UsuarioTelefone } from '../models/usuariotelefone';
import { Telefone } from '../models/telefone';
import { UsuarioTelefoneService } from '../services/usuarioTelefone-service';
import { UsuarioPhotoService } from '../services/usuariophoto-service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
usuario:Usuario;
usuarioPhoto: UsuarioPhoto;
usuarioTelefones: Array<UsuarioTelefone>;
mobile: boolean = false;
changefoto: boolean = false;
telefone: Telefone;
masculino: boolean = false;
feminino: boolean = false;

  constructor(private authServerProvider : AuthServerProvider, 
    private usuarioSevice : UsuarioService,
    private usuarioTelefoneSevice : UsuarioTelefoneService,
    private usuarioPhotoService: UsuarioPhotoService,
    private platform: Platform,
    private camera: Camera,
    private loadingController: LoadingController,
    private alertController: AlertController,
    public toastController: ToastController) { 
      this.mobile = false;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.mobile = true;
    }
    }

  ngOnInit() {
    this.changefoto = false;
    this.usuarioPhoto = new UsuarioPhoto();
      this.usuarioTelefones = new Array<UsuarioTelefone>();
      this.usuario = new Usuario();
    this.authServerProvider.user().then(login =>{
      this.usuarioSevice.get(login).subscribe(res => {
      this.usuario = res.body;
      if(this.usuario.usuarioPhoto){ 
      this.usuarioPhoto = this.usuario.usuarioPhoto;
      }
      if (this.usuario.genero) {
        this.masculino = true;
      } else {
        this.feminino = true;
      }
      this.usuarioTelefoneSevice.get(this.usuario.login).subscribe(res =>
        {
          this.usuarioTelefones = res.body;
        });

          })
    });
  }

  loadPhoto() {
    if (!this.mobile) {
      document.getElementById('file').click();
    } else {
      this.takePicture();
    }
  }

  async save(){
    const loading = await this.loadingController.create({
      message: 'Excluindo ...'
    });
    await loading.present();
    this.usuarioSevice.update(this.usuario).subscribe(res =>{
      this.usuario = res.body;
      loading.dismiss();
      this.savePhoto();
      this.sucessAlert("Salvo com sucesso");
    },
    err =>{
      loading.dismiss();
      this.erroAlert(err.error.title);
    })
  }

  private async savePhoto() {
    if(this.changefoto){
    this.usuarioPhoto.login = this.usuario.login;
    this.usuarioPhotoService.save(this.usuarioPhoto).subscribe(res => {
      this.usuarioPhoto = res.body;
      this.changefoto = false;
    }, err => {
      this.erroAlert(err.error.title);
    });
  }
  }

  atualizaArquivo(event) {
    if (!this.mobile) {
      const reader = new FileReader();
      reader.readAsDataURL(event.srcElement.files[0]);
      reader.onload = () => {
        this.usuarioPhoto.photo = reader.result.toString();
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
      this.usuarioPhoto.photo = base64Image;
      this.changefoto = true;
      this.camera.cleanup();
    }, (err) => {
      this.presentToast(err.error);
    });
  }

  async delete() {
    const loading = await this.loadingController.create({
      message: 'Excluindo ...'
    });
    await loading.present();
    this.usuarioSevice.desactiveUserDTO(this.usuario.login).subscribe(res  => {
      this.usuarioSevice.delete(this.usuario).subscribe(res =>{

      },
      err => {
        this.presentToast(err.error);
      } 
      )      
    });
    loading.dismiss();
  }

  async addTelefone(tel: Telefone) {
    const loading = await this.loadingController.create({
      message: 'Adicionando telefone ...'
    });
    await loading.present();
    let usuarioTelefone = new UsuarioTelefone();
    let _tel = new Telefone();
    _tel.ddd = tel.ddd;
    _tel.telefone = tel.telefone
    usuarioTelefone.telefone = _tel;
    usuarioTelefone.usuario = this.usuario;
    this.usuarioTelefoneSevice.save(usuarioTelefone).subscribe(res =>
      {
        usuarioTelefone = res.body;
        this.usuarioTelefones.push(usuarioTelefone);
        loading.dismiss();
      }, 
      err => {
        loading.dismiss();
        this.erroAlert(err.error.title);
      });
  }



  async delTelefone(usuarioTelefone: UsuarioTelefone) {
    const loading = await this.loadingController.create({
      message: 'Excluindo telefone ...'
    });
    await loading.present();
    this.usuarioTelefoneSevice.delete(usuarioTelefone.idusuarioTelefone).subscribe(res =>
      {
        loading.dismiss();
        if(this.usuarioTelefones.length == 1){
          this.usuarioTelefones.length = 0;
        }else{
        this.usuarioTelefones = this.usuarioTelefones.filter(e1 => {
          return e1.telefone.idtelefone !== usuarioTelefone.telefone.idtelefone
        });
      }
      },
      err => {
        loading.dismiss();
        this.erroAlert("Erro ao excluir telefone.");
      });
  }

  changeMasculino() {
    this.feminino = !this.masculino;
    this.usuario.genero = this.masculino;
  }
  changeFeminino() {
    this.masculino = !this.feminino;
    this.usuario.genero = this.masculino;
  }


  async erroAlert(_message : string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: _message,
      buttons: [
        {
        text:'OK',
        cssClass: 'danger',
      }]
    });

    await alert.present();
  }
  async sucessAlert(_message : string) {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: _message,
      buttons: [
        {
        text:'OK',
        cssClass: 'secondary',
      }]
    });

    await alert.present();
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
