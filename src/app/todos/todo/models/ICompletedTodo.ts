import { ITodo } from './ITodo';

export interface ICompletedTodo extends ITodo {
  completedOn: number;
}
