import { Component, OnInit } from '@angular/core';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authServerProvider: AuthServerProvider, private menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authServerProvider.logout();
    this.menuCtrl.enable(false);
  }

  cancel() {
    this.router.navigate(['home']);
  }
}
