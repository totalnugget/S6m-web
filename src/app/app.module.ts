import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/materialModule';
import { SharedModule } from './shared/shared.module';
import { MapModule } from './map/map.module';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { initializer } from '../app/auth/keycloak-init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    KeycloakAngularModule,

    SharedModule,
    MapModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
