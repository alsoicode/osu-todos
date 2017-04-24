import { ITodo } from './ITodo';

/**
 * The concrete class that defines a "Todo"
 *
 * @export
 * @class Todo
 * @implements {ITodo}
 */
export class Todo implements ITodo {
  key: string;
  createdOn: number;
  text: string;
}
