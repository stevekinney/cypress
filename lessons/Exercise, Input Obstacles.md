# Input Obstacles

The Web is great for a lot of reasons. Consistency is not one of those reasons. A lot of the different elements and controls that we use on a day-to-day basis were added over a period of decades and even then, this is a world where on its best day in January, if you call `getMonth()` on a `Date` object, you're going to get `0`.

This is all to say that Cypress's selector engine is based on jQuery's and jQuery is querying the DOM and the DOM has some pretty inconsistent APIs. That said, with a little bit of practice, you'll be able to tap into everything you know and love about working with the DOM.

In [Other Inputs](Other%20Inputs.md), I went through one or two ways to set inputs. Now, it's your turn to try your hand at a few of them in `cypress/integration/05-input-obstacles.spec.js`.

We'll review the answers in `cypress/integration/05c-input-obstacles-completed.spec.js`.
