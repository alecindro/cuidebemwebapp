var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Api } from './api/api';
var PacientedtoService = /** @class */ (function () {
    function PacientedtoService(api) {
        this.api = api;
    }
    PacientedtoService.prototype.getPacientes = function () {
        return this.api.get("api/pacientes");
    };
    PacientedtoService.prototype.getPacienteDTOs = function () {
        return this.api.get("api/pacientedtos");
    };
    PacientedtoService.prototype.checkin = function (pacienteDTO) {
        return this.api.post("api/pacientes/checkin", pacienteDTO);
    };
    PacientedtoService.prototype.checkout = function (pacienteDTO) {
        return this.api.post("api/pacientes/checkout", pacienteDTO);
    };
    PacientedtoService.prototype.save = function (pacienteDTO) {
        if (pacienteDTO.paciente.idpaciente) {
            return this.update(pacienteDTO);
        }
        return this.api.post("api/pacientes", pacienteDTO);
    };
    PacientedtoService.prototype.update = function (pacienteDTO) {
        return this.api.put("api/pacientes", pacienteDTO);
    };
    PacientedtoService.prototype.delete = function (idpaciente) {
        return this.api.delete("api/pacientes/" + idpaciente);
    };
    PacientedtoService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Api])
    ], PacientedtoService);
    return PacientedtoService;
}());
export { PacientedtoService };
//# sourceMappingURL=pacientedto-service.js.map