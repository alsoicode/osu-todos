import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Todo } from './todo/models/Todo';
import { TodoService } from './todos.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './todos.component.scss',
  ],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit, OnDestroy {

  loading = true;
  showLoading: any;
  todos: Todo[] = [];
  todosSubscription: Subscription;

  constructor (
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getIncomplete().subscribe(todos => {
      this.todos = todos;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
  }

}
