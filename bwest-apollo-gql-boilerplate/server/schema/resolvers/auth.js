import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

const { ObjectID } = require('mongodb');

export const isAuthenticated = (_, args, { me }) => (me ? skip : new ForbiddenError('Not authenticated as user.'));

export const isAdmin = combineResolvers(isAuthenticated, (_, args, { me: { role } }) =>
  role === 'ADMIN' ? skip : new ForbiddenError('Not authorized as admin.')
);

export const isMessageOwner = async (_, { _id }, { me }) => {
  const message = await mongoDao.pool
    .db(database)
    .collection('messages')
    .find({ _id: ObjectID(_id) });

  if (message.userId != me._id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};

export const isToolOwner = async (_, { _id }, { me }) => {
  const tool = await mongoDao.pool
    .db(database)
    .collection('tools')
    .find({ _id: ObjectID(_id) });

  if (tool.userId != me._id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
