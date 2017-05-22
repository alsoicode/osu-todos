import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UserAgentService } from './lib/services/user-agent.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  /**
   * Creates an instance of AppComponent.
   * Sets up an event listener that detects touch events to add a class
   * to the body tag, and  automatically unsubscribe.
   *
   * @param {AuthService} authService
   *
   * @memberOf AppComponent
   */

  authServiceSubscription: Subscription;
  isAuthenticated = false;

  constructor (
    private authService: AuthService,
    private userAgentService: UserAgentService,
  ) {
    window.addEventListener('touchstart', function onFirstTouch() {
      document.body.classList.remove('no-touch');
      document.body.classList.add('touch-enabled');
      window.removeEventListener('touchstart', onFirstTouch, false);
    }, false);

    if (this.userAgentService.isIOS) {
      // do nothing on touchmove for iOS to prevent a dragged item
      // from dragging the entire page
      window.addEventListener('touchmove', function() {});
    }
  }

  ngOnInit(): void {
    this.authServiceSubscription = this.authService.authState.subscribe(authState => {
      this.isAuthenticated = authState != null;
    });
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

}
