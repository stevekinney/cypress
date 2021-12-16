/// <reference types="cypress" />

const user = {
	email: 'first@example.com',
	password: 'password123'
};

describe('Signing in with a seeded database', () => {
	beforeEach(() => {
		cy.task('reset');
		cy.visit('/echo-chamber/sign-in');
	});

	it('should be able to log in', () => {
		cy.get('[data-test="sign-in-email"]').type(user.email);
		cy.get('[data-test="sign-in-password"]').type(user.password);
		cy.get('[data-test="sign-in-submit"]').click();

		cy.location('pathname').should('contain', '/echo-chamber/posts');
	});

	it('should set a cookie', () => {
		cy.get('[data-test="sign-in-email"]').type(user.email);
		cy.get('[data-test="sign-in-password"]').type(user.password);
		cy.get('[data-test="sign-in-submit"]').click();

		cy.getCookie('jwt').then((cookie) => {
			const value = JSON.parse(Buffer.from(cookie.value, 'base64').toString('utf-8'));
			expect(value.email).to.equal(user.email);
		});
	});
});
