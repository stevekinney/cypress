/// <reference types="cypress" />

import '../support/commands-complete';

const user = {
  email: 'first@example.com',
  password: 'password123',
};

export const decodeToken = (token) => JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
export const encodeToken = (token) => Buffer.from(JSON.stringify(token)).toString('base64');

describe('Signing in with a seeded database', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
    cy.signIn(user);
  });

  it('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('should set a cookie', () => {});
});

describe('Setting the cookie', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
  });

  it.skip('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('show that user on the page', () => {});
});

describe('Setting the cookie with real data', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.visit('/echo-chamber/sign-in');
  });

  it.skip('should be able to log in', () => {
    cy.location('pathname').should('contain', '/echo-chamber/posts');
  });

  it('show that user on the page', () => {});
});
