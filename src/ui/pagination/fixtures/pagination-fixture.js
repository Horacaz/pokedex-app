export default `<!DOCTYPE html>
<html lang="en">
<script type="text/javascript" src="chrome-extension://obdogdlfjonfofjbdehikfegiegknkbp/webpack_common.js"></script><script type="text/javascript" src="chrome-extension://obdogdlfjonfofjbdehikfegiegknkbp/webpack_content.js"></script><head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="pokemon.css">
<link rel="stylesheet" href="styles.css">

<title>PokeApp - Horacio Cazavant</title>
</head>
<body class="min-h-100vh min-w-100vw bg-dark p-2">
<div class="container d-flex align-items-center justify-content-center bg-dark">
    <div id="main-container" class="row p-1">
         <div id="paginator" data-current-offset="0" data-total-pokemon="1279" data-max-pages="86" class="col-lg-4 column p-2">
            <div class="row mx-2 h-100">
                <div id="pokemon-list" class="d-flex btn btn-group-vertical"><button type="button" class="btn btn-dark fw-bolder current-pokemon" data-pokemon="bulbasaur-entry-0">Bulbasaur</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="ivysaur-entry-1">Ivysaur</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="venusaur-entry-2">Venusaur</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="charmander-entry-3">Charmander</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="charmeleon-entry-4">Charmeleon</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="charizard-entry-5">Charizard</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="squirtle-entry-6">Squirtle</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="wartortle-entry-7">Wartortle</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="blastoise-entry-8">Blastoise</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="caterpie-entry-9">Caterpie</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="metapod-entry-10">Metapod</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="butterfree-entry-11">Butterfree</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="weedle-entry-12">Weedle</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="kakuna-entry-13">Kakuna</button><button type="button" class="btn btn-dark fw-bolder" data-pokemon="beedrill-entry-14">Beedrill</button></div>
                <div id="page-buttons" class="d-flex flex-shrink justify-content-center btn btn-group"> 
                    <button id="button-first-page" type="button" class="btn btn-dark disabled"><<<>>></button>
                    <button id="button-previous" type="button" class="btn btn-dark disabled"><></button>
                    <button id="page-button-1" data-page="1" type="button" class="page-button current-page btn btn-dark">1</button>
                    <button id="page-button-2" data-page="2" type="button" class="page-button btn btn-dark">2</button>
                    <button id="page-button-3" data-page="3" type="button" class="page-button btn btn-dark">3</button>
                    <button id="page-button-4" data-page="4" type="button" class="page-button btn btn-dark">4</button>
                    <button id="page-button-5" data-page="5" type="button" class="page-button btn btn-dark">5</button>
                    <button id="button-next" type="button" class="btn btn-dark">></button>
                    <button id="button-last-page" type="button" class="btn btn-dark">>>></button>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-center col-lg column p-2">
            <div id="pokemon-page" class="row h-100 w-100">
                <form action="" id="pokemon-search" class="col-md mx-3 d-flex flex-fill justify-content align-items-center bg-dark rounded text-center">
                    <label for="search-bar-pokemon" class="form-label"></label>
                    <input id="search-bar-pokemon" type="text" class="mx-2 form-control bg-dark text-white" placeholder="Search Pokemon by name or entry number">
                    <button id="search-pokemon-button" type="submit" class="mx-2 btn btn-outline-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                    </button>
                </form>
                <div class="d-flex col-md-5 row row-cols-1 mx-2 p-2 text-white">
                    <div class="bg-dark rounded">
                        <div class="d-flex flex-column align-items-center ">
                        <img id="pokemon-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" class="img-fluid">
                        <svg class="d-none p-2 mx-2" id="question-mark" xmlns="http://www.w3.org/2000/svg" width="280" height="280" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                          </svg> 
                        </div>
                        <p id="pokemon-subtitle" class="h5 text-center text-muted">Entry N°1</p>  
                        <div class="d-flex justify-content-between align-items-center align-content-center">
                            <button id="previous-pokemon" type="button" class="btn btn-outline-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                                </svg>
                            </button>
                            <p id="pokemon-title" class="mb-2 p-2 bg-dark text-white lead fs-3 fw-bolder text-center">Bulbasaur</p>
                            <button id="next-pokemon" type="button" class="btn btn-outline-light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                                </svg>
                            </button>
                        </div>             
                    </div>
                    <div class="d-flex justify-content-center align-items-center h4 bg-dark my-3 p-2 text-white lead fs-3 fw-bolder text-center rounded ">Type</div>
                    <div class="d-flex justify-content-center align-items-center mt-1 bg-dark rounded">
                        <div id="pokemon-types" class="flex-fill btn btn-group-vertical my-2"><button type="button" class="type grass btn btn-dark fs-5 fw-bolder">Grass</button><button type="button" class="type poison btn btn-dark fs-5 fw-bolder">Poison</button></div>
                    </div>
                </div>
                
                <div class="col-md row row-cols-1 mx-2 p-2">
                    <div class="h5 bg-dark p-2 text-white lead fs-3 fw-bolder text-center rounded">Information</div>
                    <div class="col mb-2 bg-dark text-white rounded">
                        <div class="col row row-cols-2">
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Name</p>
                                <p id="pokemon-name" class="lead fw-bolder">Bulbasaur</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Ability</p>
                                <p id="pokemon-ability" class="lead fw-bolder">Overgrow</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Height</p>
                                <p id="pokemon-height" class="lead fw-bolder">0.7 m</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Weight</p>
                                <p id="pokemon-weight" class="lead fw-bolder">6.9 kg</p>
                            </div>
                        </div>
                        
                    </div>
                    <div class="h4 bg-dark p-2 text-white lead fs-3 fw-bolder text-center rounded">Statistics</div>
                    <div class="col mt-2 bg-dark text-white rounded">
                        <div class="col m-1 p-2 row row-cols-2 g-2">
                            <div class="col bg-dark">
                                <p class="h5 text-muted">HP</p>
                                <p id="pokemon-hp" class="statistic lead fw-bolder">45</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Attack</p>
                                <p id="pokemon-attack" class="statistic lead fw-bolder">49</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Defense</p>
                                <p id="pokemon-defense" class="statistic lead fw-bolder">49</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Sp. Attack</p>
                                <p id="pokemon-special-attack" class="statistic lead fw-bolder">65</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Sp. Defense</p>
                                <p id="pokemon-special-defense" class="statistic lead fw-bolder">65</p>
                            </div>
                            <div class="col bg-dark">
                                <p class="h5 text-muted">Speed</p>
                                <p id="pokemon-speed" class="statistic lead fw-bolder">45</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./src/index.js" type="module"></script>

</body></html>`;
