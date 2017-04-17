import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
    <button class="btn btn-primary btn-lg btn-block" (click)="onLogin()">Sign In via Github <i class="fa fa-github"></i></button>
  `
})
export class LoginComponent {

  constructor (
    private authService: AuthService,
  ) {}

  onLogin(): void {
    this.authService.login();
  }

}
