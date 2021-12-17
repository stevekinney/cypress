# Other Kinds of Inputs

Regular ol' text fields are faily straight forward. You can just type into them. But, there are some more exotic types of inputs on the page.

I'll do a few in `cypress/integration/04-other-inputs.spec.js`.

## Checking a box

```js
it('should check the checkbox and verify it', () => {
  cy.get('input[type="checkbox"]').as('checkbox').check();
  cy.get('@checkbox').should('be.checked');
});
```

## Selecting an option

```js
it('should select an option from the select and verify it', () => {
  cy.get('@restaurant-filter').select('Taco Bell');
  cy.get('@restaurant-filter').should('have.value', 'Taco Bell');
});
```

## Manually setting and triggering a input field

When in doubt, you can set the value using jQuery and then trigger an event to let your code know the value has changed.

```js
it('should set the range and verify it', () => {
  cy.get('@rating-filter').invoke('val', '7').trigger('input');
  cy.get('@rating-filter').should('have.value', '7');
});
```

You can see the completed examples in `cypress/integration/04c-other-inputs-completed.spec.js`.
