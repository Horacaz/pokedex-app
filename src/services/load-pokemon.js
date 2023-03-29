import { getPokemonFromApi, getPokemonListFromApi } from "../api/pokedex.js";
import mapPokemon from '../mappers/pokemon.js'
import mapPokemonList from "../mappers/pokemonList.js";
import {
  retrievePokemonFromLocalStorage,
  retrievePokemonListFromLocalStorage,
  savePokemonInLocalStorage,
  savePokemonListInLocalStorage,
} from "../storage/pokemon-storage.js";

export async function fetchPokemon(pokemonName) {
  try {
    return retrievePokemonFromLocalStorage(pokemonName);
  } catch (e) {
    const pokemon = mapPokemon(await getPokemonFromApi(pokemonName));
    savePokemonInLocalStorage(pokemonName, pokemon);
    return pokemon;
  }
}

export async function fetchPokemonList(offSet = 0) {
  try {
    return retrievePokemonListFromLocalStorage(offSet);
  } catch (e) {
    const pokemonList = mapPokemonList(await getPokemonListFromApi(offSet));
    savePokemonListInLocalStorage(pokemonList, offSet);
    return pokemonList;
  }
}
