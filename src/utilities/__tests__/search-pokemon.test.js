/**
 * @jest-environment jsdom
 */
/// <reference types='Jest' />
import handleSearch from "../search-pokemon.js";

beforeEach(() => {
  document.body.innerHTML = `
  <form id=pokemon-search>
  <input class=invalid-search id=search-bar-pokemon>
  <button id=search-pokemon-button></button>
  </form>`;
});

test("search a pokemon when clicking the search button", () => {
  const mockCallBack = jest.fn();
  const $button = document.getElementById("search-pokemon-button");
  $button.click(handleSearch(mockCallBack));
  expect(mockCallBack).toHaveBeenCalledTimes(1);
});

test("searchs a pokemon on submit", () => {
  const mockCallBack = jest.fn();
  const $form = document.getElementById("pokemon-search");
  $form.submit(handleSearch(mockCallBack));
  expect(mockCallBack).toHaveBeenCalledTimes(1);
});

test("after a failed search, clicking on the search bar eliminates its invalid state", () => {
  const $input = document.getElementById("search-bar-pokemon");
  $input.click(handleSearch());
  expect($input.classList).not.toContain("invalid-search");
});
