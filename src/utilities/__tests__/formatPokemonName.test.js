/// <reference types="Jest"/>

import formatPokemonName from "../formatPokemonName.js";

test("should receive a string and set its first character to upper case", () => {
  expect(formatPokemonName("charmander")).toBe("Charmander");
});
