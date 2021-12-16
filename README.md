# Cypress Playground

## Getting Started

First and foremost, install your dependencies.

```
npm install
```

Next, set up the database.

The easiest wayto set up Postgres, you can spin up a [Docker][] container using `docker-compose up`. (Note: If you choose _not_ use Docker, you'll need to change the username and password in `.env` to the username and password of your locally-hosted Postgres database.

```
docker-compose up
```

If you have trouble with Docker and/or Postgres, you can go to `prisma/schema.prisma` and switch the databse to `sqlite`.

Once Postgres is running, you can push up your database schema.

```
npm run db:setup
```

Finally, spin up the server.

```
npm start
```

## Running the Tests

You can run the tests using the following command. **Note**: You must have completed the following steps and have the server up and running.

```
npx cypress open
```

[docker]: https://www.docker.com/
