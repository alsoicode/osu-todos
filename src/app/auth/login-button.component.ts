import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'login-button',
  styles: [
    '.btn.btn-primary { margin-bottom: 0.5rem; }'
  ],
  template: `
    <button class="btn btn-primary btn-lg btn-block" (click)="onLogin()">Sign In via Github <i class="fa fa-github"></i></button>
  `
})
export class LoginButtonComponent {

  constructor (
    private authService: AuthService,
  ) {}

  onLogin(): void {
    this.authService.login();
  }

}
