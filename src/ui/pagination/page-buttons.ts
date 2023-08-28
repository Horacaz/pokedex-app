type updatePokemonListCB = (currentOffset: string) => Promise<void>;

function buttonHandle() {
  const $pageButtons = document.querySelectorAll(".page-button");
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const { maxPages } = $paginator.dataset;
  const $buttonPrevious = document.querySelector(
    "#button-previous"
  ) as HTMLButtonElement;
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;
  const $firstPageButton = document.querySelector(
    "#button-first-page"
  ) as HTMLButtonElement;
  const $lastPageButton = document.querySelector(
    "#button-last-page"
  ) as HTMLButtonElement;
  const $currentPage = document.querySelector(
    ".current-page"
  ) as HTMLDivElement;

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

function generatePageButtons(currentPage: number) {
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $currentPage = document.querySelector(
    ".current-page"
  ) as HTMLButtonElement;
  $currentPage.classList.remove("current-page");

  if (currentPage === 1) {
    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = (currentPage + i).toString();
      $pageButtons[i].textContent = (currentPage + i).toString();
    }
    $pageButtons[0].classList.add("current-page");
  } else {
    for (let i = 1; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = (currentPage + i).toString();
      $pageButtons[i].textContent = (currentPage + i).toString();
    }
    $pageButtons[0].classList.add("current-page");
    $pageButtons[0].dataset.page = currentPage.toString();
    $pageButtons[0].textContent = currentPage.toString();
  }
}

function generatePreviousPageButtons(currentPage: HTMLButtonElement) {
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $currentPage = currentPage;
  const page = Number($currentPage.dataset.page);
  const id = Number($currentPage.id.split("button-")[1]);
  if ($pageButtons[0].classList.contains("current-page")) {
    $pageButtons[0].classList.remove("current-page");

    const totalPageButtons = $pageButtons.length;
    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = (page - totalPageButtons + i).toString();
      $pageButtons[i].textContent = (page - totalPageButtons + i).toString();
    }
    const $newCurrentPage = document.querySelector(
      "#page-button-5"
    ) as HTMLButtonElement;
    $newCurrentPage.classList.add("current-page");
  } else {
    $currentPage.classList.remove("current-page");
    const $newCurrentPage = document.querySelector(
      `#page-button-${id - 1}`
    ) as HTMLButtonElement;
    $newCurrentPage.classList.add("current-page");
  }
}

export function updatePreviousPage(
  callBackFunction: (previousOffset: string, lastPokemon: number) => void
) {
  const pokemonPerPage = 15;
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const currentOffset = Number($paginator.dataset.currentOffset);
  const currentPage = document.querySelector(
    ".current-page"
  ) as HTMLButtonElement;
  const lastPokemon = pokemonPerPage - 1;
  const previousOffset = (currentOffset - pokemonPerPage).toString();

  callBackFunction(previousOffset, lastPokemon);
  generatePreviousPageButtons(currentPage);
  buttonHandle();
  $paginator.dataset.currentOffset = previousOffset.toString();
  return;
}

function firstPage(callBackFunction: updatePokemonListCB) {
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const $firstPage = document.querySelector(
    "#button-first-page"
  ) as HTMLButtonElement;

  $firstPage.onclick = () => {
    const currentPage = 1;
    $paginator.dataset.currentOffset = "0";
    const currentOffset = $paginator.dataset.currentOffset;
    callBackFunction(currentOffset);
    generatePageButtons(currentPage);
    buttonHandle();
  };
}

function lastPage(callBackFunction: updatePokemonListCB) {
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const $lastPage = document.querySelector(
    "#button-last-page"
  ) as HTMLButtonElement;
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

function previousPage(callBackFunction: updatePokemonListCB) {
  const $buttonPrevious = document.querySelector(
    "#button-previous"
  ) as HTMLButtonElement;
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;

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

function updatePageOnClick(callBackFunction: updatePokemonListCB) {
  const pokemonPerPage = 15;
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  $pageButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const clickedButton = e.target as HTMLButtonElement;
      const currentPage = Number(clickedButton.textContent);
      const newOffset = (
        currentPage * pokemonPerPage -
        pokemonPerPage
      ).toString();
      const $currentPage = document.querySelector(
        ".current-page"
      ) as HTMLButtonElement;
      $currentPage.classList.remove("current-page");
      clickedButton.classList.add("current-page");
      $paginator.dataset.currentOffset = newOffset;
      callBackFunction(newOffset);
      buttonHandle();
    })
  );
}

