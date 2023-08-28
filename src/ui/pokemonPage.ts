import { IParsedPokemon } from "../types/pokemon";
function renderPokemonHeader(pokemonData: IParsedPokemon) {
  const $pokemonName = document.querySelector(
    "#pokemon-name"
  ) as HTMLDivElement;
  const pokemonName = pokemonData.displayName;
  $pokemonName.textContent = pokemonName;
  const $pokemonTitle = document.querySelector(
    "#pokemon-title"
  ) as HTMLDivElement;
  $pokemonTitle.textContent = pokemonName;
  const $pokemonSubTitle = document.querySelector(
    "#pokemon-subtitle"
  ) as HTMLDivElement;
  $pokemonSubTitle.textContent = `Entry N°${pokemonData.id}`;
}

function renderPokemonSprite(pokemonData: IParsedPokemon) {
  const $questionMark = document.querySelector(
    "#question-mark"
  ) as HTMLDivElement;
  const $pokemonSprite = document.querySelector(
    "#pokemon-sprite"
  ) as HTMLDivElement;
  const pokemonSprite = pokemonData.picture;
  if (pokemonSprite) {
    $pokemonSprite.classList.remove("d-none");
    $questionMark.classList.add("d-none");
    $pokemonSprite.setAttribute("src", pokemonSprite);
  } else {
    $pokemonSprite.classList.add("d-none");
    $questionMark.classList.remove("d-none");
  }
}

function printPokemonInformation(pokemonData: IParsedPokemon) {
  const $pokemonAbility = document.querySelector(
    "#pokemon-ability"
  ) as HTMLDivElement;
  $pokemonAbility.textContent = pokemonData.ability;

  const $pokemonHeight = document.querySelector(
    "#pokemon-height"
  ) as HTMLDivElement;
  $pokemonHeight.textContent = `${pokemonData.height / 10} m`;

  const $pokemonWeight = document.querySelector(
    "#pokemon-weight"
  ) as HTMLDivElement;
  $pokemonWeight.textContent = `${pokemonData.weight / 10} kg`;
}

function renderPokemonTypes(pokemonData: IParsedPokemon) {
  const $pokemonTypes = document.querySelector(
    "#pokemon-types"
  ) as HTMLDivElement;
  if ($pokemonTypes) {
    $pokemonTypes.replaceChildren();
  }

  const pokemonTypes = pokemonData.types;

  pokemonTypes.map((type) => {
    const $pokemonType = document.createElement("button");
    $pokemonType.textContent = type;
    $pokemonType.setAttribute("type", "button");
    $pokemonType.classList.add(
      "type",
      `${type}`,
      "btn",
      "btn-dark",
      "fs-5",
      "fw-bolder"
    );
    $pokemonTypes.appendChild($pokemonType);
  });
}

function printPokemonStats(pokemonData: IParsedPokemon) {
  const $pokemonStats = document.querySelectorAll(".statistic") as NodeList;
  const pokemonStats = pokemonData.stats;
  pokemonStats.map((stat, i) => {
    const $pokemonStat = $pokemonStats[i] as HTMLParagraphElement;
    $pokemonStat.textContent = stat.baseStat.toString();
  });
}

export default async function createPokemonPage(Pokemon: IParsedPokemon) {
  renderPokemonHeader(Pokemon);
  renderPokemonSprite(Pokemon);
  printPokemonInformation(Pokemon);
  printPokemonStats(Pokemon);
  renderPokemonTypes(Pokemon);
}
