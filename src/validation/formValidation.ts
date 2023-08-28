export default async function validateSearch(
  callBackFunction: (pokemonName: string) => Promise<void>,
  pokemonSearch: string
) {
  const $searchBar = document.querySelector(
    "#search-bar-pokemon"
  ) as HTMLInputElement;
  const regulateInput = /[A-z]$/;

  if (!regulateInput.test(pokemonSearch)) {
    const pokemonName = pokemonSearch;
    try {
      await callBackFunction(pokemonName);
    } catch (e) {
      $searchBar.classList.add("invalid-search");
      $searchBar.value = "The searched Pokemon doesn't exist.";
    }
  } else {
    const pokemonName = pokemonSearch.toLowerCase();
    try {
      await callBackFunction(pokemonName);
    } catch (e) {
      $searchBar.classList.add("invalid-search");
      $searchBar.value = "The searched Pokemon doesn't exist.";
    }
  }
}
