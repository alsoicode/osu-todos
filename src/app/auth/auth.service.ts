import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  state: Observable<FirebaseAuthState>;

  constructor(
    private angularFire: AngularFire,
    private router: Router,
  ) {
    this.state = this.angularFire.auth;
  }

  login(): void {
    this.angularFire.auth.login({
      provider: AuthProviders.Github
    });
  }

  logout(): void {
    this.angularFire.auth.logout();
    this.router.navigate(['/']);
  }
}
