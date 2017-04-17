import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';
import { ITodo } from './todo/models/ITodo';
import { Subscription } from 'rxjs/Subscription';

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
  todos: FirebaseListObservable<any[]>;
  todoForm: FormGroup;
  todosSubscription: Subscription;

  constructor (
    private angularFire: AngularFire,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.state.subscribe(authState => {
      this.authState = authState;

      if (this.authState) {
        const query = {
          query: {
            orderByChild: 'userId',
            equalTo: this.authState['uid']
          }
        };

        this.todosSubscription = this.angularFire.database.list('/todos', query).subscribe(todos => {
          this.todos = <any>todos;
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

  onSubmit(event: Event): void {
    event.preventDefault();

    const todo = this.angularFire.database.list('/todos');
    const text = this.todoForm.value['text'];

    if (text) {
      todo.push(<ITodo>{
        createdOn: moment().toString(),
        completedOn: '',
        userId: this.authState['uid'],
        text: text
      });

      this.todoForm.reset();
    }
  }

}
