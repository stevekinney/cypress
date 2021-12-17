# Other Keystrokes

Clicking the "Add Item" is one way to submit the form, but what if we wanted to type a key that doesn't have a letter?

```js
it('should appear after pressing enter', () => {
  cy.get('[data-test="new-item-input"]').type('Good Attitude{enter}');

  cy.contains(item);
});
```

You can see all of the options [here](https://docs.cypress.io/api/commands/type#Arguments).

While we're at it, you can also submit a form using `.submit()`.

```js
it('should appear after submitting the form', () => {
  const item = 'Good Attitude';

  cy.get('[data-test="new-item-input"]').type(item);
  cy.get('form').submit();

  cy.contains(item);
});
```
