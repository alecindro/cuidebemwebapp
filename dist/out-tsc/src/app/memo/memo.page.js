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
import { MemorandoService } from '../services/memorando-service';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { NavParams, ModalController, Platform } from '@ionic/angular';
var MemoPage = /** @class */ (function () {
    function MemoPage(memorandoService, navParams, modalController, authServerProvider, platform) {
        this.memorandoService = memorandoService;
        this.navParams = navParams;
        this.modalController = modalController;
        this.authServerProvider = authServerProvider;
        this.platform = platform;
    }
    MemoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.memorando = this.navParams.get('memorando');
        this.editable = this.navParams.get('editable');
        console.log("Editable " + this.editable);
        this.changeRows();
        this.platform.resize.subscribe(function (x) {
            _this.changeRows();
        });
    };
    MemoPage.prototype.ionViewWillEnter = function () {
        this.ngOnInit();
    };
    MemoPage.prototype.changeRows = function () {
        this.rows = 10;
        if (this.platform.isLandscape()) {
            this.rows = 5;
        }
    };
    MemoPage.prototype.commit = function () {
        if (this.memorando.idmemorando) {
            this.update();
        }
        else {
            this.salvar();
        }
    };
    MemoPage.prototype.salvar = function () {
        var _this = this;
        this.memorando.dataregistro = new Date();
        /* this.authServerProvider.getUsuario().subscribe(usuario =>{
           this.memorando.usuario = usuario;
         });*/
        this.memorandoService.save(this.memorando).subscribe(function (res) {
            _this.memorando = res.body;
            _this.modalController.dismiss();
        });
    };
    MemoPage.prototype.update = function () {
        var _this = this;
        this.memorando.dataalteracao = new Date();
        /* this.authServerProvider.getUsuario().subscribe(usuario =>{
           this.memorando.usuario = usuario;
         });*/
        this.memorandoService.update(this.memorando).subscribe(function (res) {
            _this.memorando = res.body;
            _this.modalController.dismiss();
        });
    };
    MemoPage.prototype.fechar = function () {
        this.modalController.dismiss();
    };
    MemoPage.prototype.delete = function () {
        console.log('delete');
    };
    MemoPage = __decorate([
        Component({
            selector: 'app-memo',
            templateUrl: './memo.page.html',
            styleUrls: ['./memo.page.scss'],
        }),
        __metadata("design:paramtypes", [MemorandoService,
            NavParams, ModalController,
            AuthServerProvider,
            Platform])
    ], MemoPage);
    return MemoPage;
}());
export { MemoPage };
//# sourceMappingURL=memo.page.js.map