# Form Validation

Whether you're using native form validation or you've got your own bespoke logic, form validation is a common place where you might want to implement some tests.

For our purposes, we're going to be using the browser's built-in form validation.

We're going to be working with a _slightly_ more sophisticated application called Echo Chamber this time. It has a basic form for logging in and whatnot.

Let's look at `cypress/integration/07-echo-chamber.spec.js`.

There are a bunch of ways we could go about doing this.

### Check the number of errors

```js
it('should require an email', () => {
  cy.get('@submit').click();
  cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);
});
```

### Check the validation message

```js
it('should require an email', () => {
  cy.get('@submit').click();
  cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);

  cy.get('[data-test="sign-up-email"]:invalid')
    .invoke('prop', 'validationMessage')
    .should('contain', 'Please fill out this field');
});
```

### Check the validation object

```js
it('should require an email', () => {
  cy.get('@submit').click();
  cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);

  cy.get('[data-test="sign-up-email"]:invalid')
    .invoke('prop', 'validationMessage')
    .should('contain', 'Please fill out this field');

  cy.get('[data-test="sign-up-email"]:invalid')
    .invoke('prop', 'validity')
    .its('valueMissing')
    .should('be.true');
});
```

## Exercise

In `cypress/integration/08-form-validation.spec.js`, can you implement the following:

- Check to make sure that the form validates that the email address is in fact an email address.
- Check to make sure that the password field has something in it.

We'll review this in `cypress/integration/08c-form-validation-completed.spec.js`.
