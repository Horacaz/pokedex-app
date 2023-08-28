import { IParsedPokemon, IParsedPokemonList } from "../types/pokemon";
export function retrievePokemonFromLocalStorage(
  pokemonName: string
): IParsedPokemon {
  const pokemon = JSON.parse(localStorage.getItem(`${pokemonName}`) as string);
  if (pokemon === null) {
    throw new Error(`${pokemonName} is not available on LocalStorage.`);
  }
  return pokemon;
}

export function retrievePokemonListFromLocalStorage(
  listOffset: string
): IParsedPokemonList {
  const pokemonList = JSON.parse(localStorage.getItem(listOffset) as string);
  if (pokemonList === null) {
    throw new Error("No list available");
  }
  return pokemonList;
}

export function savePokemonInLocalStorage(
  pokemonName: string,
  pokemonData: IParsedPokemon
) {
  const pokemon = JSON.stringify(pokemonData);
  try {
    localStorage.setItem(pokemonName, pokemon);
  } catch (e) {
    return new Error(`Failed to save Pokemon: ${e}`);
  }
}
export function savePokemonListInLocalStorage(
  pokemonList: IParsedPokemonList,
  listOffset = "15"
) {
  const pokemonDataList = JSON.stringify(pokemonList);
  try {
    localStorage.setItem(`pokemon-list-${listOffset}`, pokemonDataList);
  } catch (e) {
    return new Error(`Failed to save List of Pokemon: ${e}`);
  }
}
