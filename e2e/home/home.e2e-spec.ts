import { browser, element, by } from 'protractor';

describe('Home Page', () => {
  it('should display message "Hi"', () => {
    browser.get('/');
    browser.ignoreSynchronization = true;

    element(by.tagName('h1')).isPresent().then(result => {
      expect(result).toBeTruthy();
    });
  });
});
