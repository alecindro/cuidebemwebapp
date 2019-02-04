var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var CadastrosPage = /** @class */ (function () {
    function CadastrosPage(route) {
        this.route = route;
    }
    CadastrosPage.prototype.ngOnInit = function () {
    };
    CadastrosPage.prototype.pacientes = function () {
        this.route.navigate(['pacientes']);
    };
    CadastrosPage.prototype.responsaveis = function () {
        this.route.navigate(['responsaveis']);
    };
    CadastrosPage.prototype.agendas = function () {
        this.route.navigate(['agendas']);
    };
    CadastrosPage.prototype.usuarios = function () {
        this.route.navigate(['usuarios']);
    };
    CadastrosPage = __decorate([
        Component({
            selector: 'app-cadastros',
            templateUrl: './cadastros.page.html',
            styleUrls: ['./cadastros.page.scss'],
        }),
        __metadata("design:paramtypes", [Router])
    ], CadastrosPage);
    return CadastrosPage;
}());
export { CadastrosPage };
//# sourceMappingURL=cadastros.page.js.map