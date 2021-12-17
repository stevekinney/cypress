# Current Title and Location

URLs are a fundamental part of how the web works, so it stands to reason that we might want to validate that navigating through our application is a thing that we might want to do.

We know that `cy.visit` will bring Cypress to a given URL, but what we start clicking around and want to verify that the URL is what we expect?

Cypress provides `cy.location()`, which is an abstraction around `window.location` and we can use this to make assertions on the URL.

We also know that HTML supports at `<title>` tag for setting the window or tab's title, but we also know that isn't necessarily displayed on the page anywhere. Again, Cypress has a way for us to check the document's title (or `document.title`) with `cy.title()`.

Let's verify the title first and then we'll click around for a bit.

```js
it('should have the title of the application in the window', () => {
  cy.title().should('contain', 'Echo Chamber');
});
```

We'll explore this one a bit more later.

Let's try out a new application called "Echo Chamber" and verify that as we click around the application, we are where we think we ought to be.

```js
it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
  cy.get('[data-test="sign-in"]').click();
  cy.location('pathname').should('contain', 'sign-in');
});
```

Using `cy.location()`, you can query for anything that you can get using `window.location`. This includes:

- `hash`
- `host`
- `hostname`
- `href`
- `origin`
- `pathname`
- `port`
- `protocol`
- `search`
- `toString`

([Reference](https://docs.cypress.io/api/commands/location#Yields).)
