import Pokemon from "../entities/Pokemon.js"; 
import toUpperCaseString from '../utilities/toUpperCaseString.js'
export default function mapPokemon(apiData) {
  const {
    name,
    id,
    sprites: {
      other: {
        "official-artwork": { front_default: picture },
      },
    },
    height,
    weight,
    stats,
  } = apiData;

  const displayName =  toUpperCaseString(apiData.name);
  const ability = toUpperCaseString(apiData.abilities[0].ability.name);
  const types = apiData.types.map( (type) => (
    toUpperCaseString(type.type.name)
  ))
  return new Pokemon(name, displayName, id, picture, ability, height, weight, types, stats);
}
