import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordChangeDTO } from '../models/passwordchangeDTO';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario-service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.page.html',
  styleUrls: ['./senha.page.scss'],
})
export class SenhaPage implements OnInit {

  passwordChangeDTO: PasswordChangeDTO;
  repitaSenha: string;
  senhaValidate: boolean = true;
  type: string = "password";
  
  constructor(private route: Router, public alertController: AlertController, private usuarioService: UsuarioService) {
    this.passwordChangeDTO = new PasswordChangeDTO();
   }

  ngOnInit() {
  }

  mousedown(){
    this.type = "text";
  }
  mouseup(){
    this.type = "password";
  }

  save(){
    if(this.passwordChangeDTO.currentPassword === this.passwordChangeDTO.newPassword){
      this.presentAlert('A nova senha deve ser diferente da atual');
      return;
    }
    this.senhaValidate = false;
    if(this.passwordChangeDTO.newPassword === this.repitaSenha){
      this.senhaValidate = true;
      this.usuarioService.changePassowrd(this.passwordChangeDTO).subscribe(res =>{
        this.confirmChange();
      },
      (err => { 
        this.presentAlert(err.error.title)}));
    }
    
  }

  async presentAlert(_message : string) {
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

  async confirmChange() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Sua senha foi alterada com sucesso',
      buttons: [{
        text: 'OK',
        handler: ()=>{
          this.route.navigateByUrl('/configuracoes');
        }
      }],
      
    });

    await alert.present();
  }
}
