import capitalizeString from "../utilities/capitalize-string.js";

function renderPokemonHeader(pokemonData) {
  const $pokemonName = document.querySelector("#pokemon-name");

  const pokemonName = capitalizeString(pokemonData.name);
  $pokemonName.textContent = pokemonName;

  const $pokemonTitle = document.querySelector("#pokemon-title");
  $pokemonTitle.textContent = pokemonName;
  const $pokemonSubTitle = document.querySelector("#pokemon-subtitle");
  $pokemonSubTitle.textContent = `Entry N°${pokemonData.id}`;
}

function renderPokemonSprite(pokemonData) {
  const $questionMark = document.querySelector("#question-mark");
  const $pokemonSprite = document.querySelector("#pokemon-sprite");
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

function printPokemonInformation(pokemonData) {
  const $pokemonAbility = document.querySelector("#pokemon-ability");
  $pokemonAbility.textContent = capitalizeString(pokemonData.ability);

  const $pokemonHeight = document.querySelector("#pokemon-height");
  $pokemonHeight.textContent = `${pokemonData.height / 10} m`;

  const $pokemonWeight = document.querySelector("#pokemon-weight");
  $pokemonWeight.textContent = `${pokemonData.weight / 10} kg`;
}

function renderPokemonTypes(pokemonData) {
  const $pokemonTypes = document.querySelector("#pokemon-types");
  if ($pokemonTypes) {
    $pokemonTypes.replaceChildren();
  }

  const pokemonTypes = pokemonData.types;

  pokemonTypes.map((type) => {
    const $pokemonType = document.createElement("button");
    $pokemonType.textContent = capitalizeString(type.type.name);
    $pokemonType.setAttribute("type", "button");
    $pokemonType.classList.add(
      "type",
      `${type.type.name}`,
      "btn",
      "btn-dark",
      "fs-5",
      "fw-bolder"
    );
    $pokemonTypes.appendChild($pokemonType);
  });
}

function printPokemonStats(pokemonData) {
  const $pokemonStats = document.querySelectorAll(".statistic");
  const pokemonStats = pokemonData.stats;
  pokemonStats.map((stat, i) => {
    $pokemonStats[i].textContent = stat.base_stat;
  });
}

export default async function createPokemonPage(Pokemon) {
  renderPokemonHeader(Pokemon);
  renderPokemonSprite(Pokemon);
  printPokemonInformation(Pokemon);
  printPokemonStats(Pokemon);
  renderPokemonTypes(Pokemon);
}
