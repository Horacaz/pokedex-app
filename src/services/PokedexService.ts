import { getPokemonFromApi, getPokemonListFromApi } from "../api/pokedex.js";
import mapPokemon from "../mappers/pokemon.js";
import mapPokemonList from "../mappers/pokemonList.js";
import { IParsedPokemon, IParsedPokemonList } from "../types/pokemon";

export default class PokedexService {
  async getPokemonFromApi(pokemonName: string): Promise<IParsedPokemon> {
    return mapPokemon(await getPokemonFromApi(pokemonName));
  }
  async getPokemonListFromApi(offSet: string): Promise<IParsedPokemonList> {
    return mapPokemonList(await getPokemonListFromApi(offSet));
  }
}
