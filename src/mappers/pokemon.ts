import Pokemon from "../entities/pokemon.js";
import toUpperCaseString from "../utilities/toUpperCaseString.js";
import { IParsedPokemon, IUnparsedPokemon } from "../types/pokemon";
export default function mapPokemon(apiData: IUnparsedPokemon): IParsedPokemon {
  const name = apiData.name;
  const id = apiData.id;
  const picture = apiData.sprites.other["official-artwork"].front_default;
  const height = apiData.height;
  const weight = apiData.weight;
  const displayName = toUpperCaseString(apiData.name);
  const ability = toUpperCaseString(
    apiData.abilities[0]?.ability.name || "none"
  );
  const types = apiData.types.map((type) => toUpperCaseString(type.type.name));
  const stats = apiData.stats.map((stat) => ({
    baseStat: stat.base_stat,
  }));
  return new Pokemon({
    name,
    id,
    picture,
    ability,
    height,
    weight,
    displayName,
    types,
    stats,
  });
}
