import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

/**
 * A class that abstracts the details of the concrete state provider, FirebaseAuthState
 * and provides methods to call the corresponding concrete implementations.
 * This design pattern allows the concrete provider to be switched out for another in the future
 * without requiring components to change their implementation.
 */
@Injectable()
export class AuthService {

  state: Observable<FirebaseAuthState>;

  constructor(
    private angularFire: AngularFire,
  ) {
    this.state = this.angularFire.auth;
  }

  /**
   * Synchronously returns the current authentication state and whether or not that object contains
   * the `uid` property that will only be preent after authentication is successful
   *
   * @readonly
   * @type {boolean}
   * @memberOf AuthService
   */
  get loggedIn(): boolean {
    let authenticated = false;
    this.state.take(1).subscribe(state => authenticated = state && state.hasOwnProperty('uid'));
    return authenticated;
  }

  /**
   * Synchronously return the `uid` property of the currently authenticated user, or null
   *
   * @readonly
   * @type {string}
   * @memberOf AuthService
   */
  get userId(): string {
    let userId: string = null;
    if (this.loggedIn) {
      this.state.take(1).subscribe(state => userId = state.uid);
    }
    return userId;
  }

  /**
   * Logs in the user aginst the provider(s) configured using Firebase using the
   * method defined on AngularFireModule in the app module.
   *
   * @memberOf AuthService
   */
  login(): void {
    this.angularFire.auth
      .login({
        provider: AuthProviders.Github
      });
  }

  /**
   * Logs the currently authenticated user out of Firebase
   *
   * @returns {Promise<any>}
   *
   * @memberOf AuthService
   */
  logout(): Promise<any> {
    return this.angularFire.auth.logout();
  }
}
