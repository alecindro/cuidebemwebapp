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
import { EventoRotina } from '../models/eventorotina';
import { NavParams, ModalController } from '@ionic/angular';
var EventoPage = /** @class */ (function () {
    function EventoPage(navParams, modalController) {
        this.navParams = navParams;
        this.modalController = modalController;
        this.grupoSelected = "";
        this.subgrupoSelected = "";
        this.eventorotina = new EventoRotina();
    }
    EventoPage.prototype.ngOnInit = function () {
        /*  this.evento = this.navParams.get('evento');
          let _data = new Date();
          if(this.evento.idevento){
            _data = new Date(this.evento.dataregistro);
          }
          _data.setHours(_data.getHours() - (_data.getTimezoneOffset() / 60));
          this.datahora = _data.toISOString();
        this.grupoEventos = this.eventorotina.getDescricaoEvento();*/
    };
    EventoPage.prototype.selectedGrupo = function (grupoevento) {
        this.grupoSelected = grupoevento;
        this.subgrupoSelected = "";
        this.evento.subgrupoevento = "";
        this.subgrupos = this.eventorotina.getRotinas(grupoevento);
    };
    EventoPage.prototype.selectedSubgrupo = function (subgrupoevento) {
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
    EventoPage = __decorate([
        Component({
            selector: 'app-evento',
            templateUrl: './evento.page.html',
            styleUrls: ['./evento.page.scss'],
        }),
        __metadata("design:paramtypes", [NavParams, ModalController])
    ], EventoPage);
    return EventoPage;
}());
export { EventoPage };
//# sourceMappingURL=evento.page.js.map