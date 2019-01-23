import { Component, OnInit } from '@angular/core';
import { UsuarioPhotoService } from '../services/usuariophoto-service';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario-service';
import { UsuarioPhoto } from '../models/usuariophoto';
import { Telefone } from '../models/telefone';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { UsuarioTelefone } from '../models/usuariotelefone';
import { UsuarioTelefoneService } from '../services/usuarioTelefone-service';
import { Authority } from '../models/authority';
import { AuthorityDTO } from '../models/authoritydto';
import { UserDTO } from '../models/userDTO';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ignoreElements } from 'rxjs/operators';
import { UsuarioTelefoneList } from '../models/usuarioTelefoneList';

@Component({
  selector: 'app-cuidador-detail',
  templateUrl: './cuidador-detail.page.html',
  styleUrls: ['./cuidador-detail.page.scss'],
})
export class CuidadorDetailPage implements OnInit {

  usuario: Usuario;
  userDTO: UserDTO;
  usuarioPhoto: UsuarioPhoto;
  usuarioTelefones: Array<UsuarioTelefone>;
  mobile: boolean = false;
  masculino: boolean = false;
  feminino: boolean = false;
  telefone: Telefone;
  changefoto: boolean = false;
  authorityDTOs: Array<AuthorityDTO>;
  newuser: boolean;


