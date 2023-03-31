/// <reference types ="@types/jest" />
const apiURL = "https://pokeapi.co/api/v2/pokemon";
import { getPokemonListFromApi, getPokemonFromApi } from "../pokedex";
beforeEach(() => {
  global.fetch = jest.fn();
});
describe("getPokemonListFromApi", () => {
  test("Pokemon List should have been called with parameters", () => {
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          const jsonPromise = new Promise((r) => {
            r({});
          });
          resolve({ json: () => jsonPromise });
        })
    );

    const pokemonOffset = 0;
    getPokemonListFromApi(pokemonOffset);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${apiURL}?offset=${pokemonOffset}&limit=15`
    );
  });

  test("Should throw if an error ocurred on getPokemon", () => {
    expect(getPokemonListFromApi()).rejects.toThrow();
  });
});

describe("getPokemonFromApi", () => {
  test("Pokemon name should have been called with correct parameters", () => {
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          const jsonPromise = new Promise((r) => {
            r({});
          });
          resolve({ json: () => jsonPromise });
        })
    );

    const pokemonName = "bulbasaur";
    getPokemonFromApi(pokemonName);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${apiURL}/${pokemonName}`);
  });

  test("Should throw if an error ocurred on getPokemon", () => {
    expect(getPokemonFromApi()).rejects.toThrow();
  });
});
