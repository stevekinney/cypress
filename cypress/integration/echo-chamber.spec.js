/// <reference types="cypress" />

describe('Initial Page', () => {
	beforeEach(() => {
		cy.visit('/echo-chamber');
	});

	it('should have the title of the application in the header', () => {
		cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
	});

	it('should have the title of the application in the window', () => {
		cy.title().should('contain', 'Echo Chamber');
	});

	it('should have a "Sign In" button', () => {
		cy.get('[data-test="sign-in"]');
	});

	it('should have a "Sign Up" button', () => {
		cy.get('[data-test="sign-up"]');
	});

	it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
		cy.get('[data-test="sign-in"]').click();
		cy.location('pathname').should('contain', 'sign-in');
	});

	it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
		cy.get('[data-test="sign-up"]').click();
		cy.location('pathname').should('contain', 'sign-up');
	});
});

describe.only('Sign Up', () => {
	beforeEach(() => {
		cy.visit('/echo-chamber/sign-up');
	});

	it('should require an email', () => {
		cy.get('[data-test="sign-up-submit"]').click();
		cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);

		cy.get('[data-test="sign-up-email"]:invalid')
			.invoke('prop', 'validationMessage')
			.should('contain', 'Please fill out this field');

		cy.get('[data-test="sign-up-email"]:invalid')
			.invoke('prop', 'validity')
			.its('valueMissing')
			.should('be.true');
	});

	it('should require that the email actually be an email address', () => {
		cy.get('[data-test="sign-up-email"]').type('notanemail');

		cy.get('[data-test="sign-up-submit"]').click();
		cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);

		cy.get('[data-test="sign-up-email"]')
			.invoke('prop', 'validationMessage')
			.should('contain', "Please include an '@' in the email address.");

		cy.get('[data-test="sign-up-email"]:invalid')
			.invoke('prop', 'validity')
			.its('typeMismatch')
			.should('be.true');
	});

	it('should require a password when the email is present', () => {
		cy.get('[data-test="sign-up-form"]').as('signUpForm');
		cy.get('[data-test="sign-up-email"]').type('valid@email.com{enter}');

		cy.get('[data-test="sign-up-password"]:invalid').should('have.length', 1);

		cy.get('[data-test="sign-up-password"]:invalid')
			.invoke('prop', 'validity')
			.its('valueMissing')
			.should('be.true');
	});

	it.only('should require that password be at least 4 characters in lengther', () => {
		cy.get('[data-test="sign-up-email"]').type('valid@email.com');
		cy.get('[data-test="sign-up-password"]').type('lol');
		cy.get('[data-test="sign-up-submit"]').click();

		cy.get('[data-test="sign-up-password"]:invalid').should('have.length', 1);

		cy.get('[data-test="sign-up-password"]')
			.invoke('prop', 'validity')
			.its('tooShort')
			.should('be.true');
	});
});
