var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var FindLanguageFromKeyPipe = /** @class */ (function () {
    function FindLanguageFromKeyPipe() {
        this.languages = {
            'pt-br': { name: 'Português (Brasil)' }
            // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
        };
    }
    FindLanguageFromKeyPipe.prototype.transform = function (lang) {
        return this.languages[lang].name;
    };
    FindLanguageFromKeyPipe = __decorate([
        Pipe({ name: 'findLanguageFromKey' })
    ], FindLanguageFromKeyPipe);
    return FindLanguageFromKeyPipe;
}());
export { FindLanguageFromKeyPipe };
//# sourceMappingURL=find-language-from-key.pipe.js.map