import { defineConfig } from 'cypress';
import plugins from './cypress/plugins';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '**/*.spec.{js,ts}', // <-- by default it uses cypress/e2e/**/*.cy.{js,jsx,ts,tsx
  },
  setupNodeEvents(on, config) {
    return plugins(on, config);
  },
});
