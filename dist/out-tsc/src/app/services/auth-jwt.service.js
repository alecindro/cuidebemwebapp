var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Api } from "./api/api";
import { tap } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { UsuarioService } from "./usuario-service";
import { UsuarioPhoto } from "../models/usuariophoto";
var FILTER_AUTH = "TENANT";
var TOKEN_KEY = "id_token";
var AuthServerProvider = /** @class */ (function () {
    function AuthServerProvider(api, usuarioService, storage, router) {
        this.api = api;
        this.usuarioService = usuarioService;
        this.storage = storage;
        this.router = router;
        this.jwtHelper = new JwtHelperService();
        this.authUser = new ReplaySubject(1);
        this.usuarioReplay = new ReplaySubject(1);
        this.subscribeUsuario();
    }
    AuthServerProvider.prototype.user = function () {
        var _this = this;
        return this.storage.get(TOKEN_KEY).then(function (jwt) {
            return _this.jwtHelper.decodeToken(jwt).sub;
        });
    };
    AuthServerProvider.prototype.checkLogin = function () {
        var _this = this;
        this.storage.get(TOKEN_KEY).then(function (jwt) {
            if (jwt && !_this.jwtHelper.isTokenExpired(jwt)) {
                _this.api
                    .get("sec/authenticate")
                    .subscribe(function (text) { return _this.handleJwtResponse(jwt); }, function (err) { return _this.logout(); });
            }
            else {
                _this.logout();
            }
        });
    };
    AuthServerProvider.prototype.login = function (values) {
        var _this = this;
        return this.api.post("sec/authenticate", values).pipe(tap(function (response) {
            _this.handleJwtResponse(response.body.id_token);
            _this.router.navigate(["home"]);
        }));
    };
    AuthServerProvider.prototype.logout = function () {
        var _this = this;
        this.storage.remove(TOKEN_KEY).then(function () {
            _this.authUser.next(null);
            _this.usuarioReplay.next(null);
            _this.router.navigate(["login"]);
        });
    };
    AuthServerProvider.prototype.signup = function (values) {
        var _this = this;
        return this.api.post("signup", values).pipe(tap(function (jwt) {
            if (jwt !== "EXISTS") {
                return _this.handleJwtResponse(jwt);
            }
            return jwt;
        }));
    };
    AuthServerProvider.prototype.subscribeUsuario = function () {
        var _this = this;
        this.usuarioReplay.subscribe(function (user) {
            if (user) {
                if (!user.usuarioPhoto) {
                    var usuarioPhoto = new UsuarioPhoto();
                    usuarioPhoto.photo = "../assets/imgs/rsz_1no-avatar.jpg";
                    user.usuarioPhoto = usuarioPhoto;
                }
                _this.usuario = user;
            }
        });
    };
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
    AuthServerProvider.prototype.handleJwtResponse = function (jwt) {
        var _this = this;
        return this.storage
            .set(TOKEN_KEY, jwt)
            .then(function () { return _this.authUser.next(jwt); })
            .then(function () { return jwt; })
            .then(function () {
            _this.user().then(function (login) {
                _this.usuarioService.getUsuario(login).then(function (user) {
                    _this.usuarioReplay.next(user);
                });
            });
        });
    };
    AuthServerProvider.prototype.getTenantNow = function () {
        var _this = this;
        return this.storage.get(TOKEN_KEY).then(function (jwt) {
            return _this.tenant(jwt);
        });
    };
    AuthServerProvider.prototype.tenant = function (token) {
        if (token) {
            if (!this.roles) {
                this.getRoles(token);
            }
            return this.roles.reduce(function (pre, elem) {
                if (elem.startsWith(FILTER_AUTH)) {
                    return elem;
                }
            }, null);
        }
    };
    AuthServerProvider.prototype.getRoles = function (token) {
        this.roles = this.jwtHelper.decodeToken(token).auth.split(",");
    };
    AuthServerProvider.prototype.isAuthenticated = function () {
        var _this = this;
        return new Promise(function (resolve, _) {
            _this.storage.get(TOKEN_KEY).then(function (jwt) {
                if (jwt && !_this.jwtHelper.isTokenExpired(jwt)) {
                    _this.authUser.next(jwt);
                    resolve(true);
                    //   this.storage.remove(TOKEN_KEY).then(() => this.authUser.next(null));
                    //  resolve(false);
                    // OR
                    // this.authUser.next(jwt);
                }
                else {
                    _this.storage.remove(TOKEN_KEY).then(function () {
                        _this.authUser.next(null);
                        resolve(false);
                    });
                }
            });
            /*this.authUser.subscribe((jwt) => {
                      if (jwt) {
                          resolve(true);
                      } else {
                          resolve(false);
                      }
                  });*/
        });
    };
    AuthServerProvider.prototype.getAuthenticationState = function () {
        return this.authUser.asObservable();
    };
    AuthServerProvider.prototype.hasAnyAuthorityDirect = function (authorities) {
        var _this = this;
        this.isAuthenticated().then(function (res) {
            if (!res || !_this.usuario || !_this.roles) {
                return false;
            }
        });
        for (var i = 0; i < authorities.length; i++) {
            if (this.roles.includes(authorities[i])) {
                return true;
            }
        }
        return false;
    };
    AuthServerProvider.prototype.hasAnyAuthority = function (authorities) {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    };
    AuthServerProvider = __decorate([
        Injectable({ providedIn: "root" }),
        __metadata("design:paramtypes", [Api,
            UsuarioService,
            Storage,
            Router])
    ], AuthServerProvider);
    return AuthServerProvider;
}());
export { AuthServerProvider };
//# sourceMappingURL=auth-jwt.service.js.map