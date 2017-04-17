import { ITodo } from './ITodo';


export class Todo implements ITodo {
  completedOn: Date;
  createdOn: Date;
  text: string;
  userId: string;
}
