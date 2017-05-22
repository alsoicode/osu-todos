import * as moment from 'moment';
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

  /**
   * This property demonstrates a very simple example of why you would
   * use your own object populated from Firebase data. You can add whatever
   * getters, setters, etc.
   */
  get displayDateWarning(): boolean {
    const now = moment();
    const createdOnDate = moment(this.createdOn);
    return now.diff(createdOnDate, 'days') > 3;
  }
}
