# Basic GraphQL Boilerplate

This project was generated with the [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [NodeJS](https://nodejs.org/en/), [GraphQL](https://graphql.org/) and [Apollo]().

## To Get Started

Please clone the bwest-apollo-gql-boilerplate and then navigate to the `/server` folder. Create a `.env` file in the root folder of your project then add the following environment variables with your own credentials for MongoDB URI, Username, Password and Database Name which can be obtained from your own MongoDB Atlas project.

```
PORT=4000
MONGODB_URI=mongodb+srv://<your-username>:<your-password>@graphql-boilerplate-xpwiy.mongodb.net/<your-database-name>?retryWrites=true&w=majority
MONGODB_DB=<your-database-name>
JWT_SECRET=<your-secret>
JWT_LIFE_TIME=60m
```

Run `npm install` or `yarn` to install **server** package dependencies. Once completed navigate to your `/client` folder and again run `npm install` or `yarn` to install **client** packages dependencies.

To start server, run:

```
npm start or yarn start
```

To start client, run:

```
npm start or yarn start
```

**Congratulation, you are on your way!**
