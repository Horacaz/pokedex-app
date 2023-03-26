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
    cy.visit("http://192.168.0.17:8080/");
  });
  it("should show pokemon list", () => {
    cy.get("#pokemon-list button").should("have.length", MAX_POKEMON_PER_PAGE);
    cy.get(".current-page").should("have.text", "1");
    cy.get(".current-pokemon").should("have.text", "Bulbasaur");
  });
  it("current selected pokemon should be displayed", () => {});
});
