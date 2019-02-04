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
var ResponsavelPhotoService = /** @class */ (function () {
    function ResponsavelPhotoService(api) {
        this.api = api;
    }
    ResponsavelPhotoService.prototype.get = function (idresponsavel) {
        return this.api.get("api/responsavelphotos/" + idresponsavel);
    };
    ResponsavelPhotoService.prototype.save = function (responsavelPhoto) {
        if (responsavelPhoto.idresponsavel) {
            return this.update(responsavelPhoto);
        }
        return this.api.post("api/responsavelphotos", responsavelPhoto);
    };
    ResponsavelPhotoService.prototype.update = function (responsavelPhoto) {
        return this.api.put("api/responsavelphotos", responsavelPhoto);
    };
    ResponsavelPhotoService.prototype.delete = function (idresponsavel) {
        this.api.delete("api/responsavelphotos/" + idresponsavel);
    };
    ResponsavelPhotoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Api])
    ], ResponsavelPhotoService);
    return ResponsavelPhotoService;
}());
export { ResponsavelPhotoService };
//# sourceMappingURL=responsavelphoto-service.js.map