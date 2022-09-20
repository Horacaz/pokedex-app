import Pokemon from '../entities/pokemon.js';

export default function mapPokemon(apiData) {
  const {
    name,
    id,
    sprites: { other: { 'official-artwork': { front_default: picture } } },
    abilities: { 0: { ability: { name: ability } } },
    height,
    weight,
    types,
    stats,
  } = apiData;

  return new Pokemon(name, id, picture, ability, height, weight, types, stats);
}
