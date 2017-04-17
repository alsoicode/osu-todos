import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MarkDoneDirective } from './todo/directives/mark-done.directive';
import { MarkRemovalDirective } from './todo/directives/mark-remove.directive';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo-form.component';
import { TodosComponent } from './todos.component';
import { todosRouting } from './todos.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(todosRouting),
  ],
  declarations: [
    MarkDoneDirective,
    MarkRemovalDirective,
    TodoComponent,
    TodoFormComponent,
    TodosComponent,
  ],
})
export class TodosModule {}
