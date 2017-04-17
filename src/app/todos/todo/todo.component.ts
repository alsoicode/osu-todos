import { Component, Input } from '@angular/core';

import { Todo } from './models/Todo';

@Component({
  selector: '[todo-component]',
  template: `
    <button class="btn btn-link btn-lg action-done">
      <i class="fa fa-check-circle-o"></i>
      <span class="sr-only">Mark as Done</span>
    </button>
    <span class="btn btn-link btn-lg">
      {{ todo.text }}
    </span>
    <button class="btn btn-link btn-lg action-remove">
      <i class="fa fa-times-circle-o"></i>
      <span class="sr-only">Remove</span>
    </button>
  `
})
export class TodoComponent {

  @Input()
  todo: Todo;

}
