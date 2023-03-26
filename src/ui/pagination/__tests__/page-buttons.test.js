/**
 * @jest-environment jsdom
 */
/// <reference types= '@types/jest' />
import page from "../fixtures/pagination-fixture.js";
import handlePages from "../page-buttons.js";

beforeEach(() => {
  document.body.innerHTML = page;
  const mockCallback = jest.fn();
  handlePages(mockCallback);
});

test("test", () => {
  expect(1 + 1).toBe(2);
});
