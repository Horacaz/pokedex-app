/**
 * @jest-environment jsdom
 */
/// <reference types= '@types/jest' />
import page from "../fixtures/pagination-fixture";
import { handlePages, handlePokemonCycle } from "../page-buttons.js";

beforeEach(() => {
  document.body.innerHTML = page;
  const mockCallback = jest.fn();
  handlePages(mockCallback);
  handlePokemonCycle(mockCallback, mockCallback);
});

test("Callback function in handlePages should be called", () => {
  const callBack = jest.fn();
  handlePages(callBack);
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $firstPage = document.querySelector(
    "#button-first-page"
  ) as HTMLButtonElement;
  $buttonNext.click();
  $buttonNext.click();
  $firstPage.click();
  expect(callBack).toHaveBeenCalledTimes(3);
});

test("Clicking the next button should update the offset by 15", () => {
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $paginator = document.querySelector("#paginator") as HTMLInputElement;
  $buttonNext.click();
  expect($paginator.dataset.currentOffset).toEqual("15");
});

test("Going to a next page should update current page", () => {
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  $buttonNext.click();
  expect($pageButtons[1].classList).toContain("current-page");
  expect($pageButtons[0].classList).not.toContain("current-page");
});

test("First page button should not be disabled if current page is not 1", () => {
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  $buttonNext.click();
  const $firstPageButton = document.querySelector(
    "#button-first-page"
  ) as HTMLButtonElement;
  expect($firstPageButton.classList).not.toContain("disabled");
});

test("New buttons should be generated after next is pressed when the current page is the last position in the current paginator", () => {
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  $pageButtons[0].classList.remove("current-page");
  $pageButtons[4].classList.add("current-page");
  $buttonNext.click();
  expect($pageButtons[0].classList).toContain("current-page");
  expect($pageButtons[0].textContent).toEqual("6");
});

test("New buttons should be generated after previous is pressed when the current page is the first position in the current paginator and previous pages are available", () => {
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $buttonPrevious = document.querySelector(
    "#button-previous"
  ) as HTMLButtonElement;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  $pageButtons[0].classList.remove("current-page");
  $pageButtons[4].classList.add("current-page");
  $buttonNext.click();
  $buttonPrevious.click();
  expect($pageButtons[4].classList).toContain("current-page");
  expect($pageButtons[4].textContent).toContain("5");
});

test("If current page value equals the max pages value, next and last page buttons should be disabled", () => {
  const $paginator = document.querySelector("#paginator") as HTMLInputElement;
  const maxPages = $paginator.dataset.maxPages as string;
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $lastPageButton = document.querySelector(
    "#button-last-page"
  ) as HTMLButtonElement;
  $pageButtons[1].textContent = maxPages;
  $buttonNext.click();
  expect($buttonNext.classList).toContain("disabled");
  expect($lastPageButton.classList).toContain("disabled");
});

test("Previous and first page buttons should be disabled if current page is 1", () => {
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $firstPageButton = document.querySelector(
    "#button-first-page"
  ) as HTMLButtonElement;
  const $buttonPrevious = document.querySelector(
    "#button-previous"
  ) as HTMLButtonElement;
  expect($pageButtons[0].textContent).toEqual("1");
  expect($buttonPrevious.classList).toContain("disabled");
  expect($firstPageButton.classList).toContain("disabled");
});

test("First page button should redirect to first page if current page is not 1", () => {
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $firstPageButton = document.querySelector(
    "#button-first-page"
  ) as HTMLButtonElement;
  $pageButtons[0].classList.remove("current-page");
  $pageButtons[3].classList.add("current-page");
  $buttonNext.click();
  $firstPageButton.click();
  expect($pageButtons[0].classList).toContain("current-page");
});

test("Last page button should redirect to the last available page", () => {
  const $paginator = document.querySelector("#paginator") as HTMLInputElement;
  const maxPages = $paginator.dataset.maxPages as string;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $lastPageButton = document.querySelector(
    "#button-last-page"
  ) as HTMLButtonElement;
  $lastPageButton.click();
  expect($pageButtons[0].textContent).toEqual(maxPages);
});

test("Offset should update when a paginator button is pressed", () => {
  const $paginator = document.querySelector("#paginator") as HTMLInputElement;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  $pageButtons[2].click();
  expect($paginator.dataset.currentOffset).toEqual("30");
});

test("Previous button should redirect to the previous page if current page is not the first", () => {
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $buttonPrevious = document.querySelector(
    "#button-previous"
  ) as HTMLButtonElement;
  $buttonNext.click();
  $buttonPrevious.click();
  expect($pageButtons[0].classList).toContain("current-page");
});

test("Previous pokemon button should not call updatePokemon if current pokemon is first in the paginator", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonPreviousPokemon = document.querySelector(
    "#previous-pokemon"
  ) as HTMLButtonElement;
  const $currentPokemonList = document.querySelectorAll(
    "#pokemon-list button"
  ) as NodeListOf<HTMLButtonElement>;
  const $currentPage = document.querySelector(
    ".current-page"
  ) as HTMLInputElement;
  $buttonPreviousPokemon.click();
  expect($currentPage.textContent).toEqual("1");
  expect($currentPokemonList[0].classList).toContain("current-pokemon");
  expect(updatePokemonMock).toHaveBeenCalledTimes(0);
});

test("Previous pokemon button should call updatePokemon", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonPreviousPokemon = document.querySelector(
    "#previous-pokemon"
  ) as HTMLButtonElement;
  const $currentPokemonList = document.querySelectorAll(
    "#pokemon-list button"
  ) as NodeListOf<HTMLButtonElement>;
  $currentPokemonList[0].classList.remove("current-pokemon");
  $currentPokemonList[5].classList.add("current-pokemon");
  $buttonPreviousPokemon.click();
  expect(updatePokemonMock).toHaveBeenCalledTimes(1);
  expect($currentPokemonList[4].classList).toContain("current-pokemon");
});
test("Next pokemon button should call updatePokemon", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonNextPokemon = document.querySelector(
    "#next-pokemon"
  ) as HTMLButtonElement;
  const $currentPokemonList = document.querySelectorAll(
    "#pokemon-list button"
  ) as NodeListOf<HTMLButtonElement>;
  const $currentPage = document.querySelector(
    ".current-page"
  ) as HTMLInputElement;
  $buttonNextPokemon.click();
  expect($currentPage.textContent).toEqual("1");
  expect($currentPokemonList[1].classList).toContain("current-pokemon");
  expect(updatePokemonMock).toHaveBeenCalledTimes(1);
});
