/// <reference types="cypress" />

describe('Create a New Item', () => {
    beforeEach(() => {
        cy.visit('/jetsetter');
    })

    it('Get form and check if it exists', () => {
        cy.get('form').should('exist');
    });

    it('Check if page contains "Add item"', () => {
        cy.get('form button').contains('Add Item')
    });

    it('Page loads and error does not exist' , () => {
        cy.get('.error-page').should('not.exist');
    })
});
