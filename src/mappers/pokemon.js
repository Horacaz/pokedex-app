import Pokemon from "../entities/pokemon.js";
import toUpperCaseString from "../utilities/toUpperCaseString.js";
export default function mapPokemon(apiData) {
  const pokemonData = {};
  pokemonData.name = apiData.name;
  pokemonData.id = apiData.id;
  pokemonData.picture = apiData.sprites.other['official-artwork'].front_default
  pokemonData.height = apiData.height;
  pokemonData.weight = apiData.weight;
  pokemonData.displayName = toUpperCaseString(apiData.name);
  pokemonData.ability = toUpperCaseString(apiData.abilities[0].ability.name);
  pokemonData.types = apiData.types.map((type) =>
    toUpperCaseString(type.type.name)
  );
  pokemonData.stats = apiData.stats.map((stat) => ({
    baseStat: stat.base_stat,
  }));
  return new Pokemon(pokemonData);
}
