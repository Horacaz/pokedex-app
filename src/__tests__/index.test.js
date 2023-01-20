/**
 * @jest-environment jsdom
 */
/// <reference types= '@types/jest' />
import initApp from '../app.js';
import '../index.js';

jest.mock('../app.js', () => jest.fn());

test('Initializes PokeApp', () => {
  expect(initApp).toHaveBeenCalledTimes(1);
});
