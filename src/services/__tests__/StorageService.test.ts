import {
  savePokemonInLocalStorage,
  savePokemonListInLocalStorage,
  retrievePokemonFromLocalStorage,
  retrievePokemonListFromLocalStorage,
} from "../../storage/pokemon-storage";

import StorageService from "../StorageService";
import { IParsedPokemon, IParsedPokemonList } from "../../types/pokemon";

jest.mock("../../storage/pokemon-storage");

beforeEach(() => {
  jest.clearAllMocks();
});
describe("StorageService", () => {
  const storageService = new StorageService();
  const pokemonDataMock: IParsedPokemon = {
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
  const pokemonListMock: IParsedPokemonList = {
    count: 1,
    pokemon: [],
  };

  const pokemonName = "bulbasaur";
  const listOffset = "0";
  test("StorageService can be instantiated", () => {
    expect(storageService).toBeInstanceOf(StorageService);
  });
  test("savePokemonInLocalStorage should call method with valid parameters", () => {
    storageService.savePokemonInLocalStorage(pokemonName, pokemonDataMock);
    expect(savePokemonInLocalStorage).toHaveBeenCalledTimes(1);
    expect(savePokemonInLocalStorage).toHaveBeenCalledWith(
      pokemonName,
      pokemonDataMock
    );
  });

  test("savePokemonListInLocalStorage should call method with valid parameters", () => {
    storageService.savePokemonListInLocalStorage(pokemonListMock, listOffset);
    expect(savePokemonListInLocalStorage).toHaveBeenCalledTimes(1);
    expect(savePokemonListInLocalStorage).toHaveBeenCalledWith(
      pokemonListMock,
      listOffset
    );
  });

  test("retrievePokemonFromLocalStorage should call method with valid parameters", () => {
    storageService.retrievePokemonFromLocalStorage(pokemonName);
    expect(retrievePokemonFromLocalStorage).toHaveBeenCalledTimes(1);
    expect(retrievePokemonFromLocalStorage).toHaveBeenCalledWith(pokemonName);
  });

  test("retrievePokemonListFromLocalStorage should call method with valid parameters", () => {
    storageService.retrievePokemonListFromLocalStorage(listOffset);
    expect(retrievePokemonListFromLocalStorage).toHaveBeenCalledTimes(1);
    expect(retrievePokemonListFromLocalStorage).toHaveBeenCalledWith(
      listOffset
    );
  });
});
