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
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from './request-utils';
var Api = /** @class */ (function () {
    function Api(http) {
        this.http = http;
    }
    Api_1 = Api;
    Api.prototype.get = function (endpoint, req) {
        var options = createRequestOption(req);
        return this.http.get(Api_1.API_URL + '/' + endpoint, { params: options, observe: 'response', withCredentials: true });
    };
    Api.prototype.post = function (endpoint, body) {
        return this.http.post(Api_1.API_URL + '/' + endpoint, body, { observe: 'response', withCredentials: true });
    };
    Api.prototype.put = function (endpoint, body) {
        return this.http.put(Api_1.API_URL + '/' + endpoint, body, { observe: 'response', withCredentials: true });
    };
    Api.prototype.delete = function (endpoint) {
        return this.http.delete(Api_1.API_URL + '/' + endpoint, { observe: 'response', withCredentials: true });
    };
    Api.prototype.patch = function (endpoint, body) {
        return this.http.put(Api_1.API_URL + '/' + endpoint, body, { observe: 'response', withCredentials: true });
    };
    var Api_1;
    Api.API_URL = SERVER_API_URL;
    Api = Api_1 = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [HttpClient])
    ], Api);
    return Api;
}());
export { Api };
//# sourceMappingURL=api.js.map