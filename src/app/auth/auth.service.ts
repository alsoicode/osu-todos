import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/last';

import * as firebase from 'firebase/app';

/**
 * A class that abstracts the details of the concrete state provider, FirebaseAuthState
 * and provides methods to call the corresponding concrete implementations.
 * This design pattern allows the concrete provider to be switched out for another in the future
 * without requiring components to change their implementation.
 */
@Injectable()
export class AuthService {

  authState: Observable<firebase.User>;
  currentUser: firebase.User;

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) {
    this.authState = this.angularFireAuth.authState;
    angularFireAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  /**
   * Synchronously returns the current authentication state
   *
   * @readonly
   * @type {boolean}
   * @memberOf AuthService
   */
  get isAuthenticated(): Observable<boolean> {
    return this.authState.last().map(user => user != null);
  }

  /**
   * Synchronously return the `uid` property of the currently authenticated user
   *
   * @readonly
   * @type {string}
   * @memberOf AuthService
   */
  get userId(): string {
    return this.currentUser.uid;
  }

  /**
   * Logs in the user aginst the provider(s) configured using Firebase using the
   * method defined on AngularFireModule in the app module.
   *
   * @memberOf AuthService
   */
  login(): firebase.Promise<any> {
    return this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider());
  }

  /**
   * Logs the currently authenticated user out of Firebase
   *
   * @returns {Promise<any>}
   *
   * @memberOf AuthService
   */
  logout(): firebase.Promise<any> {
    // this.authState = null;
    return this.angularFireAuth.auth.signOut();
  }
}
