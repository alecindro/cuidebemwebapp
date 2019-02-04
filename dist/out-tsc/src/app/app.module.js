var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Api } from './services/api/api';
import { AuthJwtInterceptor } from './services/interceptors/auth-jwt-interceptor';
import { AuthServerProvider } from './services/auth-jwt.service';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FormsModule } from '@angular/forms';
import { MemoPageModule } from './memo/memo.module';
import { PhotoModalPageModule } from './photo-modal/photo-modal.module';
import { EventoModalPageModule } from './evento-modal/evento-modal.module';
import { SharedModule } from './shared/shared.module';
export function jwtOptionsFactory(storage) {
    return {
        tokenGetter: function () { return storage.get('id_token'); },
        whitelistedDomains: ['localhost:8080']
    };
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent, MenuItemComponent],
            entryComponents: [],
            imports: [BrowserModule,
                FormsModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                IonicStorageModule.forRoot(),
                SharedModule.forRoot(),
                HttpClientModule,
                MemoPageModule,
                PhotoModalPageModule,
                EventoModalPageModule
            ],
            providers: [
                Camera,
                File,
                WebView,
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy,
                    useClass: IonicRouteStrategy,
                },
                HttpClient,
                AuthServerProvider,
                Api,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthJwtInterceptor,
                    multi: true,
                    deps: [Injector]
                },
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map