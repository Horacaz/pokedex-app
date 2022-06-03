import capitalizeString from '../../utilities/capitalize-string.js';

export function setCurrentPokemon(callBackFunction = () => {}, newCurrentPokemon = 0) {
  const $pokemonList = document.querySelector('#pokemon-list');
  const $newCurrentPokemon = $pokemonList.children[newCurrentPokemon];
  $newCurrentPokemon.classList.add('current-pokemon');
  const [newPokemonEntry] = $newCurrentPokemon.dataset.pokemon.split('-entry');
  callBackFunction(newPokemonEntry);
}

export async function printPokemonList(pokemonList) {
  const $paginator = document.querySelector('#paginator');
  const totalPokemon = pokemonList.count;
  $paginator.dataset.totalPokemon = totalPokemon;

  const pokemonLimit = 15;

  $paginator.dataset.maxPages = Math.ceil(totalPokemon / pokemonLimit);

  const $pokemonList = document.querySelector('#pokemon-list');
  $pokemonList.replaceChildren();

  for (let i = 0; i < pokemonLimit; i += 1) {
    if (!pokemonList.results[i]) {
      return;
    }
    const $pokemonButton = document.createElement('button');

    $pokemonButton.setAttribute('type', 'button');
    $pokemonButton.classList.add('btn', 'btn-dark', 'fw-bolder');

    const pokemonName = pokemonList.results[i].name;
    $pokemonButton.setAttribute('data-pokemon', `${pokemonName}-entry-${i}`);
    $pokemonButton.textContent = capitalizeString(pokemonName);
    $pokemonList.appendChild($pokemonButton);
  }
}

export async function getPokemonName(callBackFunction = () => {}) {
  const $pokemonList = document.querySelector('#pokemon-list');

  $pokemonList.onclick = (pokemon) => {
    const $newCurrentPokemon = pokemon.target;
    if ($newCurrentPokemon.id === 'pokemon-list') {
      return;
    }

    const $currentPokemon = document.querySelector('.current-pokemon');
    if ($currentPokemon) {
      $currentPokemon.classList.remove('current-pokemon');
      $newCurrentPokemon.classList.add('current-pokemon');
    } else {
      $newCurrentPokemon.classList.add('current-pokemon');
    }

    const [pokemonName] = $newCurrentPokemon.dataset.pokemon.split('-entry');
    callBackFunction(pokemonName);
  };
}
