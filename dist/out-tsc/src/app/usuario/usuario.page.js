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
import { AuthServerProvider } from '../services/auth-jwt.service';
import { UsuarioService } from '../services/usuario-service';
import { Usuario } from '../models/usuario';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { UsuarioPhoto } from '../models/usuariophoto';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { UsuarioTelefone } from '../models/usuariotelefone';
import { Telefone } from '../models/telefone';
import { UsuarioTelefoneService } from '../services/usuarioTelefone-service';
import { UsuarioPhotoService } from '../services/usuariophoto-service';
var UsuarioPage = /** @class */ (function () {
    function UsuarioPage(authServerProvider, usuarioSevice, usuarioTelefoneSevice, usuarioPhotoService, platform, camera, loadingController, alertController) {
        this.authServerProvider = authServerProvider;
        this.usuarioSevice = usuarioSevice;
        this.usuarioTelefoneSevice = usuarioTelefoneSevice;
        this.usuarioPhotoService = usuarioPhotoService;
        this.platform = platform;
        this.camera = camera;
        this.loadingController = loadingController;
        this.alertController = alertController;
        this.mobile = false;
        this.changefoto = false;
        this.masculino = false;
        this.feminino = false;
        this.mobile = false;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.mobile = true;
        }
    }
    UsuarioPage.prototype.ngOnInit = function () {
        var _this = this;
        this.changefoto = false;
        this.usuarioPhoto = new UsuarioPhoto();
        this.usuarioTelefones = new Array();
        this.usuario = new Usuario();
        this.authServerProvider.user().then(function (login) {
            _this.usuarioSevice.get(login).subscribe(function (res) {
                _this.usuario = res.body;
                if (_this.usuario.usuarioPhoto) {
                    _this.usuarioPhoto = _this.usuario.usuarioPhoto;
                }
                if (_this.usuario.genero) {
                    _this.masculino = true;
                }
                else {
                    _this.feminino = true;
                }
                _this.usuarioTelefoneSevice.get(_this.usuario.login).subscribe(function (res) {
                    _this.usuarioTelefones = res.body;
                });
            });
        });
    };
    UsuarioPage.prototype.loadPhoto = function () {
        if (!this.mobile) {
            document.getElementById('file').click();
        }
        else {
            this.takePicture();
        }
    };
    UsuarioPage.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Excluindo ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.usuarioSevice.update(this.usuario).subscribe(function (res) {
                            _this.usuario = res.body;
                            loading.dismiss();
                            _this.savePhoto();
                            _this.sucessAlert("Salvo com sucesso");
                        }, function (err) {
                            loading.dismiss();
                            _this.erroAlert(err.error.title);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioPage.prototype.savePhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.changefoto) {
                    this.usuarioPhoto.login = this.usuario.login;
                    this.usuarioPhotoService.save(this.usuarioPhoto).subscribe(function (res) {
                        _this.usuarioPhoto = res.body;
                        _this.changefoto = false;
                    }, function (err) {
                        _this.erroAlert(err.error.title);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    UsuarioPage.prototype.atualizaArquivo = function (event) {
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
    UsuarioPage.prototype.takePicture = function () {
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
    UsuarioPage.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Excluindo ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.usuarioSevice.desactiveUserDTO(this.usuario.login).subscribe(function (res) {
                            _this.usuarioSevice.delete(_this.usuario).subscribe(function (res) {
                            }, function (err) {
                                console.log(err);
                            });
                        });
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioPage.prototype.addTelefone = function (tel) {
        return __awaiter(this, void 0, void 0, function () {
            var loading, usuarioTelefone, _tel;
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
                        usuarioTelefone = new UsuarioTelefone();
                        _tel = new Telefone();
                        _tel.ddd = tel.ddd;
                        _tel.telefone = tel.telefone;
                        usuarioTelefone.telefone = _tel;
                        usuarioTelefone.usuario = this.usuario;
                        this.usuarioTelefoneSevice.save(usuarioTelefone).subscribe(function (res) {
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
    UsuarioPage.prototype.delTelefone = function (usuarioTelefone) {
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
                        this.usuarioTelefoneSevice.delete(usuarioTelefone.idusuarioTelefone).subscribe(function (res) {
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioPage.prototype.changeMasculino = function () {
        this.feminino = !this.masculino;
        this.usuario.genero = this.masculino;
    };
    UsuarioPage.prototype.changeFeminino = function () {
        this.masculino = !this.feminino;
        this.usuario.genero = this.masculino;
    };
    UsuarioPage.prototype.erroAlert = function (_message) {
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
    UsuarioPage.prototype.sucessAlert = function (_message) {
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
    UsuarioPage = __decorate([
        Component({
            selector: 'app-usuario',
            templateUrl: './usuario.page.html',
            styleUrls: ['./usuario.page.scss'],
        }),
        __metadata("design:paramtypes", [AuthServerProvider,
            UsuarioService,
            UsuarioTelefoneService,
            UsuarioPhotoService,
            Platform,
            Camera,
            LoadingController,
            AlertController])
    ], UsuarioPage);
    return UsuarioPage;
}());
export { UsuarioPage };
//# sourceMappingURL=usuario.page.js.map