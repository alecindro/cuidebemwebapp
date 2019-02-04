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
var ConfiguracoesPage = /** @class */ (function () {
    function ConfiguracoesPage(route) {
        this.route = route;
    }
    ConfiguracoesPage.prototype.ngOnInit = function () {
    };
    ConfiguracoesPage.prototype.alterarSenha = function () {
        this.route.navigate(['senha']);
    };
    ConfiguracoesPage.prototype.meusdados = function () {
        this.route.navigate(['usuario']);
    };
    ConfiguracoesPage.prototype.ionViewWillEnter = function () {
    };
    ConfiguracoesPage = __decorate([
        Component({
            selector: 'app-configuracoes',
            templateUrl: './configuracoes.page.html',
            styleUrls: ['./configuracoes.page.scss'],
        }),
        __metadata("design:paramtypes", [Router])
    ], ConfiguracoesPage);
    return ConfiguracoesPage;
}());
export { ConfiguracoesPage };
//# sourceMappingURL=configuracoes.page.js.map