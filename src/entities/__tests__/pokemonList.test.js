///<reference types = "@types/jest" />
import PokemonList from "../pokemonList.js";
describe("Pokemon List Class", () => {
  test("Should generate a instance of Pokemon List when passed valid parameters", () => {
    const list = {
      count: 1280,
      pokemon: ["Bulbasaur", "Ivyasaur", "Venusaur"],
    };
    const pokemonList = new PokemonList(list);
    expect(pokemonList).toBeInstanceOf(PokemonList);
    expect.assertions(1);
  });
});
