import { IParsedPokemonList } from "../types/pokemon";
export default class PokemonList implements IParsedPokemonList {
  count: number;
  pokemon: { displayName: string; name: string; url: string }[];
  constructor({ count, pokemon }: IParsedPokemonList) {
    this.count = count;
    this.pokemon = pokemon;
  }
}
