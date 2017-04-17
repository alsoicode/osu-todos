import { Component, ViewEncapsulation } from '@angular/core';
import { Todo } from './todo/models/Todo';

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './todos.component.scss',
  ],
  templateUrl: './todos.component.html',
})
export class TodosComponent {

  todos: Todo[] = [
    {
      createdOn: new Date(),
      completedOn: null,
      text: 'First Thing',
      userId: '1'
    },
    {
      createdOn: new Date(),
      completedOn: null,
      text: 'Second Thing',
      userId: '1'
    },
    {
      createdOn: new Date(),
      completedOn: null,
      text: 'Third Thing',
      userId: '1'
    },
    {
      createdOn: new Date(),
      completedOn: null,
      text: 'Fourth Thing',
      userId: '1'
    },
    {
      createdOn: new Date(),
      completedOn: null,
      text: 'Fifth Thing',
      userId: '1'
    },
  ];

}
