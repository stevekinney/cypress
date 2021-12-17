# Additional Things You Could Do With Commands

## Example: Wrap Session/Local Storage

```js
Cypress.Commands.add('getSessionStorage', (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key));
});

Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});
```

On your own: What would it look like if you refactored some of our previous code?

## Some Things to Think About

- Am I actually using this throughout my tests?

- Could this have been a function?

- Is this just a couple commands and am I over-complicating things with this abstraction?

## Example: Create a User

```js
Cypress.Commands.add('createUser', (user) => {
  cy.request({
    method: 'POST',

    url: 'https://www.example.com/tokens',

    body: {
      email: 'admin_username',

      password: 'admin_password',
    },
  }).then((resp) => {
    cy.request({
      method: 'POST',

      url: 'https://www.example.com/users',

      headers: { Authorization: 'Bearer ' + resp.body.token },

      body: user,
    });
  });
});
```

## Example: Redux

What if we wanted to plug this data into Redux?

```js
Cypress.Commands.add('signIn', (email, password) => {
  return cy.window().then((w) => {
    return win.app.$store.dispatch('signIn', {
      email: 'steve@temporal.io',

      password: 'password',
    });
  });
});
```

The caveat here is that your Redux store needs to attach itself to the `window` object. You might be morally opposed to this.

That said, if you're using something like Redux as the predominate way that you're storing state, then this can become an incredibly powerful tool.

Back to that moral opposition. You have a few options that _may_ appeal to you:

- You could _only_ expose the store as a global object in your test environment. This, of course has the trade-off of slightly different code in your test environment as opposed to the others.

- You could provide functionality where the initial state of your application can be loaded in via a query parameter or through special client-side story key. This would be generally-available, however, and you're basically using obscurity to hide it from your users. That said, there can be some interesting implications for how you could support your users if you had a mechanism for importing and exporting the entire state of your application.

- You could hook into the Redux Dev Tools, because then you've already made one or both of the above compromises anyway—so, you might as well capitalize on it.
