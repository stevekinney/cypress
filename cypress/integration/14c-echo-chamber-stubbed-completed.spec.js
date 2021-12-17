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

		cy.intercept('POST', '/echo-chamber/api', {
			statusCode: 201,
			body: {
				post: {
					id: 401,
					content: 'Recently created post',
					createdAt: '2021-12-17T13:12:18.418Z',
					authorId: 220
				}
			}
		}).as('createPostApi');

		cy.visit('/echo-chamber/posts');

		cy.getData('post-create-content-input').as('newPostInput');
		cy.getData('post-create-submit').as('newPostSubmit');
		cy.getData('post-preview-list').find('article').as('previews');

		cy.fixture('posts').then(({ posts }) => cy.wrap(posts[0]).as('firstPost'));
	});

	it('should render the posts from the API', () => {
		cy.fixture('posts').then(({ posts }) => {
			cy.get('@previews').should('have.length', posts.length);
		});
	});

	it('should navigate to the URL of the post that you clicked on', () => {
		cy.get('@previews').first().click();
		cy.wait('@postApi').then((interception) => {
			cy.location('pathname').should('contain', `/posts/${interception.response.body.post.id}`);
		});
	});

	it('should send a POST request when submitting the form', () => {
		cy.get('@newPostInput').type('Hello world{enter}');
		cy.wait('@createPostApi').its('request.body').should('contain', 'Hello world');
	});
});
