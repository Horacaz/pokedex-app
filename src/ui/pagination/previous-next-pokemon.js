import { updateNextPage, updatePreviousPage } from './page-buttons.js';

const $buttonPreviousPokemon = document.querySelector('#previous-pokemon');
const $buttonNextPokemon = document.querySelector('#next-pokemon');

function getPreviousPokemon(updatePokemon = () => {}, updatePokemonList = () => {}) {
  $buttonPreviousPokemon.onclick = async () => {
    const $currentPokemonList = document.querySelectorAll('#pokemon-list button');
    const totalPokemonButtons = $currentPokemonList.length;
    const $currentPage = document.querySelector('.current-page');

    if ($currentPokemonList[0].classList.contains('current-pokemon')
    && $currentPage.textContent === '1') {
      return;
    }

    if ($currentPokemonList[0].classList.contains('current-pokemon')) {
      $currentPokemonList[0].classList.remove('current-pokemon');
      updatePreviousPage(updatePokemonList);
      return;
    }

    for (let i = 0; i < totalPokemonButtons; i += 1) {
      let previousPokemon;

      if ($currentPokemonList[i].classList.contains('current-pokemon')) {
        $currentPokemonList[i].classList.remove('current-pokemon');
        previousPokemon = $currentPokemonList[i - 1];
        previousPokemon.classList.add('current-pokemon');
        const [pokemonName] = previousPokemon.dataset.pokemon.split('-entry-');
        updatePokemon(pokemonName);
        return;
      }
    }
  };
}

async function getNextPokemon(updatePokemon = () => {}, updatePokemonList = () => {}) {
  $buttonNextPokemon.onclick = () => {
    const $currentPokemonList = document.querySelectorAll('#pokemon-list button');
    const totalPokemonButtons = $currentPokemonList.length;
    const currentPage = document.querySelector('.current-page');
    const $paginator = document.querySelector('#paginator');
    const { currentOffset, totalPokemon, maxPages } = $paginator.dataset;

    if (currentOffset === totalPokemon || currentPage.textContent === maxPages) {
      return;
    }

    const $currentPokemon = document.querySelector('.current-pokemon');

    if (!$currentPokemon) {
      $currentPokemonList[0].classList.add('current-pokemon');
      updatePokemon($currentPokemonList[0].dataset.pokemon.split('-entry-')[0]);
      return;
    }

    if ($currentPokemonList[totalPokemonButtons - 1]
      .classList.contains('current-pokemon')) {
      $currentPokemonList[totalPokemonButtons - 1]
        .classList.remove('current-pokemon');
      updateNextPage(updatePokemonList);
      return;
    }

    for (let i = 0; i < totalPokemonButtons; i += 1) {
      if ($currentPokemonList[i].classList.contains('current-pokemon')) {
        $currentPokemonList[i].classList.remove('current-pokemon');
        const nextPokemon = $currentPokemonList[i + 1];
        nextPokemon.classList.add('current-pokemon');
        const pokemonName = nextPokemon.dataset.pokemon.split('-entry-')[0];
        updatePokemon(pokemonName);
        return;
      }
    }
  };
}

export default function handlePokemonCycle(updatePokemon, updatePokemonList) {
  getPreviousPokemon(updatePokemon, updatePokemonList);
  getNextPokemon(updatePokemon, updatePokemonList);
}
