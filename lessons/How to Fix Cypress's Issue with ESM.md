**Nota bene**: As of right now there is a bit of \[an issue\]\[plugins-cjs\] when you're using ESM modules and the plugins file. We're going to work through this together, but if you're not using `{ type: 'module' }` in your `package.json`, you don't have to worry about this.

### Solution: Use TypeScript

```ts
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (on, config) => {
  on('task', {
    seed() {
      /* Implemented later… */
    },
  });
};
```
