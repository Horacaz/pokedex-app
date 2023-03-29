/**
 * @jest-environment jsdom
 */
/// <reference types= '@types/jest' />

import page from "../fixtures/pagination-fixture";
import pokemonData from "../fixtures/pokemon-page.json";
import createPokemonPage from "../pokemon-page.js";

beforeEach(() => {
  document.body.innerHTML = page;
});
test("printPokemonInformation should match data", () => {
  createPokemonPage(pokemonData);
  const $pokemonAbility = document.querySelector("#pokemon-ability");
  const $pokemonHeight = document.querySelector("#pokemon-height");
  const $pokemonWeight = document.querySelector("#pokemon-weight");
  expect($pokemonAbility.textContent).toEqual("Blaze");
  expect($pokemonHeight.textContent).toEqual("1.7 m");
  expect($pokemonWeight.textContent).toEqual("90.5 kg");
});

test("RenderPokemonSprite() should match sprite source", () => {
  createPokemonPage(pokemonData);
  const $pokemonSprite = document.querySelector("#pokemon-sprite");
  const spriteSource = pokemonData.picture;
  expect($pokemonSprite.src).toEqual(spriteSource);
});

test("RenderPokemonSprite() should show question mark image if sprite is non available", () => {
  pokemonData.picture = undefined;
  createPokemonPage(pokemonData);
  const $questionMark = document.querySelector("#question-mark");
  const $pokemonSprite = document.querySelector("#pokemon-sprite");
  expect($pokemonSprite.classList).toContain('d-none');
  expect($questionMark.classList).not.toContain('d-none');
});
