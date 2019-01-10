import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {Injector, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import { Observable } from "rxjs";
import { from } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { AuthServerProvider } from '../auth-jwt.service';
import { TOKEN_KEY } from '../authentication.service';

const TENANT_HEADER = 'X-TenantID';


@Injectable({providedIn: 'root'})
export class AuthJwtInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const storage = this.injector.get(Storage);
        const authServerProvider = this.injector.get(AuthServerProvider);
        let promise = storage.get(TOKEN_KEY);
        return from(promise).pipe(switchMap((token) =>
       {
        let tenant =authServerProvider.tenant(token);
        if(tenant){
        const clonedRequest = req.clone({ headers: req.headers.append(TENANT_HEADER, tenant).append("Authorization","Bearer "+token) });
        return next.handle(clonedRequest);
        }
        return next.handle(req);
       }
       )
       );
        
 }

  
    
}
