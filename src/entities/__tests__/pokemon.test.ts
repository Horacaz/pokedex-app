import Pokemon from "../pokemon";
import { IParsedPokemon } from "../../types/pokemon";

describe("Pokemon Class", () => {
  test("Should generate a instance of Pokemon when passed valid parameters", () => {
    const pokemon: IParsedPokemon = {
      name: "bulbasaur",
      displayName: "Bulbasaur",
      id: 1,
      picture: "pokemon.png",
      ability: "Overgrow",
      height: 0.7,
      weight: 6.9,
      types: ["Grass", "Poison"],
      stats: [{ baseStat: 45 }, { baseStat: 49 }, { baseStat: 43 }],
    };
    const Bulbasaur = new Pokemon(pokemon);
    expect(Bulbasaur).toBeInstanceOf(Pokemon);
    expect.assertions(1);
  });
});
