import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServerProvider } from 'src/app/services/auth-jwt.service';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {};
  constructor(private authService: AuthServerProvider,private router: Router, 
    private menuCtrl: MenuController, public toastController: ToastController) { }

  ngOnInit() {
    
  }

  

  login(user) {
    this.authService.login(user).subscribe((data)=>{
      this.user = {};
      this.menuCtrl.enable(true);
    },(err) => {
      let error = err.error;
      if(err.error.type === "error"){
        error = "Não é possível acessar o sistema. Sistema em manutenção."
      }
      if(err.error.status === 401){
        error ="Usuário ou senha inválidos."
      }
      this.presentToast(error);
    }
    );
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
