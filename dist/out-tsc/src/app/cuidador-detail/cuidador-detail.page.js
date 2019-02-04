var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { UsuarioPhotoService } from '../services/usuariophoto-service';
import { UsuarioService } from '../services/usuario-service';
import { Telefone } from '../models/telefone';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { UsuarioTelefone } from '../models/usuariotelefone';
import { UsuarioTelefoneService } from '../services/usuarioTelefone-service';
import { Authority } from '../models/authority';
import { AuthorityDTO } from '../models/authoritydto';
import { UserDTO } from '../models/userDTO';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { Router } from '@angular/router';
import { UsuarioTelefoneList } from '../models/usuarioTelefoneList';
var CuidadorDetailPage = /** @class */ (function () {
    function CuidadorDetailPage(usuarioPhotoService, authServerProvider, usuarioService, usuarioTelefoneService, alertController, platform, camera, loadingController, route) {
        this.usuarioPhotoService = usuarioPhotoService;
        this.authServerProvider = authServerProvider;
        this.usuarioService = usuarioService;
        this.usuarioTelefoneService = usuarioTelefoneService;
        this.alertController = alertController;
        this.platform = platform;
        this.camera = camera;
        this.loadingController = loadingController;
        this.route = route;
        this.mobile = false;
        this.masculino = false;
        this.feminino = false;
        this.changefoto = false;
        this.mobile = false;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.mobile = true;
        }
    }
    CuidadorDetailPage.prototype.ngOnInit = function () {
        this.usuarioPhoto = this.usuarioPhotoService.usuarioPhoto;
        this.usuario = this.usuarioPhoto.usuario;
        this.newuser = true;
        if (this.usuario.login) {
            this.newuser = false;
        }
        this.telefone = new Telefone();
        this.loadAuthorities();
        this.loadTelefones();
        if (this.usuario.genero) {
            this.masculino = true;
        }
        else {
            this.feminino = true;
        }
        this.changefoto = false;
    };
    CuidadorDetailPage.prototype.loadTelefones = function () {
        var _this = this;
        this.usuarioTelefones = new Array();
        if (!this.newuser) {
            this.usuarioTelefoneService.get(this.usuario.login).subscribe(function (res) {
                _this.usuarioTelefones = res.body;
            }, function (err) {
                console.log(err.error);
            });
        }
    };
    CuidadorDetailPage.prototype.loadAuthorities = function () {
        var _this = this;
        if (!this.newuser) {
            this.usuarioService.getUserDTO(this.usuario.login).subscribe(function (res) {
                _this.userDTO = res.body;
                _this.generateAuthority(_this.userDTO.authorities);
            });
        }
        else {
            this.generateAuthority(new Array());
            this.userDTO = new UserDTO();
            this.userDTO.authorities = new Array();
        }
    };
    CuidadorDetailPage.prototype.delete = function () {
        var _this = this;
        this.usuarioService.desactiveUserDTO(this.userDTO.login).subscribe(function (res) {
            _this.userDTO = res.body;
            _this.usuarioService.delete(_this.usuario).subscribe(function (res) {
                _this.usuario = res.body;
                _this.route.navigate(['usuarios']);
            });
        }, function (err) {
            console.log(err.error);
        });
    };
    CuidadorDetailPage.prototype.save = function () {
        if (!this.newuser) {
            this.updateUser();
        }
        else {
            this.createUser();
        }
    };
    CuidadorDetailPage.prototype.savePhoto = function () {
        this.usuarioPhoto.login = this.usuario.login;
        return this.usuarioPhotoService.save(this.usuarioPhoto);
    };
    CuidadorDetailPage.prototype.findLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.authServerProvider.user().then(function (login) {
                    if (!_this.newuser) {
                        _this.userDTO.lastModifiedBy = login;
                    }
                    else {
                        _this.userDTO.createdBy = login;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CuidadorDetailPage.prototype.findTenant = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.authServerProvider.getTenantNow().then(function (tenant) {
                    _this.userDTO.authorities.push(tenant);
                });
                return [2 /*return*/];
            });
        });
    };
    CuidadorDetailPage.prototype.updateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.usuario.enabled = true;
                        this.mapperUser();
                        this.userDTO.lastModifiedDate = new Date();
                        return [4 /*yield*/, this.findLogin()];
                    case 1:
                        _a.sent();
                        this.usuarioService.updateUserDTO(this.userDTO).subscribe(function (res) {
                            _this.userDTO = res.body;
                            _this.usuarioService.update(_this.usuario).subscribe(function (res) {
                                _this.usuario = res.body;
                                if (_this.changefoto) {
                                    _this.savePhoto().subscribe(function (res) {
                                        _this.usuarioPhoto = res.body;
                                        _this.changefoto = false;
                                        _this.route.navigate(['usuarios']);
                                    }, function (err) {
                                        _this.erroAlert(err.error.title);
                                    });
                                }
                                else {
                                    _this.route.navigate(['usuarios']);
                                }
                            }, function (err) {
                                _this.erroAlert(err.error.title);
                            });
                        }, function (err) {
                            _this.erroAlert(err.error.title);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CuidadorDetailPage.prototype.createUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.usuario.enabled = true;
                        this.mapperUser();
                        return [4 /*yield*/, this.findLogin()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.findTenant()];
                    case 2:
                        _a.sent();
                        this.userDTO.createdDate = new Date();
                        this.usuarioService.createUserDTO(this.userDTO).subscribe(function (res) {
                            _this.userDTO = res.body;
                            _this.usuarioService.create(_this.usuario).subscribe(function (res) {
                                _this.usuario = res.body;
                                if (_this.changefoto) {
                                    _this.savePhoto().subscribe(function (res) {
                                        _this.usuarioPhoto = res.body;
                                        _this.changefoto = false;
                                        _this.route.navigate(['usuarios']);
                                    }, function (err) {
                                        _this.erroAlert(err.error.title);
                                    });
                                }
                                if (_this.usuarioTelefones.length > 0) {
                                    _this.saveAllTelefones().subscribe(function (res) {
                                        var list = res.body;
                                        _this.usuarioTelefones = list.usuarioTelefones;
                                    }, function (err) {
                                        console.log(err.error);
                                    });
                                }
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CuidadorDetailPage.prototype.addTelefone = function (tel) {
        return __awaiter(this, void 0, void 0, function () {
            var usuarioTelefone, _tel;
            return __generator(this, function (_a) {
                usuarioTelefone = new UsuarioTelefone();
                _tel = new Telefone();
                _tel.ddd = tel.ddd;
                _tel.telefone = tel.telefone;
                usuarioTelefone.telefone = _tel;
                usuarioTelefone.usuario = this.usuario;
                if (!this.newuser) {
                    this.saveTelefone(usuarioTelefone);
                }
                else {
                    this.usuarioTelefones.push(usuarioTelefone);
                }
                return [2 /*return*/];
            });
        });
    };
    CuidadorDetailPage.prototype.saveAllTelefones = function () {
        var usuarioTelefonelist = new UsuarioTelefoneList();
        usuarioTelefonelist.usuarioTelefones = this.usuarioTelefones;
        return this.usuarioTelefoneService.saveDTO(usuarioTelefonelist);
    };
    CuidadorDetailPage.prototype.saveTelefone = function (usuarioTelefone) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Adicionando telefone ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.usuarioTelefoneService.save(usuarioTelefone).subscribe(function (res) {
                            usuarioTelefone = res.body;
                            _this.usuarioTelefones.push(usuarioTelefone);
                            loading.dismiss();
                        }, function (err) {
                            loading.dismiss();
                            _this.erroAlert(err.error.title);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CuidadorDetailPage.prototype.delTelefone = function (usuarioTelefone) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Excluindo telefone ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        if (!this.newuser) {
                            this.usuarioTelefoneService.delete(usuarioTelefone.idusuarioTelefone).subscribe(function (res) {
                                loading.dismiss();
                                if (_this.usuarioTelefones.length == 1) {
                                    _this.usuarioTelefones.length = 0;
                                }
                                else {
                                    _this.usuarioTelefones = _this.usuarioTelefones.filter(function (e1) {
                                        return e1.telefone.idtelefone !== usuarioTelefone.telefone.idtelefone;
                                    });
                                }
                            }, function (err) {
                                loading.dismiss();
                                _this.erroAlert("Erro ao excluir telefone.");
                            });
                        }
                        else {
                            loading.dismiss();
                            this.usuarioTelefones = this.usuarioTelefones.filter(function (e1) {
                                return (e1.telefone.ddd !== usuarioTelefone.telefone.ddd) && (e1.telefone.telefone !== usuarioTelefone.telefone.telefone);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CuidadorDetailPage.prototype.loadPhoto = function () {
        if (!this.mobile) {
            document.getElementById('file').click();
        }
        else {
            this.takePicture();
        }
    };
    CuidadorDetailPage.prototype.atualizaArquivo = function (event) {
        var _this = this;
        if (!this.mobile) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(event.srcElement.files[0]);
            reader_1.onload = function () {
                _this.usuarioPhoto.photo = reader_1.result.toString();
                _this.changefoto = true;
            };
            reader_1.onerror = function (error) { return console.log(error); };
        }
    };
    CuidadorDetailPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.usuarioPhoto.photo = base64Image;
            _this.changefoto = true;
            _this.camera.cleanup();
        }, function (err) {
            console.log(err);
        });
    };
    CuidadorDetailPage.prototype.changeMasculino = function () {
        this.feminino = !this.masculino;
        this.usuario.genero = this.masculino;
    };
    CuidadorDetailPage.prototype.changeFeminino = function () {
        this.masculino = !this.feminino;
        this.usuario.genero = this.masculino;
    };
    CuidadorDetailPage.prototype.erroAlert = function (_message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Atenção',
                            message: _message,
                            buttons: [
                                {
                                    text: 'OK',
                                    cssClass: 'danger',
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CuidadorDetailPage.prototype.sucessAlert = function (_message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Sucesso',
                            message: _message,
                            buttons: [
                                {
                                    text: 'OK',
                                    cssClass: 'secondary',
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CuidadorDetailPage.prototype.changeAuthority = function (entry) {
        console.log("Antes: " + this.userDTO.authorities);
        if (entry.selected) {
            if (entry.authority_name === Authority.ROLE_ADMIN) {
                for (var _i = 0, _a = this.authorityDTOs; _i < _a.length; _i++) {
                    var aut = _a[_i];
                    aut.selected = true;
                }
            }
            console.log("Contais: " + this.userDTO.authorities.indexOf(entry.authority));
            if (this.userDTO.authorities.indexOf(entry.authority) == -1) {
                this.userDTO.authorities.push(entry.authority);
            }
        }
        else {
            var index = this.userDTO.authorities.indexOf(entry.authority);
            console.log("Removeu " + index + " role " + entry.authority);
            this.userDTO.authorities.splice(index, 1);
        }
        console.log("Depois: " + this.userDTO.authorities);
    };
    CuidadorDetailPage.prototype.generateAuthority = function (authority) {
        var _authority = Object.keys(Authority);
        this.authorityDTOs = new Array();
        for (var _i = 0, _authority_1 = _authority; _i < _authority_1.length; _i++) {
            var aut = _authority_1[_i];
            var authorityDTO = new AuthorityDTO();
            authorityDTO.authority_name = Authority[aut];
            authorityDTO.authority = aut;
            if (authority.includes(aut)) {
                authorityDTO.selected = true;
            }
            else {
                authorityDTO.selected = false;
            }
            this.authorityDTOs.push(authorityDTO);
        }
    };
    CuidadorDetailPage.prototype.mapperUser = function () {
        this.userDTO.login = this.usuario.login;
        this.userDTO.email = this.usuario.email;
        this.userDTO.firstName = this.usuario.nome;
        this.userDTO.activated = this.usuario.enabled;
    };
    CuidadorDetailPage = __decorate([
        Component({
            selector: 'app-cuidador-detail',
            templateUrl: './cuidador-detail.page.html',
            styleUrls: ['./cuidador-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [UsuarioPhotoService,
            AuthServerProvider,
            UsuarioService,
            UsuarioTelefoneService,
            AlertController,
            Platform,
            Camera,
            LoadingController,
            Router])
    ], CuidadorDetailPage);
    return CuidadorDetailPage;
}());
export { CuidadorDetailPage };
//# sourceMappingURL=cuidador-detail.page.js.map