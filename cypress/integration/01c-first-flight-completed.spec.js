/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should have a form', () => {
    cy.get('form').should('exist');
  });

  it('should have an "Add Item" button that is disabled', () => {
    cy.get('[data-test="add-item"]').should('be.disabled');
  });

  it('should enable "Add Item" when text is in the input field', () => {
    cy.get('[data-test="new-item-input"]').type('Good Attitude');
    cy.get('[data-test="add-item"]').click();
  });
});
