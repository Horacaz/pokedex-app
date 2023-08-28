import pokemonListFixture from "./pokemonListFixture.json";
import mapPokemonList from "../pokemonList.js";
import PokemonList from "../../entities/pokemonList";
import { IParsedPokemonList, IUnparsedPokemonList } from "../../types/pokemon";
describe("mapPokemonList", () => {
  test("mapPokemonList should map a list of pokemon from data fixture correctly", () => {
    const pokemonList: IUnparsedPokemonList = pokemonListFixture;
    const newPokemonList: IParsedPokemonList = mapPokemonList(pokemonList);
    expect(newPokemonList).toBeInstanceOf(PokemonList);
  });
});
