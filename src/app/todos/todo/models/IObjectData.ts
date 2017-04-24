/**
 * Represents part of the object graph that is returned by Firebase
 * that we can use to create our Todo object
 *
 * @export
 * @interface IObjectData
 */
export interface IObjectData {
  $key: string;
  createdOn: number;
  text: string;
}
