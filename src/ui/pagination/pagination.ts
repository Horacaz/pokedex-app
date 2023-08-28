import { IParsedPokemonList } from "../../types/pokemon";
import filterPokemonEntry from "../../utilities/filterPokemonEntry.js";
type getPokemonCallBack = (pokemon: string) => Promise<void>;

export function setCurrentPokemon(
  getPokemonCallBack: getPokemonCallBack,
  newCurrentPokemon: number
) {
  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLButtonElement;
  const $newCurrentPokemon = $pokemonList.children[
    newCurrentPokemon
  ] as HTMLButtonElement;
  $newCurrentPokemon.classList.add("current-pokemon");
  const newPokemonEntry = filterPokemonEntry($newCurrentPokemon);
  getPokemonCallBack(newPokemonEntry);
}

export async function printPokemonList(pokemonList: IParsedPokemonList) {
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const totalPokemon = pokemonList.count;
  $paginator.dataset.totalPokemon = totalPokemon.toString();
  const pokemonLimit = 15;
  $paginator.dataset.maxPages = Math.ceil(
    totalPokemon / pokemonLimit
  ).toString();

  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLDivElement;
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

export async function getPokemonName(getPokemonCallBack: getPokemonCallBack) {
  const $pokemonList = document.querySelector(
    "#pokemon-list"
  ) as HTMLDivElement;

  $pokemonList.onclick = (pokemon) => {
    const $newCurrentPokemon = pokemon.target as HTMLDivElement;
    if ($newCurrentPokemon !== null) {
      if ($newCurrentPokemon.id !== "pokemon-list") {
        const $currentPokemon = document.querySelector(
          ".current-pokemon"
        ) as HTMLButtonElement;
        $currentPokemon.classList.remove("current-pokemon");
        $newCurrentPokemon.classList.add("current-pokemon");
        const pokemonName = filterPokemonEntry($newCurrentPokemon);
        getPokemonCallBack(pokemonName);
      }
    }
  };
}
