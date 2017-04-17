import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ITodo } from './todo/models/ITodo';
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

  authState: Object;
  authSubscription: Subscription;
  loading: Boolean = true;
  todos: Todo[] = [];
  todosSubscription: Subscription;

  constructor (
    private authService: AuthService,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.state.subscribe(authState => {
      this.authState = authState;

      const userId: string = this.authState['uid'];

      if (this.authState) {
        this.todosSubscription = this.todoService.getByUserId(userId).subscribe(todos => {
          this.todos = todos;
          this.loading = false;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.todosSubscription.unsubscribe();
  }

}
