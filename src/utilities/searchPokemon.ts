import validateSearch from "../validation/formValidation.js";

export default function handleSearch(
  callBackFunction: (pokemonName: string) => Promise<void>
) {
  const $form = document.querySelector("#pokemon-search") as HTMLFormElement;
  const $searchBar = document.querySelector(
    "#search-bar-pokemon"
  ) as HTMLInputElement;
  const $searchButton = document.querySelector(
    "#search-pokemon-button"
  ) as HTMLButtonElement;

  $searchBar.onclick = () => {
    $searchBar.classList.remove("invalid-search");
    $searchBar.value = "";
  };
  $form.onsubmit = async (event) => {
    event.preventDefault();
    await validateSearch(callBackFunction, $searchBar.value);
  };

  $searchButton.onclick = async (event) => {
    event.preventDefault();
    await validateSearch(callBackFunction, $searchBar.value);
  };
}
