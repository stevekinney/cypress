# Waiting for SSR

SSR solves a lot of problems for our users, but can be tricky for our tests. Cypress waits until the window fires its `load` event, but when we're using SSR, our JavaScript might show up after our page officially loads.

For example, this test will fail:

```js
describe.only('Ratings Filter with SSR', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
    cy.get('#minimum-rating-visibility').as('rating-filter');
  });

  it('should only show items with a popularity rating of 7 or higher', () => {
      cy.get('@rating-filter').invoke('val', 7).trigger('change');
      cy.get('td[headers="popularity-column"]').each(($el) => {
        expect(+$el.text()).to.be.gte(7);
      });
    });
  });
});
```

Here is an incomplete list of things you shouldn't do:

- Abandon SSR just for the sake of your tests.
- Abandon testing your application.
- Have your Cypress wait an arbitrary amount of time before running your tests just so you can be sure that it's hydrated.

The answer is that we need to wait for whatever event our framework of choice fires before moving forward with our test. In my case, this application _happens_ to be using [SvelteKit](https://kit.svelte.dev), but it doesn't really matter.

```js
describe.only('Ratings Filter with SSR', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
    cy.get('#minimum-rating-visibility').as('rating-filter');
  });

  it('should only show items with a popularity rating of 7 or higher', () => {
    cy.wrap(
      new Promise((resolve) => {
        cy.window().then((win) => {
          win.addEventListener('sveltekit:start', resolve);
        });
      }),
    ).then(() => {
      cy.get('@rating-filter').invoke('val', 7).trigger('change');
      cy.get('td[headers="popularity-column"]').each(($el) => {
        expect(+$el.text()).to.be.gte(7);
      });
    });
  });
});
```

This is a little verbose, can we pull it out into a command?

```js
Cypress.Commands.add('waitForApp', () => {
  return cy.wrap(
    new Promise((resolve) => {
      cy.window().then((win) => {
        win.addEventListener('sveltekit:start', resolve);
      });
    }),
  );
});
```

Then we can do something like this:

```js
it('should only show items with a popularity rating of 7 or higher', () => {
  cy.waitForApp().then(() => {
    cy.get('@rating-filter').invoke('val', 7).trigger('change');
  });
});
```

Even better, I can wait for the app to hydrate before each test.

```js
describe.only('Ratings Filter with SSR', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
    cy.get('#minimum-rating-visibility').as('rating-filter');
    return cy.waitForApp();
  });

  it('should only show items with a popularity rating of 7 or higher', () => {
    cy.get('@rating-filter').invoke('val', 7).trigger('change');
    cy.get('td[headers="popularity-column"]').each(($el) => {
      expect(+$el.text()).to.be.gte(7);
    });
  });
});
```
