function buttonHandle() {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $paginator = document.querySelector("#paginator");
  const { maxPages } = $paginator.dataset;
  const $buttonPrevious = document.querySelector("#button-previous");
  const $buttonNext = document.querySelector("#button-next");
  const $firstPageButton = document.querySelector("#button-first-page");
  const $lastPageButton = document.querySelector("#button-last-page");
  const $currentPage = document.querySelector(".current-page");

  if ($currentPage.textContent === "1") {
    $buttonPrevious.classList.add("disabled");
    $firstPageButton.classList.add("disabled");

    $lastPageButton.classList.remove("disabled");
    $buttonNext.classList.remove("disabled");
    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].classList.remove("disabled");
    }
  } else if ($currentPage.textContent === maxPages) {
    $firstPageButton.classList.remove("disabled");
    $buttonPrevious.classList.remove("disabled");
    $buttonNext.classList.remove("disabled");
    $lastPageButton.classList.add("disabled");
    $buttonNext.classList.add("disabled");
    for (let i = 1; i < $pageButtons.length; i += 1) {
      $pageButtons[i].classList.add("disabled");
    }
  } else {
    $buttonPrevious.classList.remove("disabled");
    $buttonNext.classList.remove("disabled");
    $firstPageButton.classList.remove("disabled");
    $lastPageButton.classList.remove("disabled");
    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].classList.remove("disabled");
    }
  }
}

function generatePageButtons(currentPage) {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $currentPage = document.querySelector(".current-page");
  $currentPage.classList.remove("current-page");

  if (currentPage === 1) {
    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = currentPage + i;
      $pageButtons[i].textContent = currentPage + i;
    }
    $pageButtons[0].classList.add("current-page");
  } else {
    for (let i = 1; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = currentPage + i;
      $pageButtons[i].textContent = currentPage + i;
    }
    $pageButtons[0].classList.add("current-page");
    $pageButtons[0].dataset.page = currentPage;
    $pageButtons[0].textContent = currentPage;
  }
}

function generatePreviousPageButtons(currentPage) {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $currentPage = currentPage;
  const page = Number($currentPage.dataset.page);
  const id = Number($currentPage.id.split("button-")[1]);
  if ($pageButtons[0].classList.contains("current-page")) {
    $pageButtons[0].classList.remove("current-page");

    const totalPageButtons = $pageButtons.length;
    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = page - totalPageButtons + i;
      $pageButtons[i].textContent = page - totalPageButtons + i;
    }
    const $newCurrentPage = document.querySelector("#page-button-5");
    $newCurrentPage.classList.add("current-page");
  } else {
    $currentPage.classList.remove("current-page");
    const $newCurrentPage = document.querySelector(`#page-button-${id - 1}`);
    $newCurrentPage.classList.add("current-page");
  }
}

export function updatePreviousPage(callBackFunction = () => {}) {
  const pokemonPerPage = 15;
  const $paginator = document.querySelector("#paginator");
  const currentOffset = Number($paginator.dataset.currentOffset);
  const currentPage = document.querySelector(".current-page");
  const lastPokemon = pokemonPerPage - 1;
  const previousOffset = (currentOffset - pokemonPerPage).toString();

  callBackFunction(previousOffset, lastPokemon);
  generatePreviousPageButtons(currentPage);
  buttonHandle();
  $paginator.dataset.currentOffset = previousOffset;
  return;
}

function firstPage(callBackFunction = () => {}) {
  const $paginator = document.querySelector("#paginator");
  const $firstPage = document.querySelector("#button-first-page");

  $firstPage.onclick = () => {
    const currentPage = 1;
    $paginator.dataset.currentOffset = "0";
    const currentOfset = Number($paginator.dataset.currentOffset);
    callBackFunction(currentOfset);
    generatePageButtons(currentPage);
    buttonHandle();
  };
}

function lastPage(callBackFunction = () => {}) {
  const $paginator = document.querySelector("#paginator");
  const $lastPage = document.querySelector("#button-last-page");
  const maxPages = Number($paginator.dataset.maxPages);
  $lastPage.onclick = () => {
    const currentPage = maxPages;
    const currentOffset = ((maxPages - 1) * 15).toString();
    $paginator.dataset.currentOffset = currentOffset;
    callBackFunction(currentOffset);
    generatePageButtons(currentPage);
    buttonHandle();
  };
}

function previousPage(callBackFunction = () => {}) {
  const $buttonPrevious = document.querySelector("#button-previous");
  const $paginator = document.querySelector("#paginator");
  const $pageButtons = document.querySelectorAll(".page-button");

  $buttonPrevious.onclick = () => {
    if (
      $paginator.dataset.currentOffset !== "0" ||
      ($pageButtons[0].dataset.page !== "1" &&
        !$pageButtons[0].classList.contains("current-page"))
    ) {
      updatePreviousPage(callBackFunction);
    }
  };
}

function updatePageOnClick(callBackFunction = () => {}) {
  const pokemonPerPage = 15;
  const $pageButtons = document.querySelectorAll(".page-button");
  const $paginator = document.querySelector("#paginator");
  $pageButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const newOffset =
        Number(e.target.textContent) * pokemonPerPage - pokemonPerPage;
      const currentPage = document.querySelector(".current-page");
      currentPage.classList.remove("current-page");
      e.target.classList.add("current-page");
      $paginator.dataset.currentOffset = newOffset;
      callBackFunction(newOffset);
      buttonHandle();
    })
  );
}

