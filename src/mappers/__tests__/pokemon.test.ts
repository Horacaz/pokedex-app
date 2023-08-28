import pokemonFixture from "./pokemonFixture.json";
import mapPokemon from "../pokemon";
import Pokemon from "../../entities/pokemon";
import { IUnparsedPokemon, IParsedPokemon } from "../../types/pokemon";
describe("mapPokemon", () => {
  test("mapPokemon should map a Pokemon from fixture correctly", () => {
    const pokemonMapFixture: IUnparsedPokemon = pokemonFixture;
    const pokemon: IParsedPokemon = mapPokemon(pokemonMapFixture);
    expect(pokemon).toBeInstanceOf(Pokemon);
  });
});
