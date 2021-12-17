/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]');
    cy.get('[data-test="select-result"]');
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]');
    cy.get('[data-test="checkbox-result"]').contains('(None)');
    cy.get('[data-test="checkbox-result"]');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]');
    cy.get('[data-test="radio-result"]');
  });

  it('should find and control a color input', () => {
    cy.get('[data-test="color-input"]');
    cy.get('[data-test="color-result"]');
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]');
    cy.get('[data-test="date-result"]');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]');
    cy.get('[data-test="range-result"]');
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
