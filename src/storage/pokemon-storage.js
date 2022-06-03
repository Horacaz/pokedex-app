export function retrievePokemonFromLocalStorage(pokemonName) {
  const pokemon = localStorage.getItem(`${pokemonName}`);
  if (pokemon === null) {
    throw new Error(`${pokemonName} is not available on LocalStorage.`);
  }
  return JSON.parse(pokemon);
}

export function retrievePokemonListFromLocalStorage(listOffset) {
  const pokemonList = localStorage.getItem(listOffset);
  if (pokemonList === null) {
    throw new Error('No hay lista disponible.');
  }
  return JSON.parse(pokemonList);
}

export function savePokemonInLocalStorage(pokemonName, pokemonData) {
  const pokemon = JSON.stringify(pokemonData);
  try {
    localStorage.setItem(pokemonName, pokemon);
  } catch (e) {
    console.log(e);
  }
}
export function savePokemonListInLocalStorage(pokemonList, listOffset = 15) {
  const pokemonDataList = JSON.stringify(pokemonList);
  try {
    localStorage.setItem(`pokemon-list-${listOffset}`, pokemonDataList);
  } catch (e) {
    console.log(e);
  }
}
