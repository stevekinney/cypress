/// <reference types="cypress" />

describe('Aliases', () => {
	beforeEach(() => {
		cy.visit('/jetsetter');
		cy.get('[data-test="items-unpacked"]').as('unpackedItems');
		cy.get('[data-test="items-packed"]').as('packedItems');
	});

	it('should hold onto an alias', () => {
		cy.get('@unpackedItems').find('label').first().as('firstItem');
		cy.get('@firstItem').invoke('text').as('text');
		cy.get('@firstItem').find('input[type="checkbox"]').click();

		cy.get('@text').then((text) => {
			cy.get('@packedItems').find('label').first().should('include.text', text);
		});
	});
});
