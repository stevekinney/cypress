# Spies, Stubs, and Clocks

## Spies

Spies in Cypress—or, technically, in Sinon—allow you to see whether or not a function or method in your application has been called. There are some things you need to keep in mind.

Despite the fact that your Cypress tests might live in a directory within your codebase, they don't have access to your code base.

Chances are that no only is most of your code wrapped in closures, but it's also compiled during the build process. This basically means that you won't have access to anything you don't put into the `window` object at some point.

That said, there is a lot of functionality already in the global scope. Here are a few examples that you may have heard of:

- `console.log` and its siblings
- `setInterval` and `setTimeout`
- `localStorage.setItem` and `localStorage.getItem`
- `navigator`
  - `navigator.clipboard` and its associated methods
  - `navigation.geolocation`
  - `navigator.onLine`
  - `navigator.getBattery()`

## Stubs

Stubs take things one step further. They'll not only watch for you calling a given API, they'll jump in an swap in a refturn value.

Stubs obviously take some of the "real world" out of your tests, but sometimes that's for the best—just like when we [intercepted network requests](Network%20Requests.md).

## Clocks

Clocks allow you to manipulate time. That sounds cooler than it really is—but, it's still pretty cool. This is especially useful if you want to deterministically check to see whether or not a time has been rendered correctly in the DOM.

They're also useful in the event that you need to manually move time forward in your application to see whether or not a particular time-based change has happened (for example, a terrible modal or toast notification that is only supposed to appear after 5 seconds).
