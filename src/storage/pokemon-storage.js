export function retrievePokemonFromLocalStorage(pokemonName) {
  const pokemon = JSON.parse(localStorage.getItem(`${pokemonName}`));
  if (pokemon === null) {
    throw new Error(`${pokemonName} is not available on LocalStorage.`);
  }
  return pokemon;
}

export function retrievePokemonListFromLocalStorage(listOffset) {
  const pokemonList = JSON.parse(localStorage.getItem(listOffset));
  if (pokemonList === null) {
    throw new Error("No list available");
  }
  return pokemonList;
}

export function savePokemonInLocalStorage(pokemonName, pokemonData) {
  const pokemon = JSON.stringify(pokemonData);
  try {
    localStorage.setItem(pokemonName, pokemon);
  } catch (e) {
    return console.log(e);
  }
}
export function savePokemonListInLocalStorage(pokemonList, listOffset = 15) {
  const pokemonDataList = JSON.stringify(pokemonList);
  try {
    localStorage.setItem(`pokemon-list-${listOffset}`, pokemonDataList);
  } catch (e) {
  return console.log(e);
  }
}
