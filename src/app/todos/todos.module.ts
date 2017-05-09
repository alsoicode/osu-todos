import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { HistoryComponent } from './history.component';
import { MarkCompleteDirective } from './todo/directives/mark-complete.directive';
import { MarkRemovalDirective } from './todo/directives/mark-remove.directive';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    HistoryComponent,
    MarkCompleteDirective,
    MarkRemovalDirective,
    TodoComponent,
    TodoFormComponent,
    TodosComponent,
  ],
})
export class TodosModule {}
