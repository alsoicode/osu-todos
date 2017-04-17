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

  authState: Object;
  authSubscription: Subscription;

  constructor (
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.state.subscribe(authState => {
      this.authState = authState;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
