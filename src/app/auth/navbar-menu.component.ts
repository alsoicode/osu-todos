import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'navbar-menu',
  template: `
    <ul class="nav navbar-nav navbar-right" *ngIf="isAuthenticated">
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-user-circle-o"></i> <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li>
            <a routerLink="/todos/history" *ngIf="!displayTodosLink; else displayTodosLinkRoute"><i class="fa fa-clock-o"></i> History</a>
          </li>
          <li>
            <a routerLink="/logout"><i class="fa fa-sign-out"></i> Logout</a>
          </li>
        </ul>
      </li>
    </ul>

    <ng-template #displayTodosLinkRoute>
      <a routerLink="/todos"><i class="fa fa-list-alt"></i> Todos</a>
    </ng-template>
  `
})
export class NavbarMenuComponent implements OnInit, OnDestroy {

  @Input()
  isAuthenticated: boolean = false;

  authServiceSubscription: Subscription;
  displayTodosLink = true;
  routerSubscription: Subscription;

  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.displayTodosLink = routerEvent.url === '/todos/history';
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
