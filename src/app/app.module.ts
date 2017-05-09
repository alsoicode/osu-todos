import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { AnonymousRequired, AuthRequired, AuthService, LoginButtonComponent } from './auth';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home';
import { LogoutComponent } from './auth/logout.component';
import { NavbarMenuComponent } from './auth/navbar-menu.component';
import { NgModule } from '@angular/core';
import { NoContentComponent } from './no-content/no-content.component';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TodoService } from './todos/todos.service';
import { UserAgentService } from './lib/services/user-agent.service';
import { appRoutes } from './app.routing';
import { environment } from '../environments/environment';

/**
 * Provides the core application namespace defining which
 * components, modules and services the application uses.
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoutComponent,
    LoginButtonComponent,
    NavbarMenuComponent,
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
