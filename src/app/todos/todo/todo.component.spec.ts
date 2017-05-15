import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TodosComponent } from './../todos.component';

describe('TodosComponent', () => {
  let todosComponent: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let htmlElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosComponent]
    });

    fixture = TestBed.createComponent(TodosComponent);
  });
});
