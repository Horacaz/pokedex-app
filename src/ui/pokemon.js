
function generatePokemonHeader(pokemonData) {
  const $pokemonName = document.querySelector('#pokemon-name');
  const pokemonName = pokemonData.name;
  $pokemonName.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const $pokemonTitle = document.querySelector("#pokemon-title");
  $pokemonTitle.textContent = `${$pokemonName.textContent}`;

  const $pokemonSubTitle = document.querySelector("#pokemon-subtitle");
  $pokemonSubTitle.textContent = `Entry N°${pokemonData.id}`;
}


function generatePokemonSprite(pokemonData) {
  const $pokemonSprite = document.querySelector('#pokemon-sprite');
  $pokemonSprite.setAttribute('src', `${pokemonData.sprites.other['official-artwork'].front_default}`);
}

function generatePokemonInformation(pokemonData) {

  const $pokemonAbility = document.querySelector('#pokemon-ability');
  const pokemonAbility = pokemonData.abilities[0].ability.name;
  const pokemonAbilityName = pokemonAbility.charAt(0).toUpperCase() + pokemonAbility.slice(1);
  $pokemonAbility.textContent = pokemonAbilityName;

  const $pokemonHeight = document.querySelector('#pokemon-height');
  $pokemonHeight.textContent = (pokemonData.height / 10) + " m";

  const $pokemonWeight = document.querySelector('#pokemon-weight');
  $pokemonWeight.textContent = (pokemonData.weight / 10) + " kg";


}

function generatePokemonTypes(pokemonData) {
  const $pokemonTypes = document.querySelector('#pokemon-types');
  if ($pokemonTypes) $pokemonTypes.replaceChildren();

  const pokemonTypes = pokemonData.types;

  for (let i = 0; i < pokemonTypes.length; i += 1) {
    const pokemonType = pokemonTypes[i].type.name;
    const $pokemonType = document.createElement('button');
    $pokemonType.setAttribute('type', 'button');
    $pokemonType.classList.add('type', `${pokemonType}`, 'btn', 'btn-dark', 'fs-5', 'fw-bolder')
    $pokemonType.textContent = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
    $pokemonTypes.appendChild($pokemonType);
  }


}

function generatePokemonStats(pokemonData) {
  const $pokemonHp = document.querySelector('#pokemon-hp');
  $pokemonHp.textContent = pokemonData.stats[0].base_stat;

  const $pokemonAttack = document.querySelector('#pokemon-attack');
  $pokemonAttack.textContent = pokemonData.stats[1].base_stat;

  const $pokemonDefense = document.querySelector('#pokemon-defense');
  $pokemonDefense.textContent = pokemonData.stats[2].base_stat;

  const $pokemonSpecialAttack = document.querySelector('#pokemon-special-attack');
  $pokemonSpecialAttack.textContent = pokemonData.stats[3].base_stat;

  const $pokemonSpecialDefense = document.querySelector('#pokemon-special-defense');
  $pokemonSpecialDefense.textContent = pokemonData.stats[4].base_stat;

  const $pokemonSpeed = document.querySelector('#pokemon-speed');
  $pokemonSpeed.textContent = pokemonData.stats[5].base_stat;
}

export default async function generatePokemonPage(pokemonData) {
  generatePokemonHeader(pokemonData);
  generatePokemonSprite(pokemonData);
  generatePokemonInformation(pokemonData);
  generatePokemonStats(pokemonData);
  generatePokemonTypes(pokemonData);
}
