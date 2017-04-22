import { ITodo } from './todo/models/ITodo';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { AngularFire } from 'angularfire2';
import { AuthService } from '../auth/auth.service';
import { IObjectData } from './todo/models/IObjectData';
import { Todo } from './todo/models/Todo';


@Injectable()
export class TodoService {
  completeTodos: any;
  incompleteTodos: any;
  keyToExclude: string = null;
  todos: Todo[] = [];
  todoKeys: string[] = [];
  observable: Observable<any>;

  constructor (
    private angularFire: AngularFire,
    private authService: AuthService,
  ) {
    if (this.authService.state) {
      const rootPath = `/todos/${this.authService.userId}/`;
      this.incompleteTodos = this.angularFire.database.list(`${rootPath}/incomplete`);
      this.completeTodos = this.angularFire.database.list(`${rootPath}/complete`);
    }

    this.complete = this.complete.bind(this);
    this.findByKey = this.findByKey.bind(this);
  }

  getIncomplete(): Observable<Todo[]> {
    this.observable = this.incompleteTodos.map(objectsList => {

      if (this.keyToExclude) {
        this.todos = this.todos.filter(todo => todo.key !== this.keyToExclude);
        this.keyToExclude = null;
      }
      else {
        objectsList.forEach(object => {
          const objectData = <IObjectData>object;

          const todo = new Todo();
          todo.createdOn = objectData.createdOn;
          todo.key = objectData.$key;
          todo.text = objectData.text;

          if (!this.todoKeys.includes(todo.key)) {
            this.todoKeys.push(todo.key);
            this.todos.push(todo);
          }
        });
      }

      return this.todos.sort((a, b) => {
        return b.createdOn - a.createdOn;
      });
    });

    return this.observable;
  }

  findByKey = (key: string): Todo => {
    return this.todos.filter(todo => todo.key === key)[0] || null;
  }

  add(text: string): Promise<any> {
    return Promise.resolve(
      this.incompleteTodos
        .push(<ITodo>{
          createdOn: new Date().getTime(),
          text: text
        })
    );
  }

  complete(key: string): Promise<any> {
    const todo = this.findByKey(key);

    if (todo) {
      return Promise.resolve(
        this.completeTodos.push({
          createdOn: todo.createdOn,
          completedOn: new Date().getTime(),
          text: todo.text
        })
        .then(() => {
          this.remove(key);
        })
      );
    }
    else {
      return Promise.reject('todo was undefined');
    }
  }

  remove(key: string): Promise<any> {
    this.keyToExclude = key;

    return Promise.resolve(
      this.incompleteTodos.remove(key)
    );
  }

}
