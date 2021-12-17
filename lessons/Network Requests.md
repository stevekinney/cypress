# Network Requests

Sometimes we rely on systems we don't fully control. A few quick cases come to mind:

- Third-party APIs
- OAuth logic via Google or Auth0 or what have you.
- Internal APIs at our company that are owned and operating by another team.

In these situations, you have a few options: You can use a real server or you can stub out network requests. Keeping a real server in the mix will give you true end-to-end tests. But, there are plenty of cases where you might actually want to simulate a network response:

- You want to test for particular edge cases (e.g. What happens if the server returns a 500? How does your client-side application handle that?)
- Third-party integrations—as mentioned above. These are outside of your control. They're also not your reponsibility. They might not be free to use or have some unintended side effects.

Using real requests sounds all great and wonderful, but they have some downsides too.

- You've got to seed a database and get your server into the exact state that you need it before every test as well as do the subsequent clean-up. Depending on your team and just the realities of the project you're working on, this might not even be an option.
- They're slower because they're real. Having a fast test suite is important.

```js
cy.intercept(
  {
    method: 'GET',
    url: '/users/*',
  },
  [{ username: 'Jimi', id: 1 }],
).as('getUsers');
```

You can also use a **fixture**. Fixtures are effectly dummy data that Cypress will use on your behalf.

```js
cy.intercept('GET', '/activities/*', { fixture: 'activities.json' });
```

## `cy.intercept()`

`cy.intercept()` allows Cypress to catch network requests to a particular API. You can just listen for requests, or you can step in and replace the response.

If you only want to spy on the requests:

```js
cy.intercept(url);
cy.intercept(method, url);
cy.intercept(routeMatcher);
```

If you want to stub out a response:

```js
cy.intercept(url, staticResponse);
cy.intercept(method, url, staticResponse);
cy.intercept(routeMatcher, staticResponse);
cy.intercept(url, routeMatcher, staticResponse);
```

If you want to actually work with the request and do stuff.

```js
cy.intercept(url, routeHandler);
cy.intercept(method, url, routeHandler);
cy.intercept(routeMatcher, routeHandler);
cy.intercept(url, routeMatcher, routeHandler);
```

### `routeMatcher`

[`routeMatcher`](https://docs.cypress.io/api/commands/intercept#routeMatcher-RouteMatcher) is an object of optional keys that give you fine-grained control over the requests that you want to intercept. You can do stuff like match against headers and whatnot.

### `staticResponse`

[`staticResponse`](https://docs.cypress.io/api/commands/intercept#staticResponse-lt-code-gtStaticResponselt-code-gt) defines what you want kind of response that you want to stub in. You can specify some fixtures, a particular body, a status code, or some headers.

```js
cy.intercept('/workflows', {
  body: [{ workflow: '1' }, { workflow: '2' }],
});
```

```js
cy.intercept('/not-found', {
  statusCode: 404,
  body: '404 Not Found!',
  headers: {
    'x-not-found': 'true',
  },
});
```

### `routeHandler`

[`routeHandler`](https://docs.cypress.io/api/commands/intercept#routeHandler-lt-code-gtFunctionlt-code-gt) allow you to pass a function in, which you can programmatically make assertions against the request that was sent or stub in a response.

```js
cy.intercept('POST', '/greatest-bands', (req) => {
  expect(req.body).to.include('Oasis');
});

cy.intercept('POST', '/greatest-bands', (req) => {
  req.reply({
    body: 'We intercepted this request and this is our stubbed response.',
  });
});
```

You can do the following:

- `req.reply()`: Stub the request and reply with a `staticResponse`.
- `req.continue()`: Let it through to the real endpoint and get your hands on the response.
- `req.destroy()`: Eat the request and respond with a network error.
- `req.redirect()`: Redirect the request elsewhere.
- `req.on()`: Do stuff based at certain points of the request/response lifecycle.

Here is an example of `req.on`:

```js
cy.intercept('GET', '/users', (req) => {
  req.on('before:response', (res) => {
    console.log('About to get a response.');
  });
});

cy.intercept('GET', '/users', (req) => {
  req.on('before:response', (res) => {
    res.send({ body: 'We modified this response!' });
  });
});

cy.intercept('POST', '/users', (req) => {
  req.on('response', (res) => {
    console.log('We have heard back from the server.');
  });

  req.on('after:response', (res) => {
    console.log('The request was sent to the browser.');
  });
});
```

## Follow-along

Let's see this in action as we implement the tests in `cypress/integration/11-pokemon-search.spec.js`.

## Exercise

Now, implement the tests in `cypress/integration/12-dog-facts.spec.js` and we'll review possible solutions in `cypress/integration/12c-dog-facts-completed.spec.js`.
