import capitalizeString from "../utilities/capitalize-string.js";

function renderPokemonHeader(pokemonData) {
  const $pokemonName = document.querySelector("#pokemon-name");
  const pokemonName = capitalizeString(pokemonData.name);
  [$pokemonName.textContent] = pokemonName.split("-");

  const $pokemonTitle = document.querySelector("#pokemon-title");
  [$pokemonTitle.textContent] = pokemonName.split("-");

  const $pokemonSubTitle = document.querySelector("#pokemon-subtitle");
  $pokemonSubTitle.textContent = `Entry N°${pokemonData.id}`;
}

function renderPokemonSprite(pokemonData) {
  const $questionMark = document.querySelector("#question-mark");
  const $pokemonSprite = document.querySelector("#pokemon-sprite");
  const pokemonSprite =
    pokemonData.sprites.other["official-artwork"].front_default;
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
  const pokemonAbility = pokemonData.abilities[0].ability.name;
  const pokemonAbilityName = capitalizeString(pokemonAbility);

  $pokemonAbility.textContent = pokemonAbilityName;

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

  for (let i = 0; i < pokemonTypes.length; i += 1) {
    const pokemonType = pokemonTypes[i].type.name;
    const $pokemonType = document.createElement("button");

    $pokemonType.setAttribute("type", "button");
    $pokemonType.classList.add(
      "type",
      `${pokemonType}`,
      "btn",
      "btn-dark",
      "fs-5",
      "fw-bolder"
    );
    $pokemonType.textContent = capitalizeString(pokemonType);
    $pokemonTypes.appendChild($pokemonType);
  }
}

function printPokemonStats(pokemonData) {
  const $pokemonStats = document.querySelectorAll(".statistic");
  $pokemonStats.forEach((statistic, i) => {
    const pokemonStat = statistic;
    pokemonStat.textContent = pokemonData.stats[i].base_stat;
  });
}

export default async function createPokemonPage(pokemonData) {
  renderPokemonHeader(pokemonData);
  renderPokemonSprite(pokemonData);
  printPokemonInformation(pokemonData);
  printPokemonStats(pokemonData);
  renderPokemonTypes(pokemonData);
}
