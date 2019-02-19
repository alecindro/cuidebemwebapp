import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { Api } from "./api/api";
import { tap } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "./usuario-service";
import { UsuarioPhoto } from "../models/usuariophoto";

const FILTER_AUTH = "TENANT";
const TOKEN_KEY = "id_token";

@Injectable({ providedIn: "root" })
export class AuthServerProvider {
  jwtHelper: JwtHelperService = new JwtHelperService();

  //authUser = new ReplaySubject<any>(1);

  usuarioReplay = new ReplaySubject<Usuario>(1);

  usuario: Usuario;
  roles: string[];

  constructor(
    private readonly api: Api,
    private usuarioService: UsuarioService,
    private readonly storage: Storage,
    private router: Router
  ) {

    //this.subscribeUsuario();
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, _) => {
      this.storage.get(TOKEN_KEY).then(jwt => {
        if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
         // this.authUser.next(jwt);
         if(!this.usuario){
          
          this.handleJwtResponse(jwt);
         }
          resolve(true);

          //   this.storage.remove(TOKEN_KEY).then(() => this.authUser.next(null));
          //  resolve(false);

          // OR
          // this.authUser.next(jwt);
        } else {
        //this.storage.remove(TOKEN_KEY).then(() => {
            //this.authUser.next(null);
            this.logout();
            resolve(false);
         // });
        }
      });

    });
  }

  user(): Promise<string> {
    return this.storage.get(TOKEN_KEY).then(jwt => {
      return this.jwtHelper.decodeToken(jwt).sub;
    });
  }

  checkLogin() {
    this.storage.get(TOKEN_KEY).then(jwt => {
      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
        this.api
          .get("sec/authenticate")
          .subscribe(
            text => this.handleJwtResponse(jwt),
            err => this.logout()
          );
      } else {
        this.logout();
      }
    });
  }

  login(values: any): Observable<any> {
    return this.api.post("sec/authenticate", values).pipe(
      tap(response => {
        this.handleJwtResponse(response.body.id_token);
        this.router.navigate(["home"]);
      })
    );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      //this.authUser.next(null);
      this.usuarioReplay.next(null);
      this.roles = null;
      this.usuario = null;
      this.router.navigate(["login"]);
    });
  }

  signup(values: any): Observable<any> {
    return this.api.post("signup", values).pipe(
      tap(jwt => {
        if (jwt !== "EXISTS") {
          return this.handleJwtResponse(jwt);
        }
        return jwt;
      })
    );
  }

  private subscribeUsuario(){
  this.usuarioReplay.subscribe(user =>{
    if(user){
    if (!user.usuarioPhoto) {
        let usuarioPhoto = new UsuarioPhoto();
        usuarioPhoto.photo = "../assets/imgs/rsz_1no-avatar.jpg";  
        user.usuarioPhoto = usuarioPhoto;
    }
    this.usuario = user;
  }
  
  });
}


/*
  async getUsuario(): Promise<Usuario> {
  /*  return await this.usuario.asObservable().toPromise().then(user =>{
        console.log("Usuario auth: "+user);
        return user;
    });*/
    /*if(!this.usuario){
            let login = await this.user();
            this.usuarioService.getUsuario(login).then(user=> {
                this.usuario = user;
            })
        }
        return this.usuario;
}*/

  private handleJwtResponse(jwt: string) {
    return this.storage
      .set(TOKEN_KEY, jwt)
      //.then(() => this.authUser.next(jwt))
      .then(() => jwt)
      .then(() => {
        this.subscribeUsuario();
       // this.getRoles(jwt);
        this.user().then(login => {
          this.usuarioService.getUsuario(login).then(user => {
            this.usuarioReplay.next(user);
          });
        });
      });
  }

  getTenantNow(): Promise<string> {
    return this.storage.get(TOKEN_KEY).then(jwt => {
      return this.tenant(jwt);
    });
  }

  tenant(token: any) {
    if (token) {
      if(!this.roles){
        this.getRoles(token);
      }
      return this.roles.reduce((pre, elem) => {
        if (elem.startsWith(FILTER_AUTH)) {
          return elem;
        }
      }, null);
    }
  }

  getRoles(token: any){
    this.roles =  this.jwtHelper.decodeToken(token).auth.split(",");
  }



 hasAnyAuthorityDirect(authorities: string[]): boolean {
  for (let i = 0; i < authorities.length; i++) {
    if(authorities[i] === 'ROLE_ANONYMOUS'){
      return true;
    }
   if(this.roles){
    if (this.roles.includes(authorities[i])) {
          return true;
      }
    }
}

  return false;
}
hasAnyAuthority(authorities: string[]): Promise<boolean> {
  return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
}

getAuthenticationState(): Observable<any> {
  return this.usuarioReplay.asObservable();
}

}
