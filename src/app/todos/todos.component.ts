import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import * as moment from 'moment';
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
  todoForm: FormGroup;
  todosSubscription: Subscription;

  constructor (
    private authService: AuthService,
    private formBuilder: FormBuilder,
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

    this.todoForm = this.formBuilder.group({
      text: ['']
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.todosSubscription.unsubscribe();
  }

  onSubmit(): void {
    const text = this.todoForm.value['text'];
    this.todoService
      .add(this.authState['uid'], text)
      .then(() => {
        this.todoForm.reset();
      })
      .catch(() => console.log('error'));
  }

}
