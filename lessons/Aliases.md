# Aliases

I know we're supposed to use those data attributes instead of class names. I know. But, they're a pain to type.

Also, you can see a world where some of the gymnastics that we were doing with closures and whatnot could be easier if we could hold onto a value for a hot minute.

Aliases allow you to easliy reference _things_ in your tests. You can set an alias for a given DOM node, fixture data, or even a network request.

You might say, "Isn't that what we use variables for in JavaScript?" And while you might be totally correct with the way that you phrased that question, that's not how it works with Cypress's chaning API.

All of niceties that Cypress does for us around waiting and retries means that everything is asynchronous by natrue. If we're using `.then()` then we can store a value in a closure scope for a moment in time, but otherwise—that's not an option for us.

Luckily, Cypress addresses this by giving us aliases for store values.

We can store stuff in a alias using the `.as()` method and we can pull it out using `cy.get()`. The catch, of course, is that we need to make it clear to Cypress that we're looking for a fixture and _not_ a DOM node or whatever.

## Using Aliases

Like Is aid, we can create an alias for pretty much anything using the `.as()` method. This includes selectors.

For example, we create an alias for a selector.

```js
cy.get('[data-test="items-unpacked"]').as('unpackedItems');
cy.get('[data-test="items-packed"]').as('packedItems');
// So on and so forth.
```

To use it, we just need to prefix our selector with an `@` symbol.

Now, we can refactor our last test as follows:

```js
it('should hold onto an alias', () => {
  cy.get('@unpackedItems').find('label').first().as('firstItem');

  cy.get('@firstItem').invoke('text').as('text');
  cy.get('@firstItem').find('input[type="checkbox"]').click();

  cy.get('@text').then((text) => {
    cy.get('@packedItems').find('label').first().should('include.text', text);
  });
});
```

## Exercise

- Make an alias for the filter input.
- Type a search term into that filter.
- Verify that only items match that filter are shown on the page.

We'll review one possible solution in `03c-aliases.spec.js`.
