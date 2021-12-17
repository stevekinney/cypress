/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
  });

  it('should require an email', () => {});

  it('should require that the email actually be an email address', () => {});

  it('should require a password when the email is present', () => {});
});
