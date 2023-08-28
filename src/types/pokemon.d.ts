interface Abilities {
  ability: { name: string; url: string };
}

interface Sprite {
  other: { "official-artwork": { front_default: string; front_shiny: string } };
}

interface Stats {
  base_stat: number;
  stat: { name: string; url: string };
}

interface Types {
  type: { name: string; url: string };
}

export interface IUnparsedPokemon {
  abilities: Abilities[];
  height: number;
  id: number;
  name: string;
  sprites: Sprites;
  stats: Stats[];
  types: Types[];
  weight: number;
}

export interface IParsedPokemon {
  name: string;
  id: number;
  picture?: string;
  height: number;
  weight: number;
  displayName: string;
  ability: string;
  stats: { baseStat: number }[];
  types: string[];
}

export interface IUnparsedPokemonList {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface IParsedPokemonList {
  count: number;
  pokemon: {
    displayName: string;
    name: string;
    url: string;
  }[];
}
