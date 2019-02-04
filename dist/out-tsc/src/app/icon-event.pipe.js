var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { EventoRotina } from './models/eventorotina';
var IconEventPipe = /** @class */ (function () {
    function IconEventPipe() {
    }
    IconEventPipe_1 = IconEventPipe;
    IconEventPipe.prototype.transform = function (value, args) {
        return IconEventPipe_1.eventoRotina.getIcon(value);
    };
    var IconEventPipe_1;
    IconEventPipe.eventoRotina = new EventoRotina();
    IconEventPipe = IconEventPipe_1 = __decorate([
        Pipe({
            name: 'iconEvent'
        })
    ], IconEventPipe);
    return IconEventPipe;
}());
export { IconEventPipe };
//# sourceMappingURL=icon-event.pipe.js.map