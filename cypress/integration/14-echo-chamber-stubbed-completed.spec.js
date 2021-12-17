/// <reference types="cypress" />

import '../support/commands-complete';

export const decodeToken = (token) => JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
export const encodeToken = (token) => Buffer.from(JSON.stringify(token)).toString('base64');

describe('Signing in with a seeded database', () => {
	beforeEach(() => {
		cy.setCookie('jwt', encodeToken({ id: 1, email: 'first@example.com' }));

		cy.intercept('GET', '/echo-chamber/api', { fixture: 'posts' }).as('postsApi');
		cy.intercept('GET', '/echo-chamber/api/users', { fixture: 'users' }).as('usersApi');
		cy.intercept('GET', /\/echo-chamber\/api\/\d+/, { fixture: 'post' }).as('postApi');

		cy.visit('/echo-chamber/posts');

		cy.fixture('posts').then(({ posts }) => cy.wrap(posts[0]).as('firstPost'));
	});

	it('should render the posts', () => {});

	it('should navigate to the URL of the post that you clicked on', () => {});

	it('should send a POST request when submitting the form', () => {});

	it('should show an edit field when you click on the edit button', () => {});

	it('should send a PUT request when you send your edit');

	it('should send a DELETE request when click on the delete button');
});
