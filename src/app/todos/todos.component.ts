import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs/Subscription';
import { Todo } from './todo/models/Todo';
import { TodoService } from './todos.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './todos.component.scss',
  ],
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit, OnDestroy {

  loading = true;
  showLoading: any;
  todos: Todo[] = [];
  todosSubscription: Subscription;

  constructor (
    private dragulaService: DragulaService,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getIncomplete().subscribe(todos => {
      this.todos = todos;
      this.loading = false;
    });

    this.dragulaService.setOptions('todos-bag', {
      axis: 'x'
    });

    this.dragulaService.drag.subscribe(value => {
      const draggedItem = $(value[1]);
      const height = draggedItem.find('.todo').height();

      draggedItem.find('.action').height(height);

      setTimeout(() => {
        const mirror = $('.gu-mirror');
        const action = mirror.offset().left > 0 ? 'done' : 'remove';
        draggedItem.addClass('action-' + action);
      }, 0);
    });

    this.dragulaService.cancel.subscribe(value => {
      $(value[1]).removeClass('action-done action-remove').find('.action').removeAttr('style');
    });

    this.dragulaService.dragend.subscribe(value => {
      console.log(value);
    })
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
  }

}
