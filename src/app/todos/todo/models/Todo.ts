import { ITodo } from './ITodo';

export class Todo implements ITodo {
  key: string;
  completedOn: string;
  createdOn: string;
  text: string;
  userId: string;
}
