export function setCurrentPokemon(
  callBackFunction = () => {},
  newCurrentPokemon = 0
) {
  const $pokemonList = document.querySelector("#pokemon-list");
  const $newCurrentPokemon = $pokemonList.children[newCurrentPokemon];
  $newCurrentPokemon.classList.add("current-pokemon");
  const [newPokemonEntry] = $newCurrentPokemon.dataset.pokemon.split("-entry");
  callBackFunction(newPokemonEntry);
}

export async function printPokemonList(pokemonList) {
  const $paginator = document.querySelector("#paginator");
  const totalPokemon = pokemonList.count;
  $paginator.dataset.totalPokemon = totalPokemon;

  const pokemonLimit = 15;

  $paginator.dataset.maxPages = Math.ceil(totalPokemon / pokemonLimit);

  const $pokemonList = document.querySelector("#pokemon-list");
  $pokemonList.replaceChildren();
  pokemonList.pokemon.map((pokemon, i) => {
    const $pokemonButton = document.createElement("button");
    $pokemonButton.setAttribute("type", "button");
    $pokemonButton.classList.add("btn", "btn-dark", "fw-bolder");
    $pokemonButton.setAttribute("data-pokemon", `${pokemon.name}-entry-${i}`);
    $pokemonButton.textContent = pokemon.displayName;
    $pokemonList.appendChild($pokemonButton);
  });
}

export async function getPokemonName(callBackFunction = () => {}) {
  const $pokemonList = document.querySelector("#pokemon-list");

  $pokemonList.onclick = (pokemon) => {
    const $newCurrentPokemon = pokemon.target;
    if ($newCurrentPokemon.id !== "pokemon-list") {
      const $currentPokemon = document.querySelector(".current-pokemon");
      $currentPokemon.classList.remove("current-pokemon");
      $newCurrentPokemon.classList.add("current-pokemon");

      const [pokemonName] = $newCurrentPokemon.dataset.pokemon.split("-entry");
      callBackFunction(pokemonName);
    }
  };
}
