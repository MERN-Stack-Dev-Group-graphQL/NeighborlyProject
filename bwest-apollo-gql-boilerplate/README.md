# Basic GraphQL Boilerplate

This project was generated with the [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [NodeJS](https://nodejs.org/en/), [GraphQL](https://graphql.org/) and [Apollo]().

## To Get Started

Please clone the apollo-gql-boilerplate and then navigate to the `/server` folder. Open the file `nodemon` and rename it to `nodemon.json` then replace environment variables with your own which can be obtained from your MongoDB Atlas project.

```
{
  "env": {
    "PORT": 4000,
    "MONGODB_URI": "mongodb+srv://<your-username>:<your-password>@apollo-gql-boilerplate-xpwiy.mongodb.net/<db-name>?retryWrites=true&w=majority",
    "MONGODB_DB": "your-mongodb-database",
    "JWT_SECRET": "your-secret",
    "JWT_LIFE_TIME": "30m"
  }
}
```

Run `npm install` to install server packages. Once completed navigate to the `/client` folder and run `npm install` to install client packages.

To start server only, run:

```
npm start
```

To start client only, run:

```
npm start
```

To start both client and server concurrently, from the `/server` directory run:

```
npm run dev
```

**Congratulation, you are on your way!**
