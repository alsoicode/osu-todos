import { CanActivate, Routes } from '@angular/router';

import { AnonymousRequired, AuthRequired } from './auth';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './auth/logout.component';
import { NoContentComponent } from './no-content/no-content.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AnonymousRequired]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'todos',
    loadChildren: './todos/todos.module#TodosModule',
    canActivate: [AuthRequired]
  },
  {
    path: '**',
    component: NoContentComponent
  },
];
