import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../models/user';
import { AuthServerProvider } from './auth-jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const TOKEN_KEY = 'id_token';
export const AUTH = 'htua';



export class AuthenticationServiceXPTO {

  helper = new JwtHelperService();
  authenticationState = new BehaviorSubject(false);
  
  constructor(
    private plt: Platform,
    private authServerProvider: AuthServerProvider,
    private storage: Storage
) {
    this.plt.ready().then(() => {
        this.checkToken();
    });
}
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(user: User) {
    return new Promise((resolve, reject) => {
      // TODO remove this, i'm login in to test dashboard page
      // this.authenticationState.next(true);
      // return;
      this.authServerProvider.login({
          username: user.username,
          password: user.password
      }).subscribe(
          data => {
            this.storage.set(TOKEN_KEY, data.body.id_token).then(() => {
              this.storage.set(AUTH,this.helper.decodeToken(data.body.id_token).auth).then(() => {
              this.authenticationState.next(true);
              return data;
              });
            });
              
          },
          err => {
              this.logout();
              reject(err);
              return err;
          }
      );
  });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
  
}
