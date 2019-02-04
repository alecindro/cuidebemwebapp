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
var ResponsavelService = /** @class */ (function () {
    function ResponsavelService(api) {
        this.api = api;
    }
    ResponsavelService.prototype.getByPaciente = function (idpaciente) {
        var params = { 'idpaciente': idpaciente };
        return this.api.get("api/responsaveis", params);
    };
    ResponsavelService.prototype.save = function (responsavel) {
        if (responsavel.idresponsavel) {
            return this.update(responsavel);
        }
        return this.api.post("api/responsaveis", responsavel);
    };
    ResponsavelService.prototype.update = function (responsavel) {
        return this.api.put("api/responsaveis", responsavel);
    };
    ResponsavelService.prototype.delete = function (responsavel) {
        return this.api.delete("api/responsaveis/" + responsavel.idresponsavel);
    };
    ResponsavelService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Api])
    ], ResponsavelService);
    return ResponsavelService;
}());
export { ResponsavelService };
//# sourceMappingURL=responsavel-service.js.map