# Basic Practice (Solution)

Okay, let's work through some of these together.

## Adding a new item

The first test should be pretty similiar to what we've seen before.

```js
it('should appear on the page after clicking on "Add Item"', () => {
  const item = 'Good Attitude';

  cy.get('[data-test="new-item-input"]').type(item);
  cy.get('[data-test="add-item"]').click();

  cy.contains(item);
});
```

In this test, we're just looking to see that it's on the page at all. But, it turns out that we can scope our `contains()` to just a particular part of the DOM.

```js
it('should appear in the "Unpacked Items" list', () => {
  const item = 'Good Attitude';

  cy.get('[data-test="new-item-input"]').type(item);
  cy.get('form').submit();

  cy.get('[data-test="items-unpacked"]').contains(item);
});
```

We can even go as far as making sure that it's the _last_ element of a set.

```js
it('should appear as the last item in the "Unpacked Items" list', () => {
  const item = 'Good Attitude';

  cy.get('[data-test="new-item-input"]').type(item);
  cy.get('form').submit();

  cy.get('[data-test="items-unpacked"] li').last().contains(item);
});
```

## Filtering Items

This test is somewhat brittle since it relies on pre-loaded data that _could_ change. But, we'll go with it for now.

```js
it('should show items that match whatever is in the filter field', () => {
  cy.get('[data-test="filter-items"]').type('tooth');

  cy.contains('Tooth Brush');
  cy.contains('Tooth Paste');
});
```

We can also insist that something is _not_ on the page as well.

```js
it('should hide items that do not match whatever is in the filter field', () => {
  cy.get('[data-test="filter-items"]').type('tooth');
  cy.contains('Hoodie').should('not.exist');
});
```

### Making this Test Better

Okay, so how might we make this test a little bit better?

We could get all of the elements and make sure that they match the word that we're expecting.

```js
it.only('should show items that match whatever is in the filter field (better)', () => {
  cy.get('[data-test="filter-items"]').type('Tooth');

  cy.get('[data-test="items"] li').each(($item) => {
    expect($item.text()).to.include('Tooth');
  });
});
```

Whoa, why did I all of the suddent switch to that `expect` syntax on you? Sure, it exists and I like to keep you on your toes. But, also, I am no longer in a Cypress chain and now I _just_ have a jQuery object. This means, I do _not_ have a `.should()` method to grab on to.

The alternative is to re-wrap that jQuery collection back into a Cypress command.

```js
it.only('should show items that match whatever is in the filter field (better, wrap)', () => {
  cy.get('[data-test="filter-items"]').type('Tooth');

  cy.get('[data-test="items"] li').each(($item) => {
    cy.wrap($item).should('include.text', 'Tooth');
  });
});
```

I personally prefer the consistency of the second approach.

## Removing Items

Alright, what about taking stuff off the page. Well, you have two choices: Either assert that the stuff isn't there anymore or assert that the empty state is. (The right answer, of course, is both.)

```js
it('should remove all of the elements from the page', () => {
  cy.get('[data-test="remove-all"]').click();
  cy.get('[data-test="items"] li').should('not.exist');
});

it('should remove all of the elements from the page (alternate)', () => {
  cy.get('[data-test="remove-all"]').click();
  cy.get('[data-test="items-packed"]').contains('No items to show.').should('exist');
  cy.get('[data-test="items-unpacked"]').contains('No items to show.').should('exist');
});
```

Do we want to make sure that nothing happened to our "Remove" button?

```js
it('should have a remove button on an item', () => {
  cy.get('[data-test="items"] li').find('[data-test="remove"]');
});
```

We can apply that same trick that we used before, however to check _all_ of them.

```js
it('should have a remove button on each (literally)', () => {
  cy.get('[data-test="items"] li').each((li) => {
    cy.wrap(li).find('[data-test="remove"]').should('exist');
  });
});
```

Okay, so now let's make sure it's actually off the page.

```js
it('should remove an element from the page', () => {
  cy.contains('Tooth Brush').parent().find('[data-test="remove"]').click();
  cy.contains('Tooth Brush').should('not.exist');
});
```

We can do better, right? But, we need a new concept first. Our chains pass the last value though. So, if we want to make assertions on the list item, we need to query for the remove button and then pop back up the the item in question.

Sure, you _could_ get fancy with you're DOM traversal, but we're better than that—remember?

Instead, let's use `within` to do what we need to do and return to our place in the chain.

```js
it('should remove an element from the page (better)', () => {
  cy.get('[data-test="items"] li')
    .first()
    .within(() => cy.get('[data-test="remove"]').click())
    .should('not.exist');
});
```

## Marking them all as unpacked

One thing we could do is just make sure that there aren't any left in the "Packed" list.

```js
it('should empty out the "Packed" list', () => {
  cy.get('[data-test="mark-all-as-unpacked"]').click();
  cy.get('[data-test="items-packed"] li').should('not.exist');
});
```

That's well and good, but what about the edge case where they could just go completely missing? We want to make sure that they're where they are supposed to be.

```js
it('should empty have all of the items in the "Unpacked" list (brittle)', () => {
  cy.get('[data-test="mark-all-as-unpacked"]').click();
  cy.get('[data-test="items-unpacked"] li').its('length').should('eq', 5);
});
```

Gross. This relies on me knowing too much about the page. We have another trick up our collective sleeves. We can use `.then()` to keep a chained value in a closure scope and work with it.

```js
it('should empty have all of the items in the "Unpacked" list (better)', () => {
  cy.get('[data-test="items"] li')
    .its('length')
    .then((count) => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-unpacked"] li').its('length').should('eq', count);
    });
});
```

Count however many there were grand total and then click the button and confirm that there are that many in the "Unpacked" section.

## Toggling an individual item

There is an easy, but brittle approach.

```js
it('should move an individual item from "Unpacked" to "Packed" (brittle)', () => {
  cy.get('[data-test="items-unpacked"]').contains('Tooth Brush').click();
  cy.get('[data-test="items-packed"]').contains('Tooth Brush').should('exist');
});
```

The alternative is to combine everything we've covered into one chain.

What's going on here?

1. Find a label of an item.
1. Click its checkbox.
1. Take the item and read its text.
1. Go look at the first on in the "Packed" list and make sure it has the same label as the one you just clicked.

```js
it('should move an individual item from "Unpacked" to "Packed" (better)', () => {
  cy.get('[data-test="items-unpacked"] li label')
    .first()
    .within(() => {
      cy.get('input[type="checkbox"]').click();
    })
    .then(($item) => {
      const text = $item.text();
      cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
    });
});
```
