import formatPokemonName from "../utilities/formatPokemonName.js";
import PokemonList from "../entities/pokemonList.js";
export default function mapPokemonList(apiData){
 const count = apiData.count;
 const pokemon = apiData.results.map( (pokemon) => (
    {name: formatPokemonName(pokemon.name), url: pokemon.url}
 ))
    return new PokemonList(count, pokemon)
  }