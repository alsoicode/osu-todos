import { ITodo } from './ITodo';

export class Todo implements ITodo {
  key: string;
  createdOn: number;
  text: string;
}
