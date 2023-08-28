import {
  savePokemonInLocalStorage,
  savePokemonListInLocalStorage,
  retrievePokemonFromLocalStorage,
  retrievePokemonListFromLocalStorage,
} from "../storage/pokemon-storage.js";
import { IParsedPokemon, IParsedPokemonList } from "../types/pokemon";
export default class StorageService {
  savePokemonInLocalStorage(pokemonName: string, pokemonData: IParsedPokemon) {
    return savePokemonInLocalStorage(pokemonName, pokemonData);
  }
  retrievePokemonFromLocalStorage(pokemonName: string): IParsedPokemon {
    return retrievePokemonFromLocalStorage(pokemonName);
  }
  savePokemonListInLocalStorage(
    pokemonList: IParsedPokemonList,
    listOffset: string
  ) {
    return savePokemonListInLocalStorage(pokemonList, listOffset);
  }
  retrievePokemonListFromLocalStorage(listOffset: string): IParsedPokemonList {
    return retrievePokemonListFromLocalStorage(listOffset);
  }
}
