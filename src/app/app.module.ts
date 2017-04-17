import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { environment } from '../environments/environment';
import { HomeComponent } from './home';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
