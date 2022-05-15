import { getPokemon, getAllPokemonList} from './list-pokemon.js';
import { getPokemonName, generatePokemonList } from './ui/pagination.js';
import generatePokemonPage from './ui/pokemon.js';
import handlePages from './ui/page-buttons.js';
import handleSearch from './ui/search-pokemon.js';
import handlePokemonCycle from './ui/previous-next-pokemon.js';

const POKEMON_LIST = await getAllPokemonList();


async function updatePokemonPage(pokemon) {
  const pokemonData = await getPokemon(pokemon);
  generatePokemonPage(pokemonData);
}

 async function updatePokemonList(){;
  await generatePokemonList(POKEMON_LIST);
}

async function handlePokemonSearch(pokemonSearch){
  const pokemonData = await getPokemon(pokemonSearch)
  generatePokemonPage(pokemonData);
}

async function firstVisit(POKEMON_LIST){
  await generatePokemonList(POKEMON_LIST);
  const pokemonData = await getPokemon('1');
  await generatePokemonPage(pokemonData);
}

async function initialize() {
  firstVisit(POKEMON_LIST);
  getPokemonName(updatePokemonPage);
  handleSearch(handlePokemonSearch);
  handlePages(updatePokemonList, POKEMON_LIST)
  handlePokemonCycle(updatePokemonPage, POKEMON_LIST)

}

initialize();
