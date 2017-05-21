import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
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
    private titleService: Title,
    private todoService: TodoService,
  ) {
    this.dragulaService.setOptions('todos-bag', {
      axis: 'x',
      removeOnSpill: true
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('My Things to Do');

    this.todosSubscription = this.todoService.getIncomplete().subscribe(todos => {
      this.todos = todos;
      this.loading = false;
    });

    this.dragulaService.drag.subscribe(values => {
      // The reference to the dragged item, as a jQuery object
      const draggedItem = $(values[1]);

      // Get the height of the todo, since the text can wrap multiple lines
      const todoHeight = draggedItem.find('.todo').height();

      // Get the width of the dragged item so we can make the complete/remove button
      // the same width
      const draggedItemWidth = draggedItem.innerWidth();

      // Get the all the action buttons within the dragged item
      const actionButtons = draggedItem.find('.action');

      // Get the padding and border of the action button so we can subtract it from
      // the dragged item's width
      const buttonPadding = parseInt(actionButtons.css('padding-left'), 10) * 2;
      const buttonBorder = parseInt(actionButtons.css('border-width'), 10) * 2;
      const buttonExtraWidth = buttonPadding + buttonBorder;

      // Set the dimensions of the action button
      actionButtons.height(todoHeight).width(draggedItemWidth - buttonExtraWidth);

      // Use set timeout to allow the dragged item's mirrored element to be added to the DOM
      // then create a reference to it.
      setTimeout(() => {
        const mirror = $('.gu-mirror');
        mirror.width(draggedItemWidth);

        // Determine the action by the dragged item's offest. Positive offset equals "done";
        // add a css class corresponding to the action to the dragged item
        const markedAction = mirror.offset().left > 0 ? 'done' : 'remove';
        draggedItem.addClass('action-' + markedAction);
      }, 100);
    });

    // Remove css classes that were added to the dragged item if the drag is canceled
    // before the dragged item spills from its parent container
    this.dragulaService.cancel.subscribe(values => {
      $(values[1]).removeClass('action-done action-remove').find('.action').removeAttr('style');
    });

    // When the `remove` event is emitted by the element spilling out of its container,
    // determine the method to call based on the css class.
    this.dragulaService.remove.subscribe(values => {
      const draggedItem = $(values[1]);
      const actionFunction = draggedItem.hasClass('action-done') ? this.todoService.complete : this.todoService.remove;
      const key = draggedItem.data('key');

      actionFunction(key);
    });
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('todos-bag');
    this.todosSubscription.unsubscribe();
  }

}
