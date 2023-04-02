import pokemonListFixture from "./pokemonListFixture.json";
import mapPokemonList from "../pokemonList.js";
import PokemonList from "../../entities/pokemonList";
describe("mapPokemonList", () => {
  test("mapPokemonList should map a list of pokemon from data fixture correctly", () => {
    const pokemonList = mapPokemonList(pokemonListFixture);
    expect(pokemonList).toBeInstanceOf(PokemonList);
  });
});
