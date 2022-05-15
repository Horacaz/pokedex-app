const $currentPage = document.querySelector("#paginator");

export async function generatePokemonList(POKEMON_LIST) {
  const pokemonlimit = 15;
  const offSet = Number($currentPage.dataset.currentOffset);
  
  const $pokemonList = document.querySelector('#pokemon-list');
  $pokemonList.replaceChildren()

  for (let i = offSet; i < (offSet + pokemonlimit) ; i += 1) {
    const $pokemonName = document.createElement('button');

    $pokemonName.setAttribute('type', 'button');
    $pokemonName.classList.add('btn', 'btn-dark','fw-bolder');

    const pokemonName = POKEMON_LIST.results[i-1].name;
    $pokemonName.setAttribute('id', `${pokemonName}-entry-${i}`);
    $pokemonName.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) ;
    $pokemonList.appendChild($pokemonName);
  }
 
}

export async function getPokemonName(callBackFunction = () => {}) {
  const $pokemonButton = document.querySelector('#pokemon-list');
  const $currentPokemon = document.querySelector("#pokemon-page");
 
  $pokemonButton.onclick = (pokemon) => {
    const $pokemon = pokemon.target.id.split("-entry-")
    callBackFunction($pokemon[0]);
    $currentPokemon.dataset.currentPokemon = ($pokemon[1] - 1);
  }
}
