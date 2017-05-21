import * as moment from 'moment';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ITodo } from './models/ITodo';
import { Todo } from './models/Todo';
import { TodoComponent } from './todo.component';
import { TodoService } from '../todos.service';

describe('TodoComponent', () => {
  let todoComponent: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let htmlElement: HTMLElement;

  const todoServiceStub = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent
      ],
      providers: [
        {
          provide: TodoService,
          useValue: {}
        }
      ]
    });

    fixture = TestBed.createComponent(TodoComponent);
    todoComponent = fixture.componentInstance;
    htmlElement = fixture.debugElement.nativeElement;
  });

  it('should render a warning icon if the todo is more than 3 days old', () => {
    const oldTodo = new Todo();
    oldTodo.createdOn = moment().subtract(4, 'days').valueOf();
    oldTodo.key = 'abcxyz';
    oldTodo.text = 'An old todo';

    todoComponent.todo = oldTodo;
    fixture.detectChanges();
    expect(htmlElement.innerHTML).toContain('fa-warning');
  });
});
