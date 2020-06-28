# Basic GraphQL Boilerplate

This project was generated with the [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [NodeJS](https://nodejs.org/en/), [GraphQL](https://graphql.org/) and [Apollo]().

## To Get Started

Please clone the bwest-apollo-gql-boilerplate and then navigate to the `/server` folder. Create a `.env` file then add the following environment variables with your own credentials for MongoDB URI, Database Name which can be obtained from your MongoDB Atlas project.

copy and paste the following into your local `.env` in the root of your project. 
```
PORT=4000
MONGODB_URI=mongodb+srv://sysadmin:Bwsxdcftest123@graphql-boilerplate-xpwiy.mongodb.net/graphql-boilerplate?retryWrites=true&w=majority
MONGODB_DB=graphql-boilerplate
JWT_SECRET=51778657246321226641fsdklafjasdkljfsklfjd7148924065
JWT_LIFE_TIME=60m
```

If you use nodemon, use the following json object
```
{
  "env": {
    "PORT": 4000,
    "MONGODB_URI": "mongodb+srv://<your-username>:<your-password>@apollo-gql-boilerplate-xpwiy.mongodb.net/<your-db-name>?retryWrites=true&w=majority",
    "MONGODB_DB": "your-db-name",
    "JWT_SECRET": "your-secret",
    "JWT_LIFE_TIME": "30m"
  }
}
```

Run `npm install` or `yarn install` to install server packages. Once completed navigate to your `/client` folder and again run `npm install` or `yarn install` to install client packages.

To start server only, run:

```
npm start or yarn start
```

To start client only, run:

```
npm start or yarn start
```

To start both client and server concurrently, from the `/server` directory run:

```
npm run dev or yarn run dev
```

**Congratulation, you are on your way!**
