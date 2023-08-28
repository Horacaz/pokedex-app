/// <reference types="Jest"/>

import toUpperCaseString from "../toUpperCaseString.js";

test("should receive a string and set its first character to upper case", () => {
  expect(toUpperCaseString("charmander")).toBe("Charmander");
});
