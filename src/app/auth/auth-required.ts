import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { AuthService } from './auth.service';

/**
 * A class that ensures that a route can only be accessed by an authenticated visitor.
 */
@Injectable()
export class AuthRequired implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.state.map(authState => {
      if (authState) {
        // if the user is authenticated, allow them to access the route requested
        return true;
      }
      else {
        // the user is not authenticated. Redirect them to the site root.
        this.router.navigate(['/']);
        return false;
      }
    }).first();
  }

}
