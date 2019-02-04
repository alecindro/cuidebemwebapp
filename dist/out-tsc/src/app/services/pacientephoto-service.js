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
import { Api } from "./api/api";
var PacientePhotoService = /** @class */ (function () {
    function PacientePhotoService(api) {
        this.api = api;
    }
    PacientePhotoService.prototype.save = function (pacientePhoto) {
        return this.api.post("api/pacientephotos/noprincipal", pacientePhoto);
    };
    PacientePhotoService.prototype.update = function (pacientePhoto) {
        return this.api.put("api/pacientephotos", pacientePhoto);
    };
    PacientePhotoService.prototype.delete = function (pacientePhoto) {
        return this.api.delete("api/pacientephotos" + pacientePhoto.idpacientephoto);
    };
    PacientePhotoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Api])
    ], PacientePhotoService);
    return PacientePhotoService;
}());
export { PacientePhotoService };
//# sourceMappingURL=pacientephoto-service.js.map