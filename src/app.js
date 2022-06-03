import { fetchPokemon, fetchPokemonList } from './services/load-pokemon.js';
import { getPokemonName, printPokemonList, setCurrentPokemon } from './ui/pagination/pagination.js';
import createPokemonPage from './ui/pokemon-page.js';
import handlePages from './ui/pagination/page-buttons.js';
import handleSearch from './utilities/search-pokemon.js';
import handlePokemonCycle from './ui/pagination/previous-next-pokemon.js';

async function updatePokemonPage(pokemon) {
  const pokemonData = await fetchPokemon(pokemon);
  createPokemonPage(pokemonData);
}

async function updatePokemonList(offSet, newCurrentPokemon) {
  const pokemonList = await fetchPokemonList(offSet);
  printPokemonList(pokemonList);
  setCurrentPokemon(updatePokemonPage, newCurrentPokemon);
}

async function handlePokemonSearch(pokemonSearch) {
  const pokemonData = await fetchPokemon(pokemonSearch);
  createPokemonPage(pokemonData);
}

function handleApp() {
  getPokemonName(updatePokemonPage);
  handlePages(updatePokemonList);
  handlePokemonCycle(updatePokemonPage, updatePokemonList);
  handleSearch(handlePokemonSearch);
}

export default async function initApp() {
  printPokemonList(await fetchPokemonList());
  updatePokemonPage('bulbasaur');
  setCurrentPokemon();
  handleApp();
}
