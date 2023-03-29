import toUpperCaseString from "../utilities/toUpperCaseString.js";
import PokemonList from "../entities/pokemonList.js";
export default function mapPokemonList(apiData){
 const count = apiData.count;
 const pokemon = apiData.results.map( (pokemon) => (
    {displayName: toUpperCaseString(pokemon.name), url: pokemon.url, name: pokemon.name}
 ))
    return new PokemonList(count, pokemon)
  }