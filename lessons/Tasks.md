# Tasks

If you have some issues with your plugin file, make sure you read [How to Fix Cypress's Issue with ESM](How%20to%20Fix%20Cypress's%20Issue%20with%20ESM.md).

## So, Tasks…

Generally speaking—when we use Cypress, we control the browser with JavaScript. But, there are times where might need to do stuff on the Node.js level. For example, maybe we want to seed our database in between test runs or run an `npm` script. We'd use Cypress tasks for this.

- When you write normal Cypress code, it runs in the browser alongside your application.
- Tasks, on the other hand, run at the server-level and allow you do stuff under the hood.

Your tasks live in the `/plugins` directory.

And they might look something like this:

```ts
import reset from '../../prisma/reset.cjs';

const plugins: Cypress.PluginConfig = (on) => {
  on('task', {
    reset() {
      return reset;
    },
  });
};

export default plugins;
```

This is what it might look like if you weren't using TypeScript:

```js
module.exports = (on, config) => {
  on('task', {
    reset() {
      require('../prisma/clear');
    },
  });
};
```

This is now available in your tests.

```js
beforeEach(() => cy.task('reset'));
```

## Exercise

Clearing the database is helpful when you're testing creating a user, but sometimes you want literally the opposite. What do we do in the situations where we expect to already have the data in our application in a certain state before moving forward with our tests?

In this case, we can seed our database with the data we expect to see on the page.

If you look in `prisma/seed.cjs`, there is another file called seed that will create users and posts in the database after clearing it out.

- Write a test in `cypress/integration/09c-echo-chamber-with-tasks-completed.spec.js` that:
  - Seeds the database with these users.
  - Logs in with one of the users.
  - Verifies that login works in some way.

## Extensions

Curious about [what else plugins can do](https://docs.cypress.io/plugins/directory)?
