const URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getAllPokemonList(){
  return fetch(`${URL}?offset=0&limit=10000`)
  .then((response) => response.json())

}

export async function getPokemon(pokemon){
  return fetch(`${URL}/${pokemon}`)
  .then((response) => response.json())
}
