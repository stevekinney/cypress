/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {});

    it('should put a new item in the "Unpacked Items" list', () => {});

    it('should put a new item as the last item in the "Unpacked Items" list', () => {});
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {});

    it('should hide items that do not match whatever is in the filter field', () => {});
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {});
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {});

      it('should remove an item from the page', () => {});
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {});

    it('should empty have all of the items in the "Unpacked" list', () => {});
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {});
  });
});
