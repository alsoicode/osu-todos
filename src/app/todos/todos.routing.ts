import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';

import { TodosComponent } from './todos.component';

export const todosRouting: Routes = [
  {
    path: '',
    component: TodosComponent
  }
];
