import { IParsedPokemon, IParsedPokemonList } from "../types/pokemon";

type PokedexService = {
  getPokemonFromApi(pokemonName: string): Promise<IParsedPokemon>;
  getPokemonListFromApi(offSet: string): Promise<IParsedPokemonList>;
};

type StorageService = {
  savePokemonInLocalStorage(
    pokemonName: string,
    pokemonData: IParsedPokemon
  ): void;
  retrievePokemonFromLocalStorage(pokemonName: string): IParsedPokemon;
  savePokemonListInLocalStorage(
    pokemonList: IParsedPokemonList,
    listOffset: string
  ): void;
  retrievePokemonListFromLocalStorage(listOffset: string): IParsedPokemonList;
};
export default class PokemonService {
  storage: StorageService;
  pokedex: PokedexService;

  constructor(StorageService: StorageService, PokedexService: PokedexService) {
    this.storage = StorageService;
    this.pokedex = PokedexService;
  }
  async getPokemon(pokemonName: string) {
    try {
      return this.storage.retrievePokemonFromLocalStorage(pokemonName);
    } catch (e) {
      const pokemon = await this.pokedex.getPokemonFromApi(pokemonName);
      this.storage.savePokemonInLocalStorage(pokemonName, pokemon);
      return pokemon;
    }
  }
  async getPokemonList(offSet: string) {
    try {
      return this.storage.retrievePokemonListFromLocalStorage(offSet);
    } catch (e) {
      const pokemonList = await this.pokedex.getPokemonListFromApi(offSet);
      this.storage.savePokemonListInLocalStorage(pokemonList, offSet);
      return pokemonList;
    }
  }
}
