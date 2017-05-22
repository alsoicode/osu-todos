import * as moment from 'moment';
import { Todo } from './Todo';

describe('Todo Model', () => {
  describe('displayDateWarning()', () => {
    it('should return `true` if the `createdOn` date is more than 3 days old', () => {
      const oldTodo = new Todo();
      oldTodo.createdOn = moment().subtract(4, 'days').valueOf();
      oldTodo.key = 'abcxyz';
      oldTodo.text = 'An old todo';

      expect(oldTodo.displayDateWarning).toEqual(true);
    });
  });
});
