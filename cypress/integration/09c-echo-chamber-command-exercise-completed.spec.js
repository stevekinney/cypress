/// <reference types="cypress" />

const user = {
	email: 'first@example.com',
	password: 'password123'
};

describe('Sign Up', () => {
	beforeEach(() => {
		cy.task('reset');
	});

	it('should successfully create a user when entering an email and a password', () => {
		cy.signUp(user);
		cy.login(user);

		cy.location('pathname').should('contain', '/echo-chamber/posts');
		cy.contains('Signed in as ' + user.email);
	});
});
