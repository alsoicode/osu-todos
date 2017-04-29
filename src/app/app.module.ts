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
import { NoContentComponent } from './no-content/no-content.component';
import { Title } from '@angular/platform-browser';
import { TodoService } from './todos/todos.service';
import { UserAgentService } from './lib/services/user-agent.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    LoginButtonComponent,
    NoContentComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(
      environment.firebase, {
        provider: AuthProviders.Github,
        method: AuthMethods.Redirect
      }
    ),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    AnonymousRequired,
    AuthRequired,
    AuthService,
    Title,
    TodoService,
    UserAgentService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
