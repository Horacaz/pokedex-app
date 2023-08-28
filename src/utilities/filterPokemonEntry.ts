export default function filterPokemonEntry(
  pokemonElement: HTMLElement
): string {
  const newPokemonEntry = pokemonElement.dataset["pokemon"]?.split(
    "-entry"
  )[0] as string;
  return newPokemonEntry;
}
