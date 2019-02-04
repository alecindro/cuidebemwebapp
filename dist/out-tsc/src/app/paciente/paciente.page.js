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
import { Platform, NavController, LoadingController, AlertController } from '@ionic/angular';
import { PacienteDTO } from 'src/app/models/pacienteDTO';
import { PacientedtoService } from 'src/app/services/pacientedto-service';
import { Patologias } from 'src/app/models/patologias';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
var PacientePage = /** @class */ (function () {
    function PacientePage(pacientedtoService, router, route, loadingController, camera, nav, platform, alertController) {
        this.pacientedtoService = pacientedtoService;
        this.router = router;
        this.route = route;
        this.loadingController = loadingController;
        this.camera = camera;
        this.nav = nav;
        this.platform = platform;
        this.alertController = alertController;
        this.masculino = false;
        this.feminino = false;
        this.mobile = false;
        this.mobile = false;
        if (this.platform.is('ios') || this.platform.is('android')) {
            this.mobile = true;
        }
    }
    PacientePage.prototype.ngOnInit = function () {
        this.pacienteDTO = this.pacientedtoService.pacienteDTO;
        if (!this.pacienteDTO) {
            this.pacienteDTO = new PacienteDTO();
        }
        else {
            var patologias = new Patologias();
            this.patologiaPacienteDTOs = patologias.resolve(this.pacienteDTO.patologiasDTO);
            if (this.pacienteDTO.paciente.genero) {
                this.masculino = true;
            }
            else {
                this.feminino = true;
            }
        }
        if (!this.pacienteDTO.photo) {
            this.pacienteDTO.photo = '../../../assets/imgs/rsz_1no-avatar.jpg';
        }
    };
    PacientePage.prototype.loadPhoto = function () {
        if (!this.mobile) {
            document.getElementById('file').click();
        }
        else {
            this.takePicture();
        }
    };
    PacientePage.prototype.atualizaArquivo = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(event.srcElement.files[0]);
        reader.onload = function () {
            _this.pacienteDTO.photo = reader.result.toString();
        };
        reader.onerror = function (error) { return console.log(error); };
    };
    PacientePage.prototype.takePicture = function () {
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
            _this.pacienteDTO.photo = base64Image;
            _this.camera.cleanup();
        }, function (err) {
            console.log(err);
        });
    };
    PacientePage.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.feminino) {
                            this.pacienteDTO.paciente.genero = !this.feminino;
                        }
                        else {
                            this.pacienteDTO.paciente.genero = this.masculino;
                        }
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Salvando ...'
                            })];
                    case 1:
                        loading = _a.sent();
                        this.pacienteDTO.patologiasDTO = this.patologiaPacienteDTOs;
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pacientedtoService.save(this.pacienteDTO).subscribe(function (res) {
                                _this.pacienteDTO = res.body;
                                loading.dismiss();
                                _this.router.navigate(['/pacientes'], { relativeTo: _this.route });
                            }, function (err) {
                                console.log(err);
                                loading.dismiss();
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PacientePage.prototype.changeMasculino = function () {
        this.feminino = !this.masculino;
    };
    PacientePage.prototype.changeFeminino = function () {
        this.masculino = !this.feminino;
    };
    PacientePage.prototype.delete = function () {
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
                                    text: 'Confimar',
                                    handler: function () {
                                        _this.pacientedtoService.delete(_this.pacienteDTO.paciente.idpaciente).subscribe(function (res) {
                                            _this.router.navigate(['pacientes']);
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
    PacientePage = __decorate([
        Component({
            selector: 'app-paciente',
            templateUrl: './paciente.page.html',
            styleUrls: ['./paciente.page.scss'],
        }),
        __metadata("design:paramtypes", [PacientedtoService,
            Router,
            ActivatedRoute,
            LoadingController,
            Camera,
            NavController,
            Platform,
            AlertController])
    ], PacientePage);
    return PacientePage;
}());
export { PacientePage };
//# sourceMappingURL=paciente.page.js.map