import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { AnonymousRequired, AuthRequired, AuthService, LoginButtonComponent } from './auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './home';
import { LogoutComponent } from './logout.component';
import { TodoService } from './todos/todos.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    LoginButtonComponent,
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
    AnonymousRequired,
    AuthRequired,
    AuthService,
    TodoService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
