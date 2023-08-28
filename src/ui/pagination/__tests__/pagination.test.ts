/**
 * @jest-environment jsdom
 */
/// <reference types= '@types/jest' />
import pokemonList from "../fixtures/pokemon-list.json";
import page from "../fixtures/pagination-fixture";
import {
  setCurrentPokemon,
  printPokemonList,
  getPokemonName,
} from "../pagination.js";

beforeEach(() => {
  document.body.innerHTML = page;
});

test("setCurrentPokemon() should set a new current pokemon on click", () => {
  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLDivElement;
  const callBackMock = jest.fn();
  setCurrentPokemon(callBackMock, 5);
  expect($pokemonList.children[5].classList).toContain("current-pokemon");
  expect(callBackMock).toHaveBeenCalledWith("charizard");
});

test("printPokemonList() should print pokemon list", () => {
  printPokemonList(pokemonList);
  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLDivElement;
  expect($pokemonList.children[5].textContent).toEqual("Charizard");
});

test("getPokemonName() should retrieve a pokemon on click by calling the passing callbackFunction", () => {
  const callBackMock = jest.fn();
  getPokemonName(callBackMock);
  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLDivElement;
  const $pokemonListButton = $pokemonList.children[11] as HTMLButtonElement;
  $pokemonListButton.click();
  expect(callBackMock).toHaveBeenCalledWith("butterfree");
  expect(callBackMock).toHaveBeenCalledTimes(1);
  expect($pokemonListButton.classList).toContain("current-pokemon");
});

test("getPokemonName() should not call callback function if a pokemon is not clicked", () => {
  const callBackMock = jest.fn();
  getPokemonName(callBackMock);
  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLDivElement;
  $pokemonList.click();
  expect(callBackMock).toHaveBeenCalledTimes(0);
});