  constructor(private usuarioPhotoService: UsuarioPhotoService,
    private authServerProvider: AuthServerProvider,
    private usuarioService: UsuarioService,
    private usuarioTelefoneService: UsuarioTelefoneService,
    private alertController: AlertController,
    private platform: Platform,
    private camera: Camera,
    private loadingController: LoadingController,
    private route: Router) {
    this.mobile = false;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.mobile = true;
    }

  }

  ngOnInit() {
    this.usuarioPhoto = this.usuarioPhotoService.usuarioPhoto;
    this.usuario = this.usuarioPhoto.usuario;
    this.newuser = true;
    if(this.usuario.login){
      this.newuser = false;   
    }
    this.telefone = new Telefone();
    this.loadAuthorities();
    this.loadTelefones();

    if (this.usuario.genero) {
      this.masculino = true;
    } else {
      this.feminino = true;
    }
    this.changefoto = false;

  }

  loadTelefones() {
    this.usuarioTelefones = new Array<UsuarioTelefone>();
    if (!this.newuser) {
      this.usuarioTelefoneService.get(this.usuario.login).subscribe(res => {
        this.usuarioTelefones = res.body;
      },
        err => {
          console.log(err.error);
        });
    }
  }

  loadAuthorities() {
    if (!this.newuser) {
      this.usuarioService.getUserDTO(this.usuario.login).subscribe(res => {
        this.userDTO = res.body;
        this.generateAuthority(this.userDTO.authorities);
      });
    } else {
      this.generateAuthority(new Array<string>());
      this.userDTO = new UserDTO();
      this.userDTO.authorities = new Array<string>();
    }
  }

  delete() {
    this.usuarioService.desactiveUserDTO(this.userDTO.login).subscribe(res => {
      this.userDTO = res.body;
      this.usuarioService.delete(this.usuario).subscribe(res => {
        this.usuario = res.body;
        this.route.navigate(['usuarios']);
      })
    }, err => {
      console.log(err.error);
    });
  }
  save() {
    if (!this.newuser) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  private savePhoto(): Observable<HttpResponse<any>> {
    this.usuarioPhoto.login = this.usuario.login;
    return this.usuarioPhotoService.save(this.usuarioPhoto);
  }

  private async findLogin() {
    this.authServerProvider.user().then(login => {
      if (!this.newuser) {
        this.userDTO.lastModifiedBy = login;
      } else {
        this.userDTO.createdBy = login;
      }
    });
  }
  private async findTenant() {
    this.authServerProvider.getTenantNow().then(tenant => {
      this.userDTO.authorities.push(tenant);
    })
  }

  private async updateUser() {
    this.usuario.enabled = true;
    this.mapperUser();
  
    this.userDTO.lastModifiedDate = new Date();
    await this.findLogin();
    
    this.usuarioService.updateUserDTO(this.userDTO).subscribe(res => {
      this.userDTO = res.body;
      this.usuarioService.update(this.usuario).subscribe(res => {
        this.usuario = res.body;
        if (this.changefoto) {
          this.savePhoto().subscribe(
            res => {
              this.usuarioPhoto = res.body;
              this.changefoto = false;
              this.route.navigate(['usuarios']);
            }, err => {
              this.erroAlert(err.error.title);
            }
          );
        } else {
          this.route.navigate(['usuarios']);
        }
      }, err => {
        this.erroAlert(err.error.title);
      });
    }, err => {
      this.erroAlert(err.error.title);
    })
  }

  private async createUser() {
    this.usuario.enabled = true;
    this.mapperUser();
    await this.findLogin();
    await this.findTenant();
    this.userDTO.createdDate = new Date();
    this.usuarioService.createUserDTO(this.userDTO).subscribe(res => {
      this.userDTO = res.body;
      this.usuarioService.create(this.usuario).subscribe(res => {
        this.usuario = res.body;
        if (this.changefoto) {
          this.savePhoto().subscribe(
            res => {
              this.usuarioPhoto = res.body;
              this.changefoto = false;
              this.route.navigate(['usuarios']);
            }, err => {
              this.erroAlert(err.error.title);
            }
          );
        }
        if (this.usuarioTelefones.length > 0) {
          this.saveAllTelefones().subscribe(res => {
            let list = res.body;
            this.usuarioTelefones = list.usuarioTelefones;
          },
            err => {
              console.log(err.error);
            });
        }
      });
    })


  }

  async addTelefone(tel: Telefone) {
    let usuarioTelefone = new UsuarioTelefone();
    let _tel = new Telefone();
    _tel.ddd = tel.ddd;
    _tel.telefone = tel.telefone
    usuarioTelefone.telefone = _tel;
    usuarioTelefone.usuario = this.usuario;

    if (!this.newuser) {
      this.saveTelefone(usuarioTelefone);
    } else {
      this.usuarioTelefones.push(usuarioTelefone);
    }
  }

  saveAllTelefones(): Observable<HttpResponse<any>> {
    let usuarioTelefonelist = new UsuarioTelefoneList();
    usuarioTelefonelist.usuarioTelefones = this.usuarioTelefones;
    return this.usuarioTelefoneService.saveDTO(usuarioTelefonelist);
  }

  async saveTelefone(usuarioTelefone: UsuarioTelefone) {
    
    const loading = await this.loadingController.create({
      message: 'Adicionando telefone ...'
    });
    await loading.present();

    this.usuarioTelefoneService.save(usuarioTelefone).subscribe(res => {
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
    if (!this.newuser) {
      this.usuarioTelefoneService.delete(usuarioTelefone.idusuarioTelefone).subscribe(res => {
        loading.dismiss();
        if (this.usuarioTelefones.length == 1) {
          this.usuarioTelefones.length = 0;
        } else {
          this.usuarioTelefones = this.usuarioTelefones.filter(e1 => {
            return e1.telefone.idtelefone !== usuarioTelefone.telefone.idtelefone
          });
        }
      },
        err => {
          loading.dismiss();
          this.erroAlert("Erro ao excluir telefone.");
        });
    } else {
      loading.dismiss();
      this.usuarioTelefones = this.usuarioTelefones.filter(e1 => {
        return (e1.telefone.ddd !== usuarioTelefone.telefone.ddd) && (e1.telefone.telefone !== usuarioTelefone.telefone.telefone)
      });

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
      console.log(err);
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
  async erroAlert(_message: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: _message,
      buttons: [
        {
          text: 'OK',
          cssClass: 'danger',
        }]
    });

    await alert.present();
  }
  async sucessAlert(_message: string) {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: _message,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
        }]
    });

    await alert.present();
  }

  changeAuthority(entry: AuthorityDTO) {
    console.log("Antes: "+ this.userDTO.authorities);

    if (entry.selected) {
      if (entry.authority_name === Authority.ROLE_ADMIN) {
        for (let aut of this.authorityDTOs) {
          aut.selected = true;
        }
      } 
      console.log("Contais: "+ this.userDTO.authorities.indexOf(entry.authority));
      if(this.userDTO.authorities.indexOf(entry.authority) == -1){
      this.userDTO.authorities.push(entry.authority);
      }
        
    } else{
      let index = this.userDTO.authorities.indexOf(entry.authority);
      console.log("Removeu "+index+" role "+ entry.authority);
      this.userDTO.authorities.splice(index,1);
    }
    console.log("Depois: "+ this.userDTO.authorities);
  }

  generateAuthority(authority: Array<string>) {
    let _authority: Array<string> = Object.keys(Authority);
    this.authorityDTOs = new Array<AuthorityDTO>();
    for (let aut of _authority) {
      let authorityDTO = new AuthorityDTO();
      authorityDTO.authority_name = Authority[aut];
      authorityDTO.authority = aut;
      if (authority.includes(aut)) {
        authorityDTO.selected = true;
      } else {
        authorityDTO.selected = false;
      }
      this.authorityDTOs.push(authorityDTO);
    }
  }

  private mapperUser(): void {
    this.userDTO.login = this.usuario.login;
    this.userDTO.email = this.usuario.email;
    this.userDTO.firstName = this.usuario.nome;
    this.userDTO.activated = this.usuario.enabled;
  }
}
