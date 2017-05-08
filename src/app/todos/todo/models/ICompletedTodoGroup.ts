import { ICompletedTodo } from './ICompletedTodo';

export interface ICompletedTodoGroup {
  week: string;
  todos: ICompletedTodo[];
}
