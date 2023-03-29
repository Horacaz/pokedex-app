import Pokemon from "../entities/Pokemon.js"; 
import formatPokemonName from '../utilities/formatPokemonName.js'
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

  const displayName =  formatPokemonName(apiData.name);
  const ability = formatPokemonName(apiData.abilities[0].ability.name);
  const types = apiData.types.map( (type) => (
   formatPokemonName(type.type.name)
  ))
  return new Pokemon(name, displayName, id, picture, ability, height, weight, types, stats);
}
