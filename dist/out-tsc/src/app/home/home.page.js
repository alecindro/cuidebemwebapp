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
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CheckinPage } from '../checkin/checkin.page';
import { PacientedtoService } from '../services/pacientedto-service';
var HomePage = /** @class */ (function () {
    function HomePage(pacientedtoService, router, modalCtrl) {
        this.pacientedtoService = pacientedtoService;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.enableSearch = false;
        this.searchText = '';
        this.filteredList = [];
        this.pacienteDTOS = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.pacientedtoService.getPacientes().subscribe(function (response) {
            _this.pacienteDTOS = response.body;
            for (var _i = 0, _a = _this.pacienteDTOS; _i < _a.length; _i++) {
                var pacientedto = _a[_i];
                if (!pacientedto.photo) {
                    pacientedto.photo = '../../assets/imgs/rsz_1no-avatar.jpg';
                }
                _this.filteredList.push(pacientedto);
            }
            _this.pacienteDTOS = _this.filteredList;
        }, function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                text = this.searchText.toLowerCase().trim();
                if (text === '') {
                    this.filteredList = this.pacienteDTOS;
                }
                else {
                    this.filteredList = this.pacienteDTOS.filter(function (c) {
                        return c.paciente.nome.toLocaleLowerCase().indexOf(text) > -1 ||
                            c.paciente.apelido.toLocaleLowerCase().indexOf(text) > -1;
                        //const fc = Object.assign({}, c);
                        //delete fc.createdAt;            //ignore createdAt
                        //return JSON.stringify(fc).toLowerCase().indexOf(text) > -1;
                    });
                }
                ;
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.showSearch = function () {
        this.enableSearch = !this.enableSearch;
    };
    HomePage.prototype.clickPaciente = function (pacienteDTO) {
        this.pacienteDTO = pacienteDTO;
        if (pacienteDTO.checkin) {
            this.detailPaciente();
        }
        else {
            this.presentModal();
        }
    };
    HomePage.prototype.presentModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: CheckinPage,
                            componentProps: { pacienteDTO: this.pacienteDTO }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            if (data) {
                                _this.pacienteDTO = data['data'];
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomePage.prototype.detailPaciente = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pacientedtoService.pacienteDTO = this.pacienteDTO;
                this.router.navigateByUrl("/details/tabs/(eventos:eventos)", { skipLocationChange: true });
                return [2 /*return*/];
            });
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        __metadata("design:paramtypes", [PacientedtoService,
            Router,
            ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map