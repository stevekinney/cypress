/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should appear on the page after clicking on "Add Item"', () => {
      const item = 'Good Attitude';

      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('[data-test="add-item"]').click();

      cy.contains(item);
    });

    it('should appear in the "Unpacked Items" list', () => {
      const item = 'Good Attitude';

      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('form').submit();

      cy.get('[data-test="items-unpacked"]').contains(item);
    });

    it('should appear as the last item in the "Unpacked Items" list', () => {
      const item = 'Good Attitude';

      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('form').submit();

      cy.get('[data-test="items-unpacked"] li').last().contains(item);
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.contains('Tooth Brush');
      cy.contains('Tooth Paste');
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');
      cy.contains('Hoodie').should('not.exist');
    });

    it('should show items that match whatever is in the filter field (better)', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.get('[data-test="items"] li').each(($item) => {
        expect($item.text()).to.include('Tooth');
      });
    });

    it('should show items that match whatever is in the filter field (better, wrap)', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.get('[data-test="items"] li').each(($item) => {
        cy.wrap($item).should('include.text', 'Tooth');
      });
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the elements from the page', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items"] li').should('not.exist');
      });

      it('should remove all of the elements from the page (alternate)', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-packed"]').contains('No items to show.').should('exist');
        cy.get('[data-test="items-unpacked"]').contains('No items to show.').should('exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li').find('[data-test="remove"]');
      });

      it('should have a remove button on each (literally)', () => {
        cy.get('[data-test="items"] li').each((li) => {
          cy.wrap(li).find('[data-test="remove"]').should('exist');
        });
      });

      it('should remove an element from the page', () => {
        cy.contains('Tooth Brush').parent().find('[data-test="remove"]').click();
        cy.contains('Tooth Brush').should('not.exist');
      });

      it('should remove an element from the page (better)', () => {
        cy.get('[data-test="items"] li')
          .first()
          .within(() => cy.get('[data-test="remove"]').click())
          .should('not.exist');
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list (brittle)', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-unpacked"] li').its('length').should('eq', 5);
    });

    it('should empty have all of the items in the "Unpacked" list (better)', () => {
      cy.get('[data-test="items"] li')
        .its('length')
        .then((count) => {
          cy.get('[data-test="mark-all-as-unpacked"]').click();
          cy.get('[data-test="items-unpacked"] li').its('length').should('eq', count);
        });
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed" (brittle)', () => {
      cy.get('[data-test="items-unpacked"]').contains('Tooth Brush').click();
      cy.get('[data-test="items-packed"]').contains('Tooth Brush').should('exist');
    });

    it('should move an individual item from "Unpacked" to "Packed" (better)', () => {
      cy.get('[data-test="items-unpacked"] li label')
        .first()
        .within(() => {
          cy.get('input[type="checkbox"]').click();
        })
        .then(($item) => {
          const text = $item.text();
          cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
        });
    });
  });
});
