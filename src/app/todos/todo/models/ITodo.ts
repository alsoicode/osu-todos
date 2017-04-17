export interface ITodo {
  $key?: string;
  completedOn?: number;
  createdOn: number;
  text: string;
  userId: string;
}
