var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { PacienteDTO } from '../models/pacienteDTO';
import { ModalController } from '@ionic/angular';
import { PacientedtoService } from '../services/pacientedto-service';
var CheckinPage = /** @class */ (function () {
    function CheckinPage(modalCtrl, pacientedtoService) {
        this.modalCtrl = modalCtrl;
        this.pacientedtoService = pacientedtoService;
    }
    CheckinPage.prototype.ngOnInit = function () {
    };
    CheckinPage.prototype.check = function () {
        var _this = this;
        this.pacienteDTO.checkin = !this.pacienteDTO.checkin;
        if (this.pacienteDTO.checkin) {
            this.pacientedtoService.checkin(this.pacienteDTO).subscribe(function (response) {
                _this.pacienteDTO = response.body;
            });
        }
        else {
            this.pacientedtoService.checkout(this.pacienteDTO).subscribe(function (response) {
                _this.pacienteDTO = response.body;
            });
        }
        this.modalCtrl.dismiss(this.pacienteDTO);
    };
    CheckinPage.prototype.cancelar = function () {
        this.modalCtrl.dismiss();
    };
    __decorate([
        Input(),
        __metadata("design:type", PacienteDTO)
    ], CheckinPage.prototype, "pacienteDTO", void 0);
    CheckinPage = __decorate([
        Component({
            selector: 'app-checkin',
            templateUrl: './checkin.page.html',
            styleUrls: ['./checkin.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController, PacientedtoService])
    ], CheckinPage);
    return CheckinPage;
}());
export { CheckinPage };
//# sourceMappingURL=checkin.page.js.map