function generateNextPageButtons(currentPage: HTMLButtonElement) {
  const $pageButtons = document.querySelectorAll(
    ".page-button"
  ) as NodeListOf<HTMLButtonElement>;
  const newCurrentPage = Number(currentPage.id.split("button-")[1]) + 1;
  const page = Number(currentPage.dataset.page) + 1;
  if ($pageButtons[4].classList.contains("current-page")) {
    $pageButtons[4].classList.remove("current-page");

    for (let i = 0; i < $pageButtons.length; i += 1) {
      $pageButtons[i].dataset.page = (page + i).toString();
      $pageButtons[i].textContent = (page + i).toString();
    }
    $pageButtons[0].classList.add("current-page");
  } else {
    const $currentPage = document.querySelector(
      ".current-page"
    ) as HTMLButtonElement;

    $currentPage.classList.remove("current-page");

    const $newCurrentPage = document.querySelector(
      `#page-button-${newCurrentPage}`
    ) as HTMLButtonElement;
    $newCurrentPage.classList.add("current-page");
  }
}

export function updateNextPage(
  callBackFunction: (offSet: string, newCurrentPokemon: number) => Promise<void>
) {
  const pokemonPerPage = 15;
  const $paginator = document.querySelector("#paginator") as HTMLDivElement;
  const currentPage = document.querySelector(
    ".current-page"
  ) as HTMLButtonElement;
  const currentOffset = Number($paginator.dataset.currentOffset);
  const nextOffset = (currentOffset + pokemonPerPage).toString();
  $paginator.dataset.currentOffset = nextOffset;

  const firstPokemon = 0;
  callBackFunction(nextOffset, firstPokemon);
  generateNextPageButtons(currentPage);
  buttonHandle();
}

function nextPage(callBackFunction: updatePokemonListCB) {
  const $buttonNext = document.querySelector(
    "#button-next"
  ) as HTMLButtonElement;

  $buttonNext.onclick = () => {
    updateNextPage(callBackFunction);
  };
}

export function handlePages(updatePokemonList: updatePokemonListCB) {
  buttonHandle();
  firstPage(updatePokemonList);
  lastPage(updatePokemonList);
  nextPage(updatePokemonList);
  previousPage(updatePokemonList);
  updatePageOnClick(updatePokemonList);
}

function getPreviousPokemon(
  updatePokemon: (pokemon: string) => Promise<void>,
  updatePokemonList: (
    offSet: string,
    newCurrentPokemon: number
  ) => Promise<void>
) {
  const $buttonPreviousPokemon = document.querySelector(
    "#previous-pokemon"
  ) as HTMLButtonElement;
  $buttonPreviousPokemon.onclick = async () => {
    const $currentPokemonList = document.querySelectorAll(
      "#pokemon-list button"
    ) as NodeListOf<HTMLButtonElement>;
    const totalPokemonButtons = $currentPokemonList.length;
    const $currentPage = document.querySelector(
      ".current-page"
    ) as HTMLButtonElement;

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
      if ($currentPokemonList[i].classList.contains("current-pokemon")) {
        $currentPokemonList[i].classList.remove("current-pokemon");
        const previousPokemon = $currentPokemonList[i - 1];
        previousPokemon.classList.add("current-pokemon");
        const pokemonNameDataset = previousPokemon.dataset.pokemon?.split(
          "-entry-"
        )[0] as string;
        updatePokemon(pokemonNameDataset);
        return;
      }
    }
  };
}

async function getNextPokemon(
  updatePokemon: (pokemon: string) => Promise<void>,
  updatePokemonList: (
    offSet: string,
    newCurrentPokemon: number
  ) => Promise<void>
) {
  const $buttonNextPokemon = document.querySelector(
    "#next-pokemon"
  ) as HTMLButtonElement;
  $buttonNextPokemon.onclick = () => {
    const $currentPokemonList = document.querySelectorAll(
      "#pokemon-list button"
    ) as NodeListOf<HTMLButtonElement>;
    const totalPokemonButtons = $currentPokemonList.length;
    const currentPage = document.querySelector(
      ".current-page"
    ) as HTMLButtonElement;
    const $paginator = document.querySelector("#paginator") as HTMLDivElement;
    const { currentOffset, totalPokemon, maxPages } = $paginator.dataset;

    if (
      currentOffset === totalPokemon ||
      currentPage.textContent === maxPages
    ) {
      return;
    }

    const $currentPokemon = document.querySelector(
      ".current-pokemon"
    ) as HTMLButtonElement;

    if (!$currentPokemon) {
      $currentPokemonList[0].classList.add("current-pokemon");
      const currentPokemonDataset =
        $currentPokemonList[0].dataset.pokemon?.split("-entry-")[0] as string;
      updatePokemon(currentPokemonDataset);
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
        const pokemonName = nextPokemon.dataset.pokemon?.split(
          "-entry-"
        )[0] as string;
        updatePokemon(pokemonName);
        return;
      }
    }
  };
}

export function handlePokemonCycle(
  updatePokemon: (pokemon: string) => Promise<void>,
  updatePokemonList: updatePokemonListCB
) {
  getPreviousPokemon(updatePokemon, updatePokemonList);
  getNextPokemon(updatePokemon, updatePokemonList);
}
