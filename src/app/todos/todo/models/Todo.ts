import { ITodo } from './ITodo';

export class Todo implements ITodo {
  key: string;
  completedOn: number;
  createdOn: number;
  text: string;
  userId: string;
}
