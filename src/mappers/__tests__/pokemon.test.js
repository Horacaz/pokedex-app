import pokemonFixture from './pokemonFixture.json'
import mapPokemon from '../pokemon.js';
import Pokemon from '../../entities/pokemon';
describe('mapPokemon', () =>{
  test('mapPokemon should map a Pokemon from fixture correctly', () =>{
    const pokemon = mapPokemon(pokemonFixture);
    expect(pokemon).toBeInstanceOf(Pokemon);
  })
})