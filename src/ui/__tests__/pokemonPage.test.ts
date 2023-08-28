/**
 * @jest-environment jsdom
 */

import { IParsedPokemon } from "../../types/pokemon";
import page from "../fixtures/pagination-fixture";
import pokemonData from "../fixtures/pokemon-page.json";
import createPokemonPage from "../pokemonPage.js";

const pokemonDataFixture: IParsedPokemon = pokemonData;
beforeEach(() => {
  document.body.innerHTML = page;
  jest.clearAllMocks();
});

describe("createPokemonPage", () => {
  test("printPokemonInformation should match data", () => {
    createPokemonPage(pokemonDataFixture);
    const $pokemonAbility = document.querySelector(
      "#pokemon-ability"
    ) as HTMLElement;
    const $pokemonHeight = document.querySelector(
      "#pokemon-height"
    ) as HTMLElement;
    const $pokemonWeight = document.querySelector(
      "#pokemon-weight"
    ) as HTMLElement;
    expect($pokemonAbility.textContent).toEqual("Blaze");
    expect($pokemonHeight.textContent).toEqual("1.7 m");
    expect($pokemonWeight.textContent).toEqual("90.5 kg");
  });

  test("RenderPokemonSprite() should match sprite source", () => {
    createPokemonPage(pokemonDataFixture);
    const $pokemonSprite = document.querySelector(
      "#pokemon-sprite"
    ) as HTMLImageElement;
    const spriteSource = pokemonDataFixture.picture;
    expect($pokemonSprite.src).toEqual(spriteSource);
  });

  test("RenderPokemonSprite() should show question mark image if sprite is non available", () => {
    pokemonDataFixture.picture = undefined;
    createPokemonPage(pokemonDataFixture);
    const $questionMark = document.querySelector(
      "#question-mark"
    ) as HTMLImageElement;
    const $pokemonSprite = document.querySelector(
      "#pokemon-sprite"
    ) as HTMLImageElement;
    expect($pokemonSprite.classList).toContain("d-none");
    expect($questionMark.classList).not.toContain("d-none");
  });
});
