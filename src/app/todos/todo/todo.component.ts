import { Component, Input } from '@angular/core';

import { Todo } from './models/Todo';
import { TodoService } from '../todos.service';

@Component({
  selector: '[todo-component]',
  template: `
    <button class="btn btn-link btn-lg action action-done" (click)="onComplete(todo)">
      <i class="fa fa-check-circle-o"></i>
      <span class="sr-only">Mark as Done</span>
    </button>
    <span class="btn btn-link btn-lg todo">
      {{ todo.text }}
    </span>
    <button class="btn btn-link btn-lg action action-remove" (click)="onRemove(todo.key)">
      <i class="fa fa-times-circle-o"></i>
      <span class="sr-only">Remove</span>
    </button>
  `
})
export class TodoComponent {

  @Input()
  todo: Todo;

  constructor (
    private todoService: TodoService,
  ) {}

  onComplete(todo: Todo): void {
    this.todoService.complete(todo);
  }

  onRemove(key: string): void {
    this.todoService.remove(key);
  }

}
