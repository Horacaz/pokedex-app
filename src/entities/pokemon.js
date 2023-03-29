export default class Pokemon {
  constructor(name, displayName, id, picture, ability, height, weight, types, stats) {
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
