/// <reference types= "cypress"/>
describe("Pokedex App", () => {
  const MAX_POKEMON_PER_PAGE = 15;
  beforeEach(() => {
    cy.intercept("https://pokeapi.co/api/v2/pokemon?offset=0&limit=15", {
      fixture: "pokemon-page-1.json",
    });
    cy.intercept("https://pokeapi.co/api/v2/pokemon/bulbasaur", {
      fixture: "bulbasaur.json",
    });
    cy.visit("http://127.0.0.1:8080");
  });
  it("should show pokemon list", () => {
    cy.get("#pokemon-list button").should("have.length", MAX_POKEMON_PER_PAGE);
    cy.get(".current-pokemon").should("have.text", "Bulbasaur");
  });
});
