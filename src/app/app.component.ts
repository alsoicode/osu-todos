import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  loggedIn = false;

  constructor (
    private authService: AuthService,
  ) {
    window.addEventListener('touchstart', function onFirstTouch() {
      document.body.classList.remove('no-touch');
      document.body.classList.add('touch-enabled');
      window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.state.subscribe(authState => {
      this.loggedIn = authState && this.authService.loggedIn;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
