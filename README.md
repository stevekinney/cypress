# Cypress Playground

## Code

There are two repositories for this project:

- This repostory.
- A [super simple starter](https://github.com/stevekinney/cypress-starter).

Clone down both, run `npm install` and the read below for a few extra steps for setting up this repository.

## Lessons and Content

All of the lessons can be found [here](https://github.com/stevekinney/cypress-examples/tree/main/lessons#readme).

## Getting Started

First and foremost, install your dependencies.

```
npm install
```

Next, set up the database.

```
npm run db:setup
```

Finally, spin up the server.

```
npm start
```

Your server will need to be running when you go to run your tests.

## Running the Tests

You can run the tests using the following command. **Note**: You must have completed the following steps and have the server up and running.

```
npx cypress open
```

[docker]: https://www.docker.com/
