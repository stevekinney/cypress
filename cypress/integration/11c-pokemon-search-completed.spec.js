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

  it('should call the API when the user types', () => {
    cy.get('@search').type('bulba');
    cy.wait('@api');
  });

  it('should update the query parameter', () => {
    cy.get('@search').type('squir');
    cy.wait('@api');
    cy.location('search').should('equal', '?name=squir');
  });

  it('should call the API with correct query parameter', () => {
    cy.get('@search').type('char');
    cy.wait('@api').then((interception) => {
      expect(interception.request.url).to.contain('name=char');
    });
  });

  it('should pre-populate the search field with the query parameter', () => {
    cy.visit({ url: '/pokemon-search', qs: { name: 'char' } });
    cy.get('@search').should('have.value', 'char');
  });

  it('should render the results to the page', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');

    cy.get('@search').type('lol');

    cy.wait('@stubbed-api');

    cy.get('[data-test="result"]').should('have.length', 3);
  });

  it('should link to the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');

    cy.get('@search').type('lol');
    cy.wait('@stubbed-api');

    cy.get('[data-test="result"] a').each(($el, index) => {
      const { id } = pokemon[index];
      expect($el.attr('href')).to.contain('/pokemon-search/' + id);
    });
  });

  it('should persist the query parameter in the link to a pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');

    cy.get('@search').type('lol');
    cy.wait('@stubbed-api');

    cy.get('[data-test="result"] a').each(($el) => {
      expect($el.attr('href')).to.contain('name=lol');
    });
  });

  it('should bring you to the route for the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.intercept('/pokemon-search/api/1', { fixture: 'bulbasaur.json' }).as('individual-api');

    cy.get('@search').type('bulba');
    cy.wait('@stubbed-api');

    cy.get('[data-test="result"] a').first().click();
    cy.wait('@individual-api');

    cy.location('pathname').should('contain', '/pokemon-search/1');
  });

  it('should immediately fetch a pokémon if a query parameter is provided', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed-api');
    cy.visit({ url: '/pokemon-search', qs: { name: 'bulba' } });

    cy.wait('@stubbed-api').its('response.url').should('contain', '?name=bulba');
  });
});
