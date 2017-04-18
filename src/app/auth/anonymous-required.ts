import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { AuthService } from './auth.service';

@Injectable()
export class AnonymousRequired implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.state.map(authState => {
      if (authState) {
        this.router.navigate(['/todos']);
        return false;
      }
      else {
        return true;
      }
    }).first();
  }

}
