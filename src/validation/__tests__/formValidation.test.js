/**
 * @jest-environment jsdom
 */
/// <reference types='Jest' />
import validateSearch from '../formValidation.js';

beforeEach(() => {
  document.body.innerHTML = `
  <input id=search-bar-pokemon>`;
});

test('a good pokemon search returns a pokemon that doesnt exist.', () => {
  const mockCallBack = jest.fn().mockImplementation(() => { throw new Error(''); });
  const $searchBar = document.getElementById('search-bar-pokemon');
  validateSearch(mockCallBack, 'Bulbasaur');
  expect($searchBar.classList).toContain('invalid-search');
  expect($searchBar.value).toEqual("The searched Pokemon doesn't exist.");
});

test('validates a good pokemon search', async () => {
  const mockCallBack = jest.fn().mockImplementation(() => {});
  validateSearch(mockCallBack, 'Bulbasaur');

  expect(mockCallBack).toHaveBeenCalledTimes(1);
  expect(mockCallBack).toHaveBeenCalledWith('bulbasaur');
});

test('validates a bad pokemon search', () => {
  const mockCallBack = jest.fn().mockImplementation(() => { throw new Error(''); });
  const $searchBar = document.getElementById('search-bar-pokemon');
  validateSearch(mockCallBack, '123');

  expect(mockCallBack).toHaveBeenCalledTimes(1);
  expect(mockCallBack).toHaveBeenCalledWith('123');
  expect($searchBar.classList).toContain('invalid-search');
  expect($searchBar.value).toEqual("The searched Pokemon doesn't exist.");
});
