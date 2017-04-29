import { Component, ElementRef, Input, Renderer, ViewChild, AfterContentInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { TodoService } from '../todos.service';
import { UserAgentService } from '../../lib/services/user-agent.service';

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

  @ViewChild('textInput')
  textInput: ElementRef;

  constructor (
    private formBuilder: FormBuilder,
    private renderer: Renderer,
    private todoService: TodoService,
    private userAgentService: UserAgentService,
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      text: ['']
    });
  }

  ngAfterContentInit(): void {
    this.invokeElementMethod('focus');
  }

  invokeElementMethod(method: string): void {
    this.renderer.invokeElementMethod(this.textInput.nativeElement, method);
  }

  onSubmit(): void {
    const text = this.todoForm.value['text'];

    if (text) {
      this.todoService
        .add(text)
        .then(() => {
          this.todoForm.reset();

          // if the user agent isn't mobile, re-focus the input for convenience,
          // otherwise, blur to hide the on-screen keyboard
          const method = this.userAgentService.isMobile ? 'blur' : 'focus';
          this.invokeElementMethod(method);
        });
    }
  }

}
