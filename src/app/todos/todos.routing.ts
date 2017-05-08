import { HistoryComponent } from './history.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes } from '@angular/router';
import { TodosComponent } from './todos.component';

export const todosRouting: Routes = [
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: '',
    component: TodosComponent
  }
];
