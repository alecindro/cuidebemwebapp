import { Router, RouterEvent, NavigationEnd } from "@angular/router";

import { Component, OnInit } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthServerProvider } from "./services/auth-jwt.service";
import { UsuarioService } from "./services/usuario-service";
import { Usuario } from "./models/usuario";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  pages = [
    { title: "Home", url: "/home" },
    { title: "Cadastros", url: "/cadastros" },
    { title: "Configurações", url: "/configuracoes" },
    { title: "Sair", url: "/logout" }
  ];
  usuario: Usuario;
  photo: String;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authServerProvider: AuthServerProvider,
    private router: Router,
    private menuCtrl: MenuController,
    private usuarioService: UsuarioService
  ) {
    
    this.initializeApp();
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd && event.url === "/login") {
        this.menuCtrl.enable(false);
      }
      if (event instanceof NavigationEnd) {
        this.pages.map(p => {
          return (p["active"] = event.url === p.url);
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authServerProvider.isAuthenticated().then((value) => {
        if (value) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
      this.authServerProvider.usuarioReplay.subscribe(user =>{
      if(user){
        this.usuario = user;
      this.photo =this.usuario.usuarioPhoto.photo;
      }
      })
      
  
    });
  }      

}
