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
var ResponsavelPacienteService = /** @class */ (function () {
    function ResponsavelPacienteService(api) {
        this.api = api;
    }
    ResponsavelPacienteService.prototype.getByPaciente = function (idpaciente) {
        return this.api.get("api/responsavelpacientes/" + idpaciente);
    };
    ResponsavelPacienteService.prototype.getByPacienteAndResponsavel = function (idpaciente, idresponsavel) {
        var params = {
            'idpaciente': idpaciente,
            'idresponsavel': idresponsavel
        };
        return this.api.get("api/responsavelpacientes", params);
    };
    ResponsavelPacienteService.prototype.save = function (responsavelPaciente) {
        if (responsavelPaciente.idresponsavelPaciente) {
            return this.update(responsavelPaciente);
        }
        return this.api.post("api/responsavelpacientes", responsavelPaciente);
    };
    ResponsavelPacienteService.prototype.update = function (responsavelPaciente) {
        return this.api.put("api/responsavelpacientes", responsavelPaciente);
    };
    ResponsavelPacienteService.prototype.delete = function (responsavelPaciente) {
        responsavelPaciente.responsavel.enabled = false;
        this.update(responsavelPaciente);
    };
    ResponsavelPacienteService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Api])
    ], ResponsavelPacienteService);
    return ResponsavelPacienteService;
}());
export { ResponsavelPacienteService };
//# sourceMappingURL=responsavelpaciente-service.js.map