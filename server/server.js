import http from 'http';
import initConnections from './initConnection';
import express from 'express';
import CreateApolloServer from './apollo/createApolloServer';
import createLogger from './@lib/logger';
import cors from 'cors';

// nothing

const path = require('path');
const logger = createLogger('main');

const run = async () => {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(cors());
  app.get('/check', (req, res) => {
    res.sendStatus(200);
  });

  await initConnections();

  const server = CreateApolloServer();
  server.applyMiddleware({ app, path: '/graphql' });

  app.use('/', express.static(path.join(__dirname)));

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port }, () => {
    console.log(`🚀 Apollo GraphQL Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
  });
};

run().catch((error) => {
  logger.error('FATAL ERROR');
  logger.error('%O', error);
  process.exit(1);
});
