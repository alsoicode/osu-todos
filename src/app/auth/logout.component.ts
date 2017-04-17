import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'logout',
  template: `
    <a (click)="onLogout()"><i class="fa fa-sign-out"></i> Logout</a>
  `
})
export class LogoutComponent {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
