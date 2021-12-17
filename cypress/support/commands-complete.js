// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForApp', () => {
  return cy.wrap(
    new Promise((resolve) => {
      cy.window().then((win) => {
        win.addEventListener('sveltekit:start', resolve);
      });
    }),
  );
});

Cypress.Commands.add('getData', (attribute) => {
  return cy.get(`[data-test="${attribute}"]`);
});

Cypress.Commands.add('signIn', (user) => {
  cy.visit('/echo-chamber/sign-in');
  cy.getData('sign-in-email').type(user.email);
  cy.getData('sign-in-password').type(user.password);
  cy.getData('sign-in-submit').click();
});

Cypress.Commands.add('signUp', (user) => {
  cy.visit('/echo-chamber/sign-up');
  cy.getData('sign-up-email').type(user.email);
  cy.getData('sign-up-password').type(user.password);
  cy.getData('sign-up-submit').click();
});
