import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthService {

  state: Observable<FirebaseAuthState>;

  constructor(
    private angularFire: AngularFire,
  ) {
    this.state = this.angularFire.auth;
  }

  get loggedIn(): boolean {
    let authenticated = false;
    this.state.take(1).subscribe(state => authenticated = state && state.hasOwnProperty('uid'));
    return authenticated;
  }

  get userId(): string {
    let userId: string = null;
    if (this.loggedIn) {
      this.state.take(1).subscribe(state => userId = state.uid);
    }
    return userId;
  }

  login(): void {
    this.angularFire.auth
      .login({
        provider: AuthProviders.Github
      });
  }

  logout(): Promise<any> {
    return this.angularFire.auth.logout();
  }
}
