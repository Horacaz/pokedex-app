import toUpperCaseString from "../utilities/toUpperCaseString.js";
import PokemonList from "../entities/pokemonList.js";
import { IParsedPokemonList, IUnparsedPokemonList } from "../types/pokemon";

export default function mapPokemonList(
  apiData: IUnparsedPokemonList
): IParsedPokemonList {
  const count = apiData.count;
  const pokemon = apiData.results.map((pokemon) => ({
    displayName: toUpperCaseString(pokemon.name),
    url: pokemon.url,
    name: pokemon.name,
  }));
  const pokemonList = { count, pokemon };
  return new PokemonList(pokemonList);
}
