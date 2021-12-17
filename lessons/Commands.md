# Commands

Commands allow you to batch common operations in to easy-to-use workflows.

```js
Cypress.Commands.add('signIn', (email, password) => {
  cy.get('[data-test="sign-in-email"]').type(user.email);
  cy.get('[data-test="sign-in-password"]').type(user.password);
  cy.get('[data-test="sign-in-submit"]').click();
});
```

Now, we can do something like this:

```js
cy.signIn({ email: 'steve@example.com', password: 'password' });
```

This will allow you to login via the user interface. So how do we do this?

```js
Cypress.Commands.add('signIn', (user) => {
  cy.visit('/echo-chamber/sign-in');
  cy.get('[data-test="sign-in-email"]').type(user.email);
  cy.get('[data-test="sign-in-password"]').type(user.password);
  cy.get('[data-test="sign-in-submit"]').click();
});
```

Now, we can swap this out in our `beforeEach`:

```js
beforeEach(() => {
  cy.task('seed');
  cy.signIn(user);
});
```

## Exercise: Adding a Command

Can you create a command for singing up and replace it in the tests that we had earlier?

Our command will look like this:

```js
Cypress.Commands.add('signUp', (user) => {
  cy.visit('/echo-chamber/sign-up');
  cy.get('[data-test="sign-in-email"]').type(user.email);
  cy.get('[data-test="sign-in-password"]').type(user.password);
  cy.get('[data-test="sign-in-submit"]').click();
});
```

And then we're able to refactor our tests to be _a lot_ simplier:

```js
describe('Sign Up', () => {
  beforeEach(() => {
    cy.task('reset');
  });

  it('should successfully create a user when entering an email and a password', () => {
    cy.signUp(user);
    cy.signIn(user);

    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email);
  });
});
```

## Extension: Better fetching by data attribute

We've be relying heavily on data attributes for all of the reaons we talked about. That said, they've been a bit cumbersome to use. Could you create a command that just took the attribute and then filled in the rest?

When we're all done it should look something like this:

```js
cy.getData('sign-in-email').type(user.email);
```

Solution:

```js
Cypress.Commands.add('getData', (attribute) => {
  return cy.get(`[data-test="${attribute}"]`);
});
```
