import { getPokemonFromApi, getPokemonListFromApi } from "../../api/pokedex";
import mapPokemon from "../../mappers/pokemon";
import mapPokemonList from "../../mappers/pokemonList";

import PokedexService from "../PokedexService";

jest.mock("../../api/pokedex");
jest.mock("../../mappers/pokemon");
jest.mock("../../mappers/pokemonList");

describe("PokedexService", () => {
  const pokedexService = new PokedexService();
  test("PokedexService can be instantiated", () => {
    expect(pokedexService).toBeInstanceOf(PokedexService);
  });

  test("getPokemonListFromApi should be called", async () => {
    const offSet = "0";
    await pokedexService.getPokemonListFromApi(offSet);
    expect(getPokemonListFromApi).toHaveBeenCalledTimes(1);
    expect(getPokemonListFromApi).toHaveBeenCalledWith(offSet);
    expect(mapPokemonList).toHaveBeenCalledTimes(1);
  });

  test("getPokemonFromApi should be called", async () => {
    const pokemon = "bulbasaur";
    await pokedexService.getPokemonFromApi(pokemon);
    expect(getPokemonFromApi).toHaveBeenCalledTimes(1);
    expect(mapPokemon).toHaveBeenCalledTimes(1);
  });
});