function generateNextPageButtons(currentPage) {
  const $pageButtons = document.querySelectorAll(".page-button");
  const newCurrentPage = Number(currentPage.id.split("button-")[1]) + 1;
  const page = Number(currentPage.dataset.page) + 1;
  if ($pageButtons[4].classList.contains("current-page")) {
    $pageButtons[4].classList.remove("current-page");

    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = page + i;
      $pageButtons[i].textContent = page + i;
    }
    $pageButtons[0].classList.add("current-page");
  } else {
    const $currentPage = document.querySelector(".current-page");

    $currentPage.classList.remove("current-page");

    const $newCurrentPage = document.querySelector(
      `#page-button-${newCurrentPage}`
    );
    $newCurrentPage.classList.add("current-page");
  }
}

export function updateNextPage(callBackFunction = () => {}) {
  const pokemonPerPage = 15;
  const $paginator = document.querySelector("#paginator");
  const currentPage = document.querySelector(".current-page");
  const currentOffset = Number($paginator.dataset.currentOffset);
  const nextOffset = (currentOffset + pokemonPerPage).toString();
  $paginator.dataset.currentOffset = nextOffset;

  const firstPokemon = 0;
  callBackFunction(nextOffset, firstPokemon);
  generateNextPageButtons(currentPage);
  buttonHandle();
}

function nextPage(callBackFunction = () => {}) {
  const $buttonNext = document.querySelector("#button-next");

  $buttonNext.onclick = () => {
    updateNextPage(callBackFunction);
  };
}

export function handlePages(callBackFunction = () => {}) {
  buttonHandle();
  firstPage(callBackFunction);
  lastPage(callBackFunction);
  nextPage(callBackFunction);
  previousPage(callBackFunction);
  updatePageOnClick(callBackFunction);
}

function getPreviousPokemon(
  updatePokemon = () => {},
  updatePokemonList = () => {}
) {
  const $buttonPreviousPokemon = document.querySelector("#previous-pokemon");
  $buttonPreviousPokemon.onclick = async () => {
    const $currentPokemonList = document.querySelectorAll(
      "#pokemon-list button"
    );
    const totalPokemonButtons = $currentPokemonList.length;
    const $currentPage = document.querySelector(".current-page");

    if (
      $currentPokemonList[0].classList.contains("current-pokemon") &&
      $currentPage.textContent === "1"
    ) {
      return;
    }

    if ($currentPokemonList[0].classList.contains("current-pokemon")) {
      $currentPokemonList[0].classList.remove("current-pokemon");
      updatePreviousPage(updatePokemonList);
      return;
    }

    for (let i = 0; i < totalPokemonButtons; i += 1) {
      let previousPokemon;

      if ($currentPokemonList[i].classList.contains("current-pokemon")) {
        $currentPokemonList[i].classList.remove("current-pokemon");
        previousPokemon = $currentPokemonList[i - 1];
        previousPokemon.classList.add("current-pokemon");
        const [pokemonName] = previousPokemon.dataset.pokemon.split("-entry-");
        updatePokemon(pokemonName);
        return;
      }
    }
  };
}

async function getNextPokemon(
  updatePokemon = () => {},
  updatePokemonList = () => {}
) {
  const $buttonNextPokemon = document.querySelector("#next-pokemon");
  $buttonNextPokemon.onclick = () => {
    const $currentPokemonList = document.querySelectorAll(
      "#pokemon-list button"
    );
    const totalPokemonButtons = $currentPokemonList.length;
    const currentPage = document.querySelector(".current-page");
    const $paginator = document.querySelector("#paginator");
    const { currentOffset, totalPokemon, maxPages } = $paginator.dataset;

    if (
      currentOffset === totalPokemon ||
      currentPage.textContent === maxPages
    ) {
      return;
    }

    const $currentPokemon = document.querySelector(".current-pokemon");

    if (!$currentPokemon) {
      $currentPokemonList[0].classList.add("current-pokemon");
      updatePokemon($currentPokemonList[0].dataset.pokemon.split("-entry-")[0]);
      return;
    }

    if (
      $currentPokemonList[totalPokemonButtons - 1].classList.contains(
        "current-pokemon"
      )
    ) {
      $currentPokemonList[totalPokemonButtons - 1].classList.remove(
        "current-pokemon"
      );
      updateNextPage(updatePokemonList);
      return;
    }

    for (let i = 0; i < totalPokemonButtons; i += 1) {
      if ($currentPokemonList[i].classList.contains("current-pokemon")) {
        $currentPokemonList[i].classList.remove("current-pokemon");
        const nextPokemon = $currentPokemonList[i + 1];
        nextPokemon.classList.add("current-pokemon");
        const pokemonName = nextPokemon.dataset.pokemon.split("-entry-")[0];
        updatePokemon(pokemonName);
        return;
      }
    }
  };
}

export function handlePokemonCycle(updatePokemon, updatePokemonList) {
  getPreviousPokemon(updatePokemon, updatePokemonList);
  getNextPokemon(updatePokemon, updatePokemonList);
}
