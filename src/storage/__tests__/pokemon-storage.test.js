/// <reference types="@types/jest" />
import {
retrievePokemonFromLocalStorage, retrievePokemonListFromLocalStorage, savePokemonInLocalStorage, savePokemonListInLocalStorage
} from '../pokemon-storage';

beforeEach(() => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  global.localStorage = localStorageMock;
});

test('SavePokemon should store a pokemon in localStorage', () =>{
  const pokemon = {name: 'pokemon', data: {}}
  savePokemonInLocalStorage(pokemon.name, pokemon.data)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('pokemon', "{}");
});

test('SavePokemonList should store a list of pokemon in localStorage', () =>{
  const pokemonList = [{name: 'pokemon'}];
  const offset = 15;
  savePokemonListInLocalStorage(pokemonList, offset)
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith("pokemon-list-15", "[{\"name\":\"pokemon\"}]");
});

test('Save Pokemon list should throw error', () =>{
  localStorage.setItem = jest.fn(() =>{throw new Error('ERROR')})
  expect(() => savePokemonListInLocalStorage()).toThrowError('ERROR');
  }
);-

test('Save Pokemon name should throw error', () =>{
  localStorage.setItem = jest.fn(() =>{throw new Error('ERROR')})
  expect(() => savePokemonInLocalStorage()).toThrowError('ERROR');
  }
);

test('Retrieve pokemon list should throw if list is null',() =>{
  JSON.parse = jest.fn().mockReturnValue(null);
  expect(() => retrievePokemonListFromLocalStorage()).toThrowError(new Error("No list available"));
})

test('Retrieve pokemon should throw if pokemon is null',() =>{
  JSON.parse = jest.fn().mockReturnValueOnce(null);
  expect(() => retrievePokemonFromLocalStorage('pokemon')).toThrowError(new Error("pokemon is not available on LocalStorage."));
})

test('Retrieve pokemon list should retreive list if available',() =>{
  JSON.parse = jest.fn();

  retrievePokemonListFromLocalStorage('15');
  expect(JSON.parse).toHaveBeenCalledTimes(1);

  expect(localStorage.getItem).toHaveBeenCalledTimes(1);

  expect(localStorage.getItem).toHaveBeenCalledWith("pokemon-list-15");
  })

  test('Retrieve pokemon should retreive a pokemon if available',() =>{
    JSON.parse = jest.fn();
  
    retrievePokemonFromLocalStorage('bulbasaur');
    expect(JSON.parse).toHaveBeenCalledTimes(1);
  
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  
    expect(localStorage.getItem).toHaveBeenCalledWith("bulbasaur");
    })