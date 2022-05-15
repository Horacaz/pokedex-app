function validateSearch(pokemonSearch){
    const regulateInput = /[A-z]$/;

    if (pokemonSearch == false){
        return
    }

    else if(regulateInput.test(pokemonSearch)){
        const pokemonName = pokemonSearch.toLowerCase();
        return pokemonName;

    } else {
        const pokemonEntry = pokemonSearch;
        return pokemonEntry;
    }
}

export default function handleSearch(callBackFunction = () => {}){
    const $searchBar = document.querySelector("#search-bar-pokemon");
    const $searchPokemon =  document.querySelector("#search-pokemon");

    $searchPokemon.onclick = () => 
    {callBackFunction(validateSearch($searchBar.value))}
}

