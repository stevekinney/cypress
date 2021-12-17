# Set Up

Clone down the [cypress-examples](https://github.com/stevekinney/cypress-examples) respository:

```sh
git clone https://github.com/stevekinney/cypress-examples.git
```

## Getting started

First and foremost, install your dependencies.

```
npm install
```

Next, set up the database.

If you don't want to install Postgres, you can spin up a [Docker](https://www.docker.com/) container using `docker-compose up`.

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

## Running the tests

You can run the tests using the following command. **Note**: You must have completed the following steps and have the server up and running.

```
npx cypress open
```
