import PokemonList from "../pokemonList";
import { IParsedPokemonList } from "../../types/pokemon";
describe("Pokemon List Class", () => {
  test("Should generate a instance of Pokemon List when passed valid parameters", () => {
    const pokemonList: IParsedPokemonList = {
      count: 1280,
      pokemon: [
        { displayName: "Bulbasaur", name: "bulbasaur", url: "url" },
        { displayName: "Ivysaur", name: "ivysaur", url: "url" },
        { displayName: "Venusaur", name: "venusaur", url: "url" },
      ],
    };
    const newPokemonList = new PokemonList(pokemonList);
    expect(newPokemonList).toBeInstanceOf(PokemonList);
    expect.assertions(1);
  });
});
