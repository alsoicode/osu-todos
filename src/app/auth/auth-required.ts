import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { AuthService } from './auth.service';

@Injectable()
export class AuthRequired implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.state.map(authState => {
      if (authState) {
        return true;
      }
      else {
        this.router.navigate(['/']);
        return false;
      }
    }).first();
  }

}
