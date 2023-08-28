const URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonListFromApi(offSet = "0") {
  try {
    return fetch(`${URL}?offset=${offSet}&limit=15`).then((response) =>
      response.json()
    );
  } catch (e) {
    throw new Error(`Failed to fetch a pokemon list from api: ${e}`);
  }
}

export async function getPokemonFromApi(pokemonName: string) {
  try {
    return fetch(`${URL}/${pokemonName}`).then((response) => response.json());
  } catch (e) {
    throw new Error(`Failed to fetch a pokemon from api: ${e}`);
  }
}
