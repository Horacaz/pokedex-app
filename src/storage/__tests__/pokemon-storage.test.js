/// <reference types="@types/jest" />
import {
  retrievePokemonFromLocalStorage,
  retrievePokemonListFromLocalStorage,
  savePokemonInLocalStorage,
  savePokemonListInLocalStorage,
} from "../pokemon-storage";

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  global.localStorage = localStorageMock;
});

test("SavePokemon should store a pokemon in localStorage", () => {
  const pokemon = { name: "pokemon", data: {} };
  savePokemonInLocalStorage(pokemon.name, pokemon.data);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith("pokemon", "{}");
});

test("SavePokemonList should store a list of pokemon in localStorage", () => {
  const pokemonList = [{ name: "pokemon" }];
  const offset = 15;
  savePokemonListInLocalStorage(pokemonList, offset);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "pokemon-list-15",
    '[{"name":"pokemon"}]'
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
  expect(() => retrievePokemonListFromLocalStorage()).toThrowError(
    new Error("No list available")
  );
});

test("Retrieve pokemon list should retrieve a pokemon list if available", () => {
  retrievePokemonListFromLocalStorage("pokemon-list");
  expect(localStorage.getItem).toHaveBeenCalledWith("pokemon-list");
});

test("Save pokemon should console error", () => {
  const mockSpy = jest
    .spyOn(global.console, "log")
    .mockImplementation(() => {});
  localStorage.setItem = jest.fn().mockImplementationOnce(() => {
    throw new Error("Error");
  });
  savePokemonInLocalStorage();
  expect(mockSpy).toHaveBeenCalledWith(Error("Error"));
});

test("Save pokemon list should console error", () => {
  const mockSpy = jest
    .spyOn(global.console, "log")
    .mockImplementation(() => {});
  localStorage.setItem = jest.fn().mockImplementationOnce(() => {
    throw new Error("Error");
  });
  savePokemonListInLocalStorage();
  expect(mockSpy).toHaveBeenCalledWith(Error("Error"));
});
