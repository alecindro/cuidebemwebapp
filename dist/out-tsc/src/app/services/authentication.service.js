import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
export var TOKEN_KEY = 'id_token';
export var AUTH = 'htua';
var AuthenticationServiceXPTO = /** @class */ (function () {
    function AuthenticationServiceXPTO(plt, authServerProvider, storage) {
        var _this = this;
        this.plt = plt;
        this.authServerProvider = authServerProvider;
        this.storage = storage;
        this.helper = new JwtHelperService();
        this.authenticationState = new BehaviorSubject(false);
        this.plt.ready().then(function () {
            _this.checkToken();
        });
    }
    AuthenticationServiceXPTO.prototype.checkToken = function () {
        var _this = this;
        this.storage.get(TOKEN_KEY).then(function (res) {
            if (res) {
                _this.authenticationState.next(true);
            }
        });
    };
    AuthenticationServiceXPTO.prototype.login = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // TODO remove this, i'm login in to test dashboard page
            // this.authenticationState.next(true);
            // return;
            _this.authServerProvider.login({
                username: user.username,
                password: user.password
            }).subscribe(function (data) {
                _this.storage.set(TOKEN_KEY, data.body.id_token).then(function () {
                    _this.storage.set(AUTH, _this.helper.decodeToken(data.body.id_token).auth).then(function () {
                        _this.authenticationState.next(true);
                        return data;
                    });
                });
            }, function (err) {
                _this.logout();
                reject(err);
                return err;
            });
        });
    };
    AuthenticationServiceXPTO.prototype.logout = function () {
        var _this = this;
        return this.storage.remove(TOKEN_KEY).then(function () {
            _this.authenticationState.next(false);
        });
    };
    AuthenticationServiceXPTO.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    return AuthenticationServiceXPTO;
}());
export { AuthenticationServiceXPTO };
//# sourceMappingURL=authentication.service.js.map