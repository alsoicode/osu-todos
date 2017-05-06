import { Component, Input } from '@angular/core';

import { Todo } from './models/Todo';
import { TodoService } from '../todos.service';

@Component({
  selector: '[todo-component]',
  template: `
    <button class="btn btn-link btn-lg action action-done" (click)="onComplete(todo.key)">
      <i class="fa fa-check-circle-o"></i>
      <span class="sr-only">Mark as Done</span>
    </button>
    <span class="btn btn-link btn-lg todo">
      <span *ngIf="todo.displayDateWarning" title="Quit procrastinating!"><i class="fa fa-warning"></i> </span>{{ todo.text }}
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

  onComplete(key: string): void {
    this.todoService.complete(key);
  }

  onRemove(key: string): void {
    this.todoService.remove(key);
  }

}
