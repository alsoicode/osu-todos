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
      axis: 'x',
      removeOnSpill: true
    });

    this.dragulaService.drag.subscribe(values => {
      const draggedItem = $(values[1]);
      const todoHeight = draggedItem.find('.todo').height();
      const draggedItemWidth = draggedItem.width();
      const actionButton = draggedItem.find('.action');

      actionButton.height(todoHeight).width(draggedItemWidth);

      setTimeout(() => {
        const mirror = $('.gu-mirror');
        mirror.width(draggedItemWidth);

        const markedAction = mirror.offset().left > 0 ? 'done' : 'remove';
        draggedItem.addClass('action-' + markedAction);
      }, 300);
    });

    this.dragulaService.cancel.subscribe(values => {
      $(values[1]).removeClass('action-done action-remove').find('.action').removeAttr('style');
    });

    this.dragulaService.remove.subscribe(values => {
      const draggedItem = $(values[1]);
      const actionFunction = draggedItem.hasClass('action-done') ? this.todoService.complete : this.todoService.remove;
      const key = draggedItem.data('key');

      actionFunction(key);
    });
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
  }

}
