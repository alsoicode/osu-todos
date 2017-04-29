import { ICompletedTodo } from './ICompletedTodo';
import { Todo } from './Todo';

/**
 * The concrete class that defines a completed "Todo"
 *
 * @export
 * @class CompletedTodo
 * @extends {Todo}
 * @implements {ICompletedTodo}
 */
export class CompletedTodo extends Todo implements ICompletedTodo {
  completedOn: number;
}
