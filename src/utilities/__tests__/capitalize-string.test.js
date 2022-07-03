/// <reference types="Jest"/>

import capitalizeString from '../capitalize-string.js';

test('should receive a string and set its first character to upper case', () => {
  expect(capitalizeString('charmander')).toBe('Charmander');
});
