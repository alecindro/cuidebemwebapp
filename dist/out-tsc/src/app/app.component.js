var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router, NavigationEnd } from "@angular/router";
import { Component } from "@angular/core";
import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthServerProvider } from "./services/auth-jwt.service";
import { UsuarioService } from "./services/usuario-service";
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, authServerProvider, router, menuCtrl, usuarioService) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authServerProvider = authServerProvider;
        this.router = router;
        this.menuCtrl = menuCtrl;
        this.usuarioService = usuarioService;
        this.pages = [
            { title: "Home", url: "/home" },
            { title: "Cadastros", url: "/cadastros" },
            { title: "Configurações", url: "/configuracoes" },
            { title: "Sair", url: "/logout" }
        ];
        this.initializeApp();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd && event.url === "/login") {
                _this.menuCtrl.enable(false);
            }
            if (event instanceof NavigationEnd) {
                _this.pages.map(function (p) {
                    return (p["active"] = event.url === p.url);
                });
            }
        });
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.authServerProvider.isAuthenticated().then(function (value) {
                if (value) {
                    _this.router.navigate(['home']);
                }
                else {
                    _this.router.navigate(['login']);
                }
            });
            _this.authServerProvider.usuarioReplay.subscribe(function (user) {
                if (user) {
                    _this.usuario = user;
                    _this.photo = _this.usuario.usuarioPhoto.photo;
                }
            });
        });
    };
    AppComponent = __decorate([
        Component({
            selector: "app-root",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthServerProvider,
            Router,
            MenuController,
            UsuarioService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map