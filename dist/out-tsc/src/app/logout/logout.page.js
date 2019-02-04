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
import { AuthServerProvider } from '../services/auth-jwt.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
var LogoutPage = /** @class */ (function () {
    function LogoutPage(authServerProvider, menuCtrl, router) {
        this.authServerProvider = authServerProvider;
        this.menuCtrl = menuCtrl;
        this.router = router;
    }
    LogoutPage.prototype.ngOnInit = function () {
    };
    LogoutPage.prototype.logout = function () {
        this.authServerProvider.logout();
        this.menuCtrl.enable(false);
    };
    LogoutPage.prototype.cancel = function () {
        this.router.navigate(['home']);
    };
    LogoutPage = __decorate([
        Component({
            selector: 'app-logout',
            templateUrl: './logout.page.html',
            styleUrls: ['./logout.page.scss'],
        }),
        __metadata("design:paramtypes", [AuthServerProvider, MenuController, Router])
    ], LogoutPage);
    return LogoutPage;
}());
export { LogoutPage };
//# sourceMappingURL=logout.page.js.map