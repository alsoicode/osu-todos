/**
 * Represents the "shape" of a Todo.
 * When creating or modifying a new Todo object, it must
 * adhere to this interface.
 *
 * @export
 * @interface ITodo
 */
export interface ITodo {
  key?: string;
  createdOn: number;
  text: string;
}
