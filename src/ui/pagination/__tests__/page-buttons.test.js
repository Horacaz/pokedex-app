/**
 * @jest-environment jsdom
 */
/// <reference types= '@types/jest' />
import page from "../fixtures/pagination-fixture.js";
import { handlePages } from "../page-buttons.js";

beforeEach(() => {
  document.body.innerHTML = page;
  const mockCallback = jest.fn();
  handlePages(mockCallback);
});

test("Callback function in handlePages should be called", () => {
  const callBack = jest.fn();
  handlePages(callBack);
  const $buttonNext = document.querySelector("#button-next");
  const $firstPage = document.querySelector("#button-first-page");
  $buttonNext.click();
  $buttonNext.click();
  $firstPage.click();
  expect(callBack).toHaveBeenCalledTimes(3);
});

test("Clicking the next button should update the offset by 15", () => {
  const $buttonNext = document.querySelector("#button-next");
  const $paginator = document.querySelector("#paginator");
  $buttonNext.click();
  expect($paginator.dataset.currentOffset).toEqual("15");
});

test("Going to a next page should update current page", () => {
  const $buttonNext = document.querySelector("#button-next");
  const $pageButtons = document.querySelectorAll(".page-button");
  $buttonNext.click();
  expect($pageButtons[1].classList).toContain("current-page");
  expect($pageButtons[0].classList).not.toContain("current-page");
});

test("First page button should not be disabled if current page is not 1", () => {
  const $buttonNext = document.querySelector("#button-next");
  $buttonNext.click();
  const $firstPageButton = document.querySelector("#button-first-page");
  expect($firstPageButton.classList).not.toContain("disabled");
});

test("New buttons should be generated after next is pressed when the current page is the last position in the current paginator", () => {
  const $buttonNext = document.querySelector("#button-next");
  const $pageButtons = document.querySelectorAll(".page-button");
  $pageButtons[0].classList.remove("current-page");
  $pageButtons[4].classList.add("current-page");
  $buttonNext.click();
  expect($pageButtons[0].classList).toContain("current-page");
  expect($pageButtons[0].textContent).toEqual("6");
});

test("New buttons should be generated after previous is pressed when the current page is the first position in the current paginator and previous pages are available", () => {
  const $buttonNext = document.querySelector("#button-next");
  const $buttonPrevious = document.querySelector("#button-previous");
  const $pageButtons = document.querySelectorAll(".page-button");
  $pageButtons[0].classList.remove("current-page");
  $pageButtons[4].classList.add("current-page");
  $buttonNext.click();
  $buttonPrevious.click();
  expect($pageButtons[4].classList).toContain("current-page");
  expect($pageButtons[4].textContent).toContain("5");
});

test("If current page value equals the max pages value, next and last page buttons should be disabled", () => {
  const $paginator = document.querySelector("#paginator");
  const maxPages = $paginator.dataset.maxPages;
  const $buttonNext = document.querySelector("#button-next");
  const $pageButtons = document.querySelectorAll(".page-button");
  const $lastPageButton = document.querySelector("#button-last-page");
  $pageButtons[1].textContent = maxPages;
  $buttonNext.click();
  expect($buttonNext.classList).toContain("disabled");
  expect($lastPageButton.classList).toContain("disabled");
});

test("Previous and first page buttons should be disabled if current page is 1", () => {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $firstPageButton = document.querySelector("#button-first-page");
  const $buttonPrevious = document.querySelector("#button-previous");
  expect($pageButtons[0].textContent).toEqual("1");
  expect($buttonPrevious.classList).toContain("disabled");
  expect($firstPageButton.classList).toContain("disabled");
});

test("First page button should redirect to first page if current page is not 1", () => {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $buttonNext = document.querySelector("#button-next");
  const $firstPageButton = document.querySelector("#button-first-page");
  $pageButtons[0].classList.remove("current-page");
  $pageButtons[3].classList.add("current-page");
  $buttonNext.click();
  $firstPageButton.click();
  expect($pageButtons[0].classList).toContain("current-page");
});

test("Last page button should redirect to the last available page", () => {
  const $paginator = document.querySelector("#paginator");
  const maxPages = $paginator.dataset.maxPages;
  const $pageButtons = document.querySelectorAll(".page-button");
  const $lastPageButton = document.querySelector("#button-last-page");
  $lastPageButton.click();
  expect($pageButtons[0].textContent).toEqual(maxPages);
});

test("Offset should update when a paginator button is pressed", () => {
  const $paginator = document.querySelector("#paginator");
  const $pageButtons = document.querySelectorAll(".page-button");
  $pageButtons[2].click();
  expect($paginator.dataset.currentOffset).toEqual("30");
});

test("Previous button should redirect to the previous page if current page is not the first", () => {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $buttonNext = document.querySelector("#button-next");
  const $buttonPrevious = document.querySelector("#button-previous");
  $buttonNext.click();
  $buttonPrevious.click();
  expect($pageButtons[0].classList).toContain("current-page");
});

test.skip("Previous pokemon button should not call updatePokemon if current pokemon is first in the paginator", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonPreviousPokemon = document.querySelector("#previous-pokemon");
  const $currentPokemonList = document.querySelectorAll("#pokemon-list button");
  const $currentPage = document.querySelector(".current-page");
  $buttonPreviousPokemon.click();
  expect($currentPage.textContent).toEqual("1");
  expect($currentPokemonList[0].classList).toContain("current-pokemon");
  expect(updatePokemonMock).toHaveBeenCalledTimes(0);
});

test.skip("Previous pokemon button should call updatePokemon", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonPreviousPokemon = document.querySelector("#previous-pokemon");
  const $currentPokemonList = document.querySelectorAll("#pokemon-list button");
  $currentPokemonList[0].classList.remove("current-pokemon");
  $currentPokemonList[5].classList.add("current-pokemon");
  $buttonPreviousPokemon.click();
  expect(updatePokemonMock).toHaveBeenCalledTimes(1);
  expect($currentPokemonList[4].classList).toContain("current-pokemon");
});

test.skip("Previous pokemon button should go back one page if current pokemon is in the first position and there are more pages", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonNext = document.querySelector("#button-next");
  $buttonNext.click();
  const $currentPage = document.querySelector(".current-page");
  const $currentPokemonList = document.querySelectorAll("#pokemon-list button");
  expect($currentPage.textContent).toBe("3");
  expect($currentPokemonList[0]).toBe("");
});

test.skip("Next pokemon button should call updatePokemon", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonNextPokemon = document.querySelector("#next-pokemon");
  const $currentPokemonList = document.querySelectorAll("#pokemon-list button");
  const $currentPage = document.querySelector(".current-page");
  $buttonNextPokemon.click();
  expect($currentPage.textContent).toEqual("1");
  expect($currentPokemonList[1].classList).toContain("current-pokemon");
  expect(updatePokemonMock).toHaveBeenCalledTimes(1);
});

test.skip("Next pokemon button should not call updatePokemon if current pokemon is the last in the paginator", () => {
  const updatePokemonMock = jest.fn();
  const updatePokemonListMock = jest.fn();
  handlePokemonCycle(updatePokemonMock, updatePokemonListMock);
  const $buttonNextPokemon = document.querySelector("#next-pokemon");
  const $currentPokemonList = document.querySelectorAll("#pokemon-list button");
  $currentPokemonList[0].classList.remove("current-pokemon");
  $currentPokemonList[5].classList.add("current-pokemon");
  $buttonNextPokemon.click();
  expect(updatePokemonMock).toHaveBeenCalledTimes(1);
  expect($currentPokemonList[4].classList).toContain("current-pokemon");
});
