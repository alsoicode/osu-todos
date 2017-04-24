import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DragulaModule } from 'ng2-dragula';
import { MarkCompleteDirective } from './todo/directives/mark-complete.directive';
import { MarkRemovalDirective } from './todo/directives/mark-remove.directive';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo/todo-form.component';
import { TodosComponent } from './todos.component';
import { todosRouting } from './todos.routing';

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(todosRouting),
  ],
  declarations: [
    MarkCompleteDirective,
    MarkRemovalDirective,
    TodoComponent,
    TodoFormComponent,
    TodosComponent,
  ],
})
export class TodosModule {}
