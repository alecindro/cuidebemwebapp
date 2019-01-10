import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServerProvider } from 'src/app/services/auth-jwt.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {};
  constructor(private authService: AuthServerProvider,private router: Router, private menuCtrl: MenuController) { }

  ngOnInit() {
    
  }

  

  login(user) {
    this.authService.login(user).subscribe((data)=>{
      this.user = {};
      this.menuCtrl.enable(true);
    },(err) => {
      alert(err.message);
    }
    );
  }
 
}
