# A Set of Problems

Echo Chamber is our first application that has some notion of a user that needs to log in before we can test the rest of the application. Using what we know now, we might find ourselves doing something like this:

```js
const user = {
  email: `${Date.now()}@example.com`,
  password: 'password123',
};

describe('Sign Up', () => {
  it('should successfully create a user when entering an email and a password', () => {
    // Sign Up
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').type(user.email);
    cy.get('[data-test="sign-up-password"]').type(user.password);
    cy.get('[data-test="sign-up-submit"]').click();

    // Sign In
    cy.visit('/echo-chamber/sign-in');
    cy.get('[data-test="sign-in-email"]').type(user.email);
    cy.get('[data-test="sign-in-password"]').type(user.password);
    cy.get('[data-test="sign-in-submit"]').click();

    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email);
  });
});
```

There are a few problems here:

- I'm using a hack to generate unique users.
- I'm not cleaning up after the users that I'm generating.
- I have to manually create a user each time by driving the UI.
- The act of manually creating a user is tedious.
