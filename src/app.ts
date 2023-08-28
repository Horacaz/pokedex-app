import PokedexService from "./services/PokedexService.js";
import StorageService from "./services/StorageService.js";
import PokemonService from "./services/PokemonService.js";

import {
  getPokemonName,
  printPokemonList,
  setCurrentPokemon,
} from "./ui/pagination/pagination.js";
import createPokemonPage from "./ui/pokemonPage.js";
import {
  handlePages,
  handlePokemonCycle,
} from "./ui/pagination/page-buttons.js";
import handleSearch from "./utilities/searchPokemon.js";

const pokemonInstance = new PokemonService(
  new StorageService(),
  new PokedexService()
);

async function updatePokemonPage(pokemon: string) {
  const pokemonData = await pokemonInstance.getPokemon(pokemon);
  createPokemonPage(pokemonData);
}

async function updatePokemonList(
  offSet: string,
  newCurrentPokemon: number = 0
) {
  const pokemonList = await pokemonInstance.getPokemonList(offSet);
  printPokemonList(pokemonList);
  setCurrentPokemon(updatePokemonPage, newCurrentPokemon);
}

async function handlePokemonSearch(pokemonSearch: string) {
  const pokemonData = await pokemonInstance.getPokemon(pokemonSearch);
  createPokemonPage(pokemonData);
}

function handleApp() {
  getPokemonName(updatePokemonPage);
  handlePages(updatePokemonList);
  handlePokemonCycle(updatePokemonPage, updatePokemonList);
  handleSearch(handlePokemonSearch);
}

export default async function initApp() {
  const initialPokemonListOffset = "0";
  printPokemonList(
    await pokemonInstance.getPokemonList(initialPokemonListOffset)
  );
  handleApp();
  updatePokemonPage("bulbasaur");
  setCurrentPokemon(updatePokemonPage, 0);
}
