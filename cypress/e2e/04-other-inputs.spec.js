/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it('should set the range and verify it', () => {});

  it('should check the checkbox and verify it', () => {});

  it('should select an option from the select and verify it', () => {});
});
