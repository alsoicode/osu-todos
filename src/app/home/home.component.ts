import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  styleUrls: [
    './home.component.scss',
  ],
  template: `
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-12 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
          <h1>Hi</h1>
          <login></login>
          <a class="btn btn-link" href="https://github.com/join?source=header-home" target="_blank">I don&#8217;t have a Github Account</a>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  authState: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.authSubscription = this.authService.state.subscribe(authState => {
      this.authState = authState;

      if (this.authState) {
        this.router.navigate(['/todos']);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
