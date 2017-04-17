import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { AngularFire } from 'angularfire2';
import { ITodo } from './todo/models/ITodo';
import { Todo } from './todo/models/Todo';


@Injectable()
export class TodoService {

  todos: Todo[] = [];
  todoKeys: string[] = [];
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

        const todo = new Todo();
        todo.createdOn = objectData.createdOn;
        todo.completedOn = objectData.completedOn;
        todo.key = objectData.$key;
        todo.userId = objectData.userId;
        todo.text = objectData.text;

        if (!this.todoKeys.includes(todo.key)) {
          this.todoKeys.push(todo.key);
          this.todos.push(todo);
        };
      });

      return this.todos.sort((a, b) => {
        return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
      });
    });

    return this.observable;
  }

  add(userId: string, text: string): Promise<any> {
    return Promise.resolve(
      this.angularFire.database.list('/todos')
        .push({
          createdOn: moment().toString(),
          completedOn: '',
          userId: userId,
          text: text
        })
        .then(todo => todo)
    );
  }

}
