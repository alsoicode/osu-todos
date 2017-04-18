import { ICompletedTodo } from './ICompletedTodo';
import { Todo } from './Todo';

export class CompletedTodo extends Todo implements ICompletedTodo {
  completedOn: number;
}
