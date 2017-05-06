import { ITodo } from './todo/models/ITodo';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFire } from 'angularfire2';
import { AuthService } from '../auth/auth.service';
import { IObjectData } from './todo/models/IObjectData';
import { Todo } from './todo/models/Todo';

/**
 * A class that abstracts the details of the concrete service provider, Firebase,
 * and provides methods to call the corresponding concrete implementations.
 * This design pattern allows the concrete provider to be switched out for another in the future
 * without requiring components to change their implementation.
 */
@Injectable()
export class TodoService {
  completeTodos: any;
  incompleteTodos: any;
  observable: Observable<any>;
  incompleteTodosRootPath: string;

  constructor (
    private angularFire: AngularFire,
    private authService: AuthService,
  ) {
    /**
     * set up the paths in the Firebase object graph for the currently authenticated
     * user to save their objects to. Objects are separated into two separate locations
     * for easier querying and aggregation. The `userId` in the path prevents users from
     * accessing other user's objects.
     */
    if (this.authService.state) {
      const rootPath = `/todos/${this.authService.userId}`;
      this.incompleteTodosRootPath = `${rootPath}/incomplete`;
      this.incompleteTodos = this.angularFire.database.list(this.incompleteTodosRootPath);
      this.completeTodos = this.angularFire.database.list(`${rootPath}/complete`);
    }

    /**
     * Injected classes do not automatically bind their contexts. As such, `this` will be
     * `undefined` when called from other methods unless they are bound to `this` when the
     * class is instantiated
     */
    this.complete = this.complete.bind(this);
    // this.findByKey = this.findByKey.bind(this);
    this.remove = this.remove.bind(this);
  }

  /**
   * @param {IObjectData} objectData
   * @returns {Todo}
   *
   * @memberof TodoService
   */
  todoFactory(objectData: IObjectData): Todo {
    const todo = new Todo();
    todo.createdOn = objectData.createdOn;
    todo.key = objectData.$key;
    todo.text = objectData.text;

    return todo;
  }

  /**
   * @returns {Observable<Todo[]>}
   *
   * @memberOf TodoService
   *
   * Retrieves objects from the location, creates a strongly-typed object <Todo> from the
   * data provided in the shape of `<IObjectData>` and caches them locally on the `todos` array
   * if they are not currently in the array.
   *
   * Objects are then sorted by the `createdOn` timestamp in descending order (newest to oldest)
   */
  getIncomplete(): Observable<Todo[]> {
    this.observable = this.incompleteTodos.map(objectsList => {

      const todos: Todo[] = [];

      objectsList.forEach(object => {
        const objectData = <IObjectData>object;
        const todo = this.todoFactory(objectData);
        todos.push(todo);
      });

      return todos.sort((a, b) => {
        return b.createdOn - a.createdOn;
      });
    });

    return this.observable;
  }

  /**
   * Returns a single <Todo> object by key
   *
   *
   * @memberOf TodoService
   */
  findByKey = (key: string): Todo => {
    const path = `${this.incompleteTodosRootPath}/${key}`;

    let todo;
    this.angularFire.database.object(`${this.incompleteTodosRootPath}/${key}`).take(1).subscribe(objectData => {
      todo = this.todoFactory(<IObjectData>objectData);
    });

    return todo;
  }

  /**
   * Adds a Todo object with the provided text.
   *
   * @param {string} text
   * @returns {Promise<any>}
   *
   * @memberOf TodoService
   */
  add(text: string): Promise<any> {
    return Promise.resolve(
      this.incompleteTodos
        .push(<ITodo>{
          createdOn: new Date().getTime(),
          text: text
        })
    );
  }

  /**
   * Creates a new Todo object in the `completeTodos` location,
   * then removes the same object by key from the `incompleteTodos` location
   *
   * @param {string} key
   * @returns {Promise<any>}
   *
   * @memberOf TodoService
   */
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

  /**
   * Removes a Todo from the `incompleteTodos` location by key
   *
   * @param {string} key
   * @returns {Promise<any>}
   *
   * @memberOf TodoService
   */
  remove(key: string): Promise<any> {
    return Promise.resolve(
      this.incompleteTodos.remove(key)
    );
  }

}
