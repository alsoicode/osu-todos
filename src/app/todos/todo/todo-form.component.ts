import { Component, ElementRef, Input, Renderer, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TodoService } from './../todos.service';

@Component({
  selector: 'todo-form',
  template: `
    <form [formGroup]="todoForm" (keyup.enter)="onSubmit()" class="text-center" enctype="application/x-www-form-urlencoded" novalidate>
      <fieldset class="form-group">
        <legend>What needs to be done?</legend>
        <input formControlName="text" type="text" class="form-control input-lg" (blur)="onSubmit()" #textInput>
      </fieldset>
    </form>
  `
})
export class TodoFormComponent implements AfterContentInit, OnInit {

  todoForm: FormGroup;

  @Input()
  userId: string;

  @ViewChild('textInput')
  textInput: ElementRef;

  constructor (
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      text: ['']
    });
  }

  ngAfterContentInit(): void {
    this.focusTextInput();
  }

  focusTextInput(): void {
    this.renderer.invokeElementMethod(this.textInput.nativeElement, 'focus');
  }

  onSubmit(): void {
    const text = this.todoForm.value['text'];

    if (text) {
      this.todoService
        .add(this.userId, text)
        .then(() => {
          this.todoForm.reset();
          this.focusTextInput();
        })
        .catch(() => console.log('error'));
    }
  }

}
