import * as getApi from "../../api/pokedex.js";
import mapPokemon from "../../mappers/pokemon.js";
import mapPokemonList from "../../mappers/pokemonList.js";
import * as pokemonStorage from "../../storage/pokemon-storage.js";

import { fetchPokemon, fetchPokemonList } from "../load-pokemon";

jest.mock("../../api/pokedex.js");
jest.mock("../../storage/pokemon-storage.js");
jest.mock("../../mappers/pokemon.js");
jest.mock("../../mappers/pokemonList.js");

describe("fetchPokemon", () => {
  test("fetchPokemon retrieving function from localStorage is called", () => {
    fetchPokemon();
    expect(
      pokemonStorage.retrievePokemonFromLocalStorage
    ).toHaveBeenCalledTimes(1);
  });
  test("fetchPokemon does not found pokemon in localStorage and retrieves pokemon from api", async () => {
    pokemonStorage.retrievePokemonFromLocalStorage = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error();
      });
    await fetchPokemon();
    expect(getApi.getPokemonFromApi).toHaveBeenCalledTimes(1);
    expect(mapPokemon).toHaveBeenCalledTimes(1);
    expect(pokemonStorage.savePokemonInLocalStorage).toHaveBeenCalledTimes(1);
  });
});
describe("fetchPokemonList", () => {
  test("fetchPokemonList retrieving function from localStorage is called", () => {
    fetchPokemonList();
    expect(
      pokemonStorage.retrievePokemonListFromLocalStorage
    ).toHaveBeenCalledTimes(1);
  });
  test("fetchPokemonList does not found pokemonList in localStorage and retrieves list from api", async () => {
    pokemonStorage.retrievePokemonListFromLocalStorage = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error();
      });
    await fetchPokemonList();
    expect(getApi.getPokemonListFromApi).toHaveBeenCalledTimes(1);
    expect(mapPokemonList).toHaveBeenCalledTimes(1);
    expect(pokemonStorage.savePokemonListInLocalStorage).toHaveBeenCalledTimes(
      1
    );
  });
});
