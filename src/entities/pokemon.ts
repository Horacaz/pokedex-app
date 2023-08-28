import { IParsedPokemon } from "../types/pokemon";
export default class Pokemon implements IParsedPokemon {
  name: string;
  displayName: string;
  id: number;
  picture?: string;
  ability: string;
  height: number;
  weight: number;
  types: string[];
  stats: { baseStat: number }[];
  constructor({
    name,
    displayName,
    id,
    picture,
    ability,
    height,
    weight,
    types,
    stats,
  }: IParsedPokemon) {
    this.name = name;
    this.id = id;
    this.picture = picture;
    this.ability = ability;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.stats = stats;
    this.displayName = displayName;
  }
}
