/**
 * @jest-environment jsdom
 */
/// <reference types= 'Jest'/>
import initApp from '../index.js';

jest.mock('./index.js', () => jest.fn());

test('Initializes PokeApp', () => {
  initApp();
  expect(initApp).toHaveBeenCalledTimes(1);
});
