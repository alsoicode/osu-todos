import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  template: `
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 text-center">
        <h1><i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i> Logging out&hellip;</h1>
      </div>
    </div>
  `
})
export class LogoutComponent implements AfterContentInit {

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  ngAfterContentInit(): void {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']));
  }

}
