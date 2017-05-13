import * as _ from 'lodash';
import * as moment from 'moment';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICompletedTodo } from './todo/models/ICompletedTodo';
import { ICompletedTodoGroup } from './todo/models/ICompletedTodoGroup';
import { Subscription } from 'rxjs/Subscription';
import { TodoService } from './todos.service';

@Component({
  styles: [
    '.history-table td { width: 33%; }',
    'h2 { margin-top: 0 }',
  ],
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, OnDestroy {

  completeTodosSubscription: Subscription;
  completedTodoGroups: ICompletedTodoGroup[] = [];
  earliestWeek: string;
  loading = true;
  showLoading;
  noHistory;
  totalCompleted = 0;

  constructor (
    private router: Router,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    let completedTodos: ICompletedTodo[] = [];

    this.completeTodosSubscription = this.todoService.completeTodos.subscribe(snapshots => {

      // only get a snapshot of the values instead of Todo objects
      snapshots.forEach(snapshot => {
        completedTodos.push(Object.assign({}, <ICompletedTodo>snapshot.val()));
      });

      if (completedTodos.length > 0) {
        this.totalCompleted = completedTodos.length;

        // sort the completed todos in descending order
        completedTodos = _.sortBy(completedTodos, ['completedOn']).reverse();

        // Group the completed todos by week using Moment adn LoDash
        const groupedValues = _.groupBy(completedTodos, (completedTodo) => moment(completedTodo.completedOn).startOf('isoWeek'));

        // Loop over the keys (the dates) of the groupedValues and add the todos for the key to the array of completedTodoGroups
        // this gives us a nice array of weeks, and objects for the week.
        Object.keys(groupedValues).forEach(key => {
          this.completedTodoGroups.push({
            week: key,
            todos: groupedValues[key]
          });
        });

        this.earliestWeek = this.completedTodoGroups[this.completedTodoGroups.length - 1].week;
      }

      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.completeTodosSubscription.unsubscribe();
  }

  onConfirmRemove(): void {
    this.todoService
      .removeAll()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
