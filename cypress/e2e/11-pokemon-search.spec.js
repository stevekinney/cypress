/// <reference types="cypress" />

const pokemon = [
  { id: 1, name: 'Bumblesaur' },
  { id: 2, name: 'Charmer' },
  { id: 3, name: 'Turtle' },
];

describe('Pokémon Search', () => {
  beforeEach(() => {
    cy.visit('/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');

    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {});

  it('should update the query parameter', () => {});

  it('should call the API with correct query parameter', () => {});

  it('should pre-populate the search field with the query parameter', () => {});

  it('should render the results to the page', () => {});

  it('should link to the correct pokémon', () => {});

  it('should persist the query parameter in the link to a pokémon', () => {});

  it('should bring you to the route for the correct pokémon', () => {});

  it('should immediately fetch a pokémon if a query parameter is provided', () => {});
});
