# Cookies and Sessions

We used commands to make logging into the UI much easier, but what if we just cut that out of our tests enitrely?

## Setting the Cookie

Sometimes instead of logging in by hand, it could be easier to just set the cookie yourself.

Cypress gives us the ability to read and write cookies using `cy.getCookie` and `cy.setCookie`.

```js
cy.getCookie('cookie name').then((cookie) => {
  console.log({ cookie });
});
```

Setting the cookie can be done in a similiar fashion.

```js
cy.setCookie('jwt', JSON.stringify({ id: 999, email: 'cypress@example.com' }));
```

You can also pull from a real API in or set our token for us.

```js
cy.request('/echo-chamber/api/users')
  .then((response) => {
    const [user] = response.body.users;
    cy.setCookie('jwt', encodeToken(user)).then(() => user);
  })
  .as('user');
```

## Session

We're not going to spend _too_ much time talking about sessions since it's stil an experimental feature. But, let's head over to [the documentation](https://docs.cypress.io/api/commands/session#Syntax) and discuss it for a moment.
