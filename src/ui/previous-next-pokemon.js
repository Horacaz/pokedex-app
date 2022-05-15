const $buttonPreviousPokemon = document.querySelector("#previous-pokemon");
const $buttonNextPokemon =  document.querySelector("#next-pokemon");

const $currentPokemon = document.querySelector("#pokemon-page");



export default function handlePokemonCycle(callBackFunction = () => {}, POKEMON_LIST){
    getPreviousPokemon(callBackFunction,  POKEMON_LIST);
    getNextPokemon(callBackFunction,  POKEMON_LIST);
}

function getPreviousPokemon(callBackFunction = () => {},  POKEMON_LIST){
    $buttonPreviousPokemon.onclick = async () =>{
        const currentPokemon = Number($currentPokemon.dataset.currentPokemon);

        if(currentPokemon === 0){
            return
        }

        const pokemonName = await POKEMON_LIST.results[currentPokemon - 1].name;
        callBackFunction(pokemonName)

        $currentPokemon.dataset.currentPokemon = (currentPokemon - 1).toString();
    }
}

function getNextPokemon(callBackFunction = () => {}, POKEMON_LIST){
    $buttonNextPokemon.onclick = async () =>{
        const currentPokemon = Number($currentPokemon.dataset.currentPokemon);
      
        if(currentPokemon === POKEMON_LIST.length){
            return
        }

   const pokemonName = await POKEMON_LIST.results[currentPokemon + 1].name;
   
        callBackFunction(pokemonName)
        $currentPokemon.dataset.currentPokemon = (currentPokemon + 1).toString();
    }
}
