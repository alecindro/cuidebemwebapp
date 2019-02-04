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
import { NavParams, ModalController } from '@ionic/angular';
import { EventoRotina } from '../models/eventorotina';
import { AuthServerProvider } from '../services/auth-jwt.service';
import { EventoService } from '../services/evento-service';
var EventoModalPage = /** @class */ (function () {
    function EventoModalPage(navParams, modalController, authServerProvider, eventoService) {
        this.navParams = navParams;
        this.modalController = modalController;
        this.authServerProvider = authServerProvider;
        this.eventoService = eventoService;
        this.grupoSelected = "";
        this.subgrupoSelected = "";
        this.eventorotina = new EventoRotina();
    }
    EventoModalPage.prototype.ngOnInit = function () {
        this.evento = this.navParams.get('evento');
        var _data = new Date();
        if (this.evento.idevento) {
            _data = new Date(this.evento.dataregistro);
        }
        _data.setHours(_data.getHours() - (_data.getTimezoneOffset() / 60));
        this.datahora = _data.toISOString();
        this.grupoEventos = this.eventorotina.getDescricaoEvento();
    };
    EventoModalPage.prototype.selectedGrupo = function (grupoevento) {
        this.grupoSelected = grupoevento;
        this.subgrupoSelected = "";
        this.evento.subgrupoevento = "";
        this.subgrupos = this.eventorotina.getRotinas(grupoevento);
    };
    EventoModalPage.prototype.selectedSubgrupo = function (subgrupoevento) {
        this.subgrupoSelected = subgrupoevento;
        this.evento.peso = null;
        this.evento.descricao = null;
        this.evento.descevento = null;
        this.evento.aspecto = null;
        this.evento.value = null;
        this.evento.quantidade = null;
        this.evento.pressaofinal = null;
        this.evento.pressaoinicial = null;
    };
    EventoModalPage.prototype.fechar = function () {
        this.modalController.dismiss();
    };
    EventoModalPage.prototype.delete = function () {
        console.log('delete');
    };
    EventoModalPage.prototype.salvar = function () {
        var _this = this;
        var _data = new Date(this.datahora);
        _data.setHours(_data.getHours() + (_data.getTimezoneOffset() / 60));
        this.evento.dataevento = _data;
        this.evento.dataregistro = _data;
        //this.evento.usuario = this.authServerProvider.usuario; 
        /* this.authServerProvider.getUsuario().subscribe(usuario=>{
            this.evento.usuario = usuario;
          });*/
        this.eventoService.save(this.evento).subscribe(function (res) {
            _this.modalController.dismiss();
        }, function (err) {
            console.log(err.erro);
        });
    };
    EventoModalPage = __decorate([
        Component({
            selector: 'app-evento-modal',
            templateUrl: './evento-modal.page.html',
            styleUrls: ['./evento-modal.page.scss'],
        }),
        __metadata("design:paramtypes", [NavParams,
            ModalController,
            AuthServerProvider,
            EventoService])
    ], EventoModalPage);
    return EventoModalPage;
}());
export { EventoModalPage };
//# sourceMappingURL=evento-modal.page.js.map