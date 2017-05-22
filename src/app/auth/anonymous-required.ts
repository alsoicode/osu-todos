import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

import { AuthService } from './auth.service';

/**
 * A class that ensures that a route can only be accessed by an non-authenticated visitor.
 */
@Injectable()
export class AnonymousRequired implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState.map(authState => {
      if (authState) {
        // This user is authenticated, take them to the /todos route
        this.router.navigate(['/todos']);
        return false;
      }
      else {
        // Allow the user to access the route requested
        return true;
      }
    }).first(); // return the `first` value provided by `state` as `authState`
    
  }

}
