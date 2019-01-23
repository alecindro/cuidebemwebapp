import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Api } from './api/api';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const FILTER_AUTH = 'TENANT';
const TOKEN_KEY = 'id_token';

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {



    jwtHelper: JwtHelperService = new JwtHelperService();

    authUser = new ReplaySubject<any>(1);

    constructor(private readonly api: Api,
        private readonly storage: Storage,private router: Router
    ) {
    }

    user():Promise<string>{
        return this.storage.get(TOKEN_KEY).then(jwt => {
            return this.jwtHelper.decodeToken(jwt).sub;
        });
    }

    checkLogin() {
        this.storage.get(TOKEN_KEY).then(jwt => {
            if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
                this.api.get('sec/authenticate')
                    .subscribe((text) => this.authUser.next(jwt),
                        (err) => this.storage.remove(TOKEN_KEY).then(() => this.authUser.next(null)));
                // OR
                // this.authUser.next(jwt);
            }
            else {
                this.storage.remove(TOKEN_KEY).then(() => this.authUser.next(null));
            }
        });
    }

    login(values: any): Observable<any> {
        return this.api.post('sec/authenticate', values)
            .pipe(tap(response => {
                this.handleJwtResponse(response.body.id_token);
                this.router.navigate(['home']);
            }));
    }

    logout() {
        this.storage.remove(TOKEN_KEY).then(() => 
        {
            this.authUser.next(null);
            this.router.navigate(['login']);
        });
    }

    signup(values: any): Observable<any> {
        return this.api.post('signup', values)
            .pipe(tap(jwt => {
                if (jwt !== 'EXISTS') {
                    return this.handleJwtResponse(jwt);
                }
                return jwt;
            }));
    }

    private handleJwtResponse(jwt: string) {
        return this.storage.set(TOKEN_KEY, jwt)
            .then(() => this.authUser.next(jwt))
            .then(() => jwt);
    }

    getTenantNow():Promise<string>{
        return this.storage.get(TOKEN_KEY).then(jwt => {
            return this.tenant(jwt);
        });
    }

    tenant(token: any) {
        if (token) {
            let roles: string[] = this.jwtHelper.decodeToken(token).auth.split(',');
            return roles.reduce((pre, elem) => {
                if (elem.startsWith(FILTER_AUTH)) {
                    return elem;
                }
            }, null);
        }
    }

    isAuthenticated(): Promise<boolean> {
        return new Promise((resolve, _) => {

            this.storage.get(TOKEN_KEY).then(jwt => {
                if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {
                    this.authUser.next(jwt);
                    resolve(true);


                 //   this.storage.remove(TOKEN_KEY).then(() => this.authUser.next(null));
                  //  resolve(false);


                    // OR
                    // this.authUser.next(jwt);
                }
                else {
                    this.storage.remove(TOKEN_KEY).then(() => {
                        this.authUser.next(null);
                        resolve(false);
                    });
                }
            });
            /*this.authUser.subscribe((jwt) => {
                if (jwt) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });*/
        });
    }


}  