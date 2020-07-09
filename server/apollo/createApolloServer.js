import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { toolLoader } from '../loaders/toolLoader';
import { userLoader } from '../loaders/userLoader';

import typeDefs from '../schema/types';
import resolvers from '../schema/resolvers';

const SECRET = process.env.JWT_SECRET;

const getMe = async (req) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return jwt.verify(token, SECRET);
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

export default () => {
  return new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      if (req) {
        const me = await getMe(req);

        return {
          me,
          secret: process.env.JWT_SECRET,
          request: req,
          toolLoader: toolLoader(),
          userLoader: userLoader(),
        };
      }
    },
  });
};
