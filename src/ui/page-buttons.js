const $paginator = document.querySelector("#paginator");
const $pageButtons = document.querySelectorAll(".page-button");

function nextPage(callBackFunction = () => {}){
  const $buttonNext = document.querySelector("#button-next");

  $buttonNext.onclick = async () => {
    const currentOffset = Number($paginator.dataset.currentOffset);
    let currentPage = (Math.ceil(currentOffset / 15) + 1);
      $paginator.dataset.currentOffset = (currentOffset + 15 ).toString();
      callBackFunction();
      updateNextPageButton(currentPage);


  }
}

function previousPage(callBackFunction = () => {}){
  const $buttonPrevious = document.querySelector("#button-previous");

  
  $buttonPrevious.onclick = async () => {
    const currentOffset = Number($paginator.dataset.currentOffset);
    let currentPage = Math.ceil(currentOffset / 15);

    if(currentPage === 1){
      return
    } else {

      $paginator.dataset.currentOffset = (currentOffset - 15).toString();

      callBackFunction();
      updatePreviousPageButton(currentPage);
  
      }
  }

}

function updateNextPageButton(newCurrentPage){
  if ($pageButtons[4].classList.contains("current-page")){
    $pageButtons[4].classList.remove("current-page");

    for(let i = 0 ; i < $pageButtons.length; i++){
      $pageButtons[i].id = `page-button-${newCurrentPage + i}`
      $pageButtons[i].textContent = (newCurrentPage + i);
    }
    $pageButtons[0].classList.add("current-page");
  }

  else{
  const $currentPage = document.querySelector(".current-page");

  $currentPage.classList.remove("current-page");

  const $newCurrentPage = document.querySelector(`#page-button-${newCurrentPage}`);
  $newCurrentPage.classList.add("current-page");
  }
}

function updatePreviousPageButton(newCurrentPage){
  const $currentPage = document.querySelector(".current-page");
  if ($pageButtons[0].id === "page-button-1" && $pageButtons[0].classList.contains("current-page")){
    return
  } 
 
  else if ($pageButtons[0].classList.contains("current-page")){
      $pageButtons[0].classList.remove("current-page");
  
      for(let i = 0 ; i < $pageButtons.length; i++){
        $pageButtons[i].id = `page-button-${(newCurrentPage - 5 + i)}`;
        $pageButtons[i].textContent = (newCurrentPage - 5 + i);
      }
      const $newCurrentPage = document.querySelector(`#page-button-${newCurrentPage - 1}`);
      $newCurrentPage.classList.add("current-page");
      
    } else{
      $currentPage.classList.remove("current-page");
      const $newCurrentPage = document.querySelector(`#page-button-${newCurrentPage - 1}`);
      $newCurrentPage.classList.add("current-page");
    }
}


function updatePageOnClick(callBackFunction){
  const $pageButtons = document.querySelectorAll(".page-button")
  $pageButtons.forEach( (boton) => 
  boton.addEventListener('click', (event) => {
    $paginator.dataset.currentOffset = ((Number(event.target.textContent) * 15 ) - 15 + 1).toString();
    const currentPage = document.querySelector(".current-page");
    currentPage.classList.remove("current-page")


    event.target.classList.add("current-page")
    callBackFunction();}))
}

function firstPage(callBackFunction = () => {}){
  const $firstPage = document.querySelector("#button-first-page") 

    $firstPage.onclick = () => {
      const currentPage = 1 ;
      $paginator.dataset.currentOffset = "1";

      callBackFunction();
      updatePreviousPageButton(currentPage)
    };
}

function lastPage(callBackFunction = () => {}, totalPokemonPages){
  const $lastPage = document.querySelector("#button-last-page") 
    $lastPage.onclick = () => {
      const currentPage = totalPokemonPages ;
      $paginator.dataset.currentOffset = ((totalPokemonPages - 1 ) * 15).toString();


    callBackFunction();
    updateNextPageButton(currentPage)
    };
}

export default function handlePages(callBackFunction = () =>{}, totalPokemon){
  const totalPokemonPages =  Math.ceil(totalPokemon.count / 15)

  nextPage(callBackFunction, totalPokemonPages)
  previousPage(callBackFunction, totalPokemonPages)
  updatePageOnClick(callBackFunction, totalPokemonPages)
}
