import Pokemon from "../entities/pokemon.js"

export default function mapPokemon(pokemonData){
const {
    name: pokemonData,
} = pokemonData;
return new Pokemon(
    pokemonData
)
}