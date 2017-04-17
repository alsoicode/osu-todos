import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ITodo } from './todo/models/ITodo';
import { Todo } from './todo/models/Todo';


@Injectable()
export class TodoService {

  todos: Todo[] = [];
  observable: Observable<any>;

  constructor (
    private angularFire: AngularFire,
  ) {}

  getByUserId(userId: string): Observable<Todo[]> {
    const query = {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    };

    this.observable = this.angularFire.database.list('/todos', query).map(objectsList => {
      objectsList.forEach(object => {
        const objectData = <ITodo>object;

        let todo = new Todo();
        todo.createdOn = objectData.createdOn;
        todo.completedOn = objectData.completedOn;
        todo.key = objectData.$key;
        todo.userId = objectData.userId;
        todo.text = objectData.text;

        this.todos.push(todo);
      });

      return this.todos.reverse();
    });

    return this.observable;
  }

}
