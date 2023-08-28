/// <reference types="@types/jest" />
import {
  retrievePokemonFromLocalStorage,
  retrievePokemonListFromLocalStorage,
  savePokemonInLocalStorage,
  savePokemonListInLocalStorage,
} from "../pokemon-storage";

import { IParsedPokemon, IParsedPokemonList } from "../../types/pokemon";

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  } as unknown as typeof localStorage;
  global.localStorage = localStorageMock;
});

test("SavePokemon should store a pokemon in localStorage", () => {
  const pokemon: IParsedPokemon = {
    name: "pokemon",
    displayName: "pokemon",
    id: 1,
    weight: 1,
    height: 1,
    picture: "",
    ability: "",
    stats: [],
    types: [],
  };
  savePokemonInLocalStorage(pokemon.name, pokemon);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "pokemon",
    '{"name":"pokemon","displayName":"pokemon","id":1,"weight":1,"height":1,"picture":"","ability":"","stats":[],"types":[]}'
  );
});

test("SavePokemonList should store a list of pokemon in localStorage", () => {
  const pokemonList: IParsedPokemonList = {
    count: 1,
    pokemon: [{ name: "pokemon", url: "url", displayName: "pokemon" }],
  };
  const offset = "15";
  savePokemonListInLocalStorage(pokemonList, offset);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "pokemon-list-15",
    '{"count":1,"pokemon":[{"name":"pokemon","url":"url","displayName":"pokemon"}]}'
  );
});

test("Retrieve pokemon should throw if pokemon is null", () => {
  JSON.parse = jest.fn().mockReturnValueOnce(null);
  expect(() => retrievePokemonFromLocalStorage("pokemon")).toThrowError(
    new Error("pokemon is not available on LocalStorage.")
  );
});

test("Retrieve pokemon should retrieve a pokemon if available", () => {
  retrievePokemonFromLocalStorage("bulbasaur");
  expect(localStorage.getItem).toHaveBeenCalledWith("bulbasaur");
});

test("Retreive pokemon list should should throw if pokemon list is not available", () => {
  JSON.parse = jest.fn().mockReturnValueOnce(null);
  expect(() => retrievePokemonListFromLocalStorage("0")).toThrowError(
    new Error("No list available")
  );
});

test("Retrieve pokemon list should retrieve a pokemon list if available", () => {
  retrievePokemonListFromLocalStorage("pokemon-list");
  expect(localStorage.getItem).toHaveBeenCalledWith("pokemon-list");
});
