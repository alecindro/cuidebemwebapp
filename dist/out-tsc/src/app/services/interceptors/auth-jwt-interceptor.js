var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injector, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { AuthServerProvider } from '../auth-jwt.service';
import { TOKEN_KEY } from '../authentication.service';
var TENANT_HEADER = 'X-TenantID';
var AuthJwtInterceptor = /** @class */ (function () {
    function AuthJwtInterceptor(injector) {
        this.injector = injector;
    }
    AuthJwtInterceptor.prototype.intercept = function (req, next) {
        var storage = this.injector.get(Storage);
        var authServerProvider = this.injector.get(AuthServerProvider);
        var promise = storage.get(TOKEN_KEY);
        return from(promise).pipe(switchMap(function (token) {
            var tenant = authServerProvider.tenant(token);
            if (tenant) {
                var clonedRequest = req.clone({ headers: req.headers.append(TENANT_HEADER, tenant).append("Authorization", "Bearer " + token) });
                return next.handle(clonedRequest);
            }
            return next.handle(req);
        }));
    };
    AuthJwtInterceptor = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [Injector])
    ], AuthJwtInterceptor);
    return AuthJwtInterceptor;
}());
export { AuthJwtInterceptor };
//# sourceMappingURL=auth-jwt-interceptor.js.map