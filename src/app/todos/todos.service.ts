import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { AngularFire } from 'angularfire2';
import { ITodo } from './todo/models/ITodo';
import { Todo } from './todo/models/Todo';


@Injectable()
export class TodoService {
  keyToExclude: string = null;
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

      if (this.keyToExclude) {
        this.todos = this.todos.filter(todo => todo.key !== this.keyToExclude);
        this.keyToExclude = null;
      }
      else {
        objectsList.forEach(object => {
          const objectData = <ITodo>object;

          if (!objectData.completedOn) {
            const todo = new Todo();

            todo.createdOn = objectData.createdOn;
            todo.completedOn = objectData.completedOn;
            todo.key = objectData.$key;
            todo.userId = objectData.userId;
            todo.text = objectData.text;

            if (!this.todoKeys.includes(todo.key)) {
              this.todoKeys.push(todo.key);
              this.todos.push(todo);
            }
          }
        });
      }

      return this.todos.sort((a, b) => {
        return b.createdOn - a.createdOn;
      });
    });

    return this.observable;
  }

  add(userId: string, text: string): Promise<any> {
    return Promise.resolve(
      this.angularFire.database.list('/todos')
        .push({
          createdOn: new Date().getTime(),
          completedOn: '',
          userId: userId,
          text: text
        })
        .then(todo => todo)
    );
  }

  complete(key: string): Promise<any> {
    this.keyToExclude = key;

    return Promise.resolve(
      this.angularFire.database.list('/todos')
      .update(key, {
        completedOn: new Date().getTime()
      })
    );
  }

  remove(key: string): Promise<any> {
    this.keyToExclude = key;

    return Promise.resolve(
      this.angularFire.database.list('/todos')
        .remove(key)
    );
  }

}
