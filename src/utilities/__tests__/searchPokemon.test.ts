/**
 * @jest-environment jsdom
 */
import handleSearch from "../searchPokemon";

beforeEach(() => {
  document.body.innerHTML = `
  <form id=pokemon-search>
  <input class=invalid-search id=search-bar-pokemon>
  <button id=search-pokemon-button></button>
  </form>`;
  jest.clearAllMocks();
});

describe("handleSearch", () => {
  test("search a pokemon when clicking the search button", () => {
    const mockCallBack = jest.fn();
    handleSearch(mockCallBack);

    const $button = document.getElementById(
      "search-pokemon-button"
    ) as HTMLButtonElement;
    $button.click();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  test("searchs a pokemon on submit", () => {
    const mockCallBack = jest.fn();
    handleSearch(mockCallBack);

    const $form = document.getElementById("pokemon-search") as HTMLFormElement;
    $form.submit();
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });

  test("after a failed search, clicking on the search bar eliminates its invalid state", () => {
    const mockCallBack = jest.fn();
    handleSearch(mockCallBack);
    const $input = document.getElementById(
      "search-bar-pokemon"
    ) as HTMLInputElement;
    $input.click();
    expect($input.classList).not.toContain("invalid-search");
  });
});
