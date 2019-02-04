var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { ResponsavelPhoto } from '../models/responsavelphoto';
import { ResponsavelTelefone } from '../models/responsaveltelefone';
import { Telefone } from '../models/telefone';
import { ResponsavelService } from '../services/responsavel-service';
import { ResponsavelPacienteService } from '../services/responsavelpaciente-service';
import { ResponsavelPhotoService } from '../services/responsavelphoto-service';
import { ResponsavelTelefoneService } from '../services/responsaveltelefone-service';
import { ResponsavelTelefoneList } from '../models/responsavelTelefoneList';
var ResponsavelPage = /** @class */ (function () {
    function ResponsavelPage(loadingController, responsavelService, responsavelPacienteService, responsavelPhotoService, responsavelTelefoneService, router, camera, platform, alertController) {
        this.loadingController = loadingController;
        this.responsavelService = responsavelService;
        this.responsavelPacienteService = responsavelPacienteService;
        this.responsavelPhotoService = responsavelPhotoService;
        this.responsavelTelefoneService = responsavelTelefoneService;
        this.router = router;
        this.camera = camera;
        this.platform = platform;
        this.alertController = alertController;
        this.mobile = false;
        this.masculino = false;
        this.feminino = false;
        this.changefoto = false;
        this.mobile = false;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.mobile = true;
        }
    }
    ResponsavelPage.prototype.ngOnInit = function () {
        this.responsavelPaciente = this.responsavelService.responsavelPaciente;
        this.responsavelPhoto = this.responsavelPaciente.responsavel.responsavelPhoto;
        this.responsavelTelefones = this.responsavelPaciente.responsavel.responsavelTelefones;
    };
    ResponsavelPage.prototype.ionViewWillEnter = function () {
        this.responsavelTelefoneList = new ResponsavelTelefoneList();
        this.responsavelPaciente = this.responsavelService.responsavelPaciente;
        this.responsavelPhoto = this.responsavelPaciente.responsavel.responsavelPhoto;
        this.responsavelTelefones = this.responsavelPaciente.responsavel.responsavelTelefones;
        if (!this.responsavelTelefones) {
            this.responsavelTelefones = new Array();
        }
        if (!this.responsavelPhoto) {
            this.responsavelPhoto = new ResponsavelPhoto();
        }
        if (this.responsavelPaciente.responsavel.genero) {
            this.masculino = true;
        }
        else {
            this.feminino = true;
        }
        this.changefoto = false;
    };
    ResponsavelPage.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, rp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Salvando ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        rp = __assign({}, this.responsavelPaciente);
                        rp.responsavel.responsavelPhoto = null;
                        rp.responsavel.responsavelTelefones = null;
                        this.responsavelPacienteService.save(rp)
                            .subscribe(function (res) {
                            _this.responsavelPaciente = res.body;
                            _this.savePhoto();
                            _this.saveTelefone();
                            loading.dismiss();
                            _this.router.navigate(['responsaveis']);
                        }, function (err) {
                            console.log(err);
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ResponsavelPage.prototype.savePhoto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.changefoto) {
                    this.responsavelPhoto.idresponsavel = this.responsavelPaciente.responsavel.idresponsavel;
                    this.responsavelPhotoService.save(this.responsavelPhoto).subscribe(function (res) {
                        _this.responsavelPhoto = res.body;
                        _this.changefoto = false;
                    }, function (err) {
                        console.log(err);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    ResponsavelPage.prototype.delete = function () {
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
                        this.responsavelService.delete(this.responsavelPaciente.responsavel).subscribe(function (res) {
                            loading.dismiss();
                            _this.router.navigate(['responsaveis']);
                            loading.dismiss();
                        }, function (err) {
                            console.log(err);
                            loading.dismiss();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ResponsavelPage.prototype.loadPhoto = function () {
        if (!this.mobile) {
            document.getElementById('file').click();
        }
        else {
            this.takePicture();
        }
    };
    ResponsavelPage.prototype.atualizaArquivo = function (event) {
        var _this = this;
        if (!this.mobile) {
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(event.srcElement.files[0]);
            reader_1.onload = function () {
                _this.responsavelPhoto.photo = reader_1.result.toString();
                _this.changefoto = true;
            };
            reader_1.onerror = function (error) { return console.log(error); };
        }
    };
    ResponsavelPage.prototype.takePicture = function () {
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
            _this.responsavelPhoto.photo = base64Image;
            _this.changefoto = true;
            _this.camera.cleanup();
        }, function (err) {
            console.log(err);
        });
    };
    ResponsavelPage.prototype.addTelefone = function (tel) {
        var responsavelTelefone = new ResponsavelTelefone();
        var _tel = new Telefone();
        _tel.ddd = tel.ddd;
        _tel.telefone = tel.telefone;
        responsavelTelefone.telefone = _tel;
        responsavelTelefone.responsavel = this.responsavelPaciente.responsavel;
        this.responsavelTelefones.push(responsavelTelefone);
        this.responsavelTelefoneList.responsavelTelefones.push(responsavelTelefone);
    };
    ResponsavelPage.prototype.saveTelefone = function () {
        var _this = this;
        if (this.responsavelTelefoneList.responsavelTelefones.length > 0) {
            this.responsavelTelefoneList.responsavelTelefones.map(function (e1) {
                e1.responsavel = _this.responsavelPaciente.responsavel;
            });
            this.responsavelTelefoneService.saveDTO(this.responsavelTelefoneList).subscribe(function (res) {
                _this.responsavelTelefoneList = res.body;
            }, function (err) {
                console.log(err);
            });
        }
    };
    ResponsavelPage.prototype.delTelefone = function (responsavelTelefone) {
        var _this = this;
        if (responsavelTelefone.idresponsavelTelefone) {
            this.responsavelTelefoneService.delete(responsavelTelefone.idresponsavelTelefone).subscribe(function (res) {
                _this.responsavelTelefones = _this.responsavelTelefones.filter(function (e1) {
                    return e1.telefone.idtelefone !== responsavelTelefone.telefone.idtelefone;
                });
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.responsavelTelefones = this.responsavelTelefones.filter(function (e1) {
                return e1.telefone.ddd !== responsavelTelefone.telefone.ddd && e1.telefone.telefone !== responsavelTelefone.telefone.telefone;
            });
        }
    };
    ResponsavelPage.prototype.changeMasculino = function () {
        this.feminino = !this.masculino;
        this.responsavelPaciente.responsavel.genero = this.masculino;
    };
    ResponsavelPage.prototype.changeFeminino = function () {
        this.masculino = !this.feminino;
        this.responsavelPaciente.responsavel.genero = this.masculino;
    };
    ResponsavelPage.prototype.deleteResponsavel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Excluir',
                            message: '<strong>Tem certeza?</strong>',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Confirmar',
                                    handler: function () {
                                        _this.responsavelService.delete(_this.responsavelPaciente.responsavel).subscribe(function (res) {
                                            _this.router.navigate(['responsaveis']);
                                        }, function (err) {
                                            console.log(err);
                                        });
                                        console.log('Confirm Okay');
                                    }
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
    ResponsavelPage = __decorate([
        Component({
            selector: 'app-responsavel',
            templateUrl: './responsavel.page.html',
            styleUrls: ['./responsavel.page.scss'],
        }),
        __metadata("design:paramtypes", [LoadingController,
            ResponsavelService,
            ResponsavelPacienteService,
            ResponsavelPhotoService,
            ResponsavelTelefoneService,
            Router,
            Camera,
            Platform,
            AlertController])
    ], ResponsavelPage);
    return ResponsavelPage;
}());
export { ResponsavelPage };
//# sourceMappingURL=responsavel.page.js.map