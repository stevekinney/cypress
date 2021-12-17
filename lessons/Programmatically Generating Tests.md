# Programmatically Generating Tests

Testing is interesting, because in a lot of ways, the general rules of programming don't apply. In a lot of cases, your tests serve as documentation and no one wants their documentation to be abstracted, obfuscated, or otherwise clever in any way.

That said, there are times when you writing out every possible test case can get incredibly tedious. The good news is that our tests are just JavaScript and we have the full power of the JavaScript programming language at our finger tips.

```js
const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];
```

Let's say what we _know_ the restaurants that are generated from our application.

```js
describe('Restaurant Filter', () => {
  beforeEach(() => {
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  for (const restaurant of restaurants) {
    it(`should only display rows that match ${restaurant}`, () => {
      cy.get('@restaurant-filter').select(restaurant);

      cy.get('td[headers="whereToOrder-column"]').should('contain', restaurant);
    });
  }
});
```

This will go ahead and create a test for each restaurant in your array.

## Exercise

Head over to `cypress/integration/06-secret-menu.spec.js` and implement the following:

- Can you iterate through all of the columns and verify that they're present when checked and hidden when unchecked?
- Can you iterate through all of the ratings and verify that it filters all of the deals appropriately? If for example, the user selects a minimum rating of 6. We should only see deals that have a popularity of 6 or higher.
