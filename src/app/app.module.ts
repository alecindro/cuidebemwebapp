import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Storage, IonicStorageModule } from '@ionic/storage';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
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
import { CheckinPageModule } from './checkin/checkin.module';


export function jwtOptionsFactory(storage: Storage) {
  return {
    tokenGetter: () => storage.get('id_token'),
    whitelistedDomains: ['localhost:8080']
  }
}

@NgModule({
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
    EventoModalPageModule,
    CheckinPageModule,
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
export class AppModule {}
