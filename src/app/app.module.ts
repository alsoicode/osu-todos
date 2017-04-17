import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';
import { HomeComponent } from './home';
import { LoginComponent } from './auth/login.component';
import { LogoutComponent } from './auth/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(
      environment.firebase, {
        provider: AuthProviders.Github,
        method: AuthMethods.Redirect
      }
    )
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
