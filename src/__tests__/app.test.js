
import * as services from "../services/load-pokemon.js";
import * as pagination from "../ui/pagination/pagination.js";
import * as pageButtons from "../ui/pagination/page-buttons.js";
import createPokemonPage from "../ui/pokemon-page.js";
import handleSearch from "../utilities/search-pokemon.js";
import initApp from "../app";
jest.mock('../services/load-pokemon.js')
jest.mock('../ui/pagination/pagination.js')
jest.mock('../ui/pagination/page-buttons.js')
jest.mock('../ui/pokemon-page.js')
jest.mock('../utilities/search-pokemon.js')
describe('initApp', () =>{
  test('App initializes correctly', async() => {
    await initApp();
    expect(services.fetchPokemon).toHaveBeenCalledTimes(1);
    expect(pagination.printPokemonList).toHaveBeenCalledTimes(1);
    expect(pagination.setCurrentPokemon).toHaveBeenCalledTimes(1);
    expect(createPokemonPage).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(pageButtons.handlePages).toHaveBeenCalledTimes(1);
    expect(pageButtons.handlePokemonCycle).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  })
})