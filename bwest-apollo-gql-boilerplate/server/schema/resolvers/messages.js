import { combineResolvers } from 'graphql-resolvers';
import pubsub, { EVENTS } from '../../subscription';
import { isAuthenticated, isMessageOwner } from './auth';

import mongoDao from '../../@lib/mongodao';

const { ObjectID } = require('mongodb');
const database = process.env.MONGODB_DB;

const toCursorHash = (string) => Buffer.from(string).toString('base64');
const fromCursorHash = (string) => {
  console.log(string, 'test string');
  return Buffer.from(string, 'base64').toString('ascii');
};

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, context) => {
      console.log(cursor, 'test cursor');
      const cursorOptions = cursor
        ? {
            createdAt: {
              $lt: fromCursorHash(cursor),
            },
          }
        : {};
      // console.log(fromCursorHash(cursor), 'test cursor');
      // console.log(cursorOptions, 'test option');
      const messages = await mongoDao.getAllDocs(database, 'messages', cursorOptions, limit);

      const hasNextPage = messages.length > limit;
      const edges = hasNextPage ? messages.slice(0, -1) : messages;
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      };
    },
    message: async (parent, { _id }, context) => {
      return await mongoDao.pool
        .db(database)
        .collection('messages')
        .find({ _id: ObjectID(_id) });
    },
  },

  Mutation: {
    createMessage: combineResolvers(isAuthenticated, async (parent, { input: { text } }, { me }) => {
      let message = null;
      message = await new Promise(async (resolve, reject) => {
        await mongoDao.pool
          .db(database)
          .collection('messages')
          .insertOne(
            {
              text: text,
              userId: ObjectID(me._id),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {},
            (err, result) => {
              if (err) return reject(err);
              resolve(result.ops[0]);
            }
          );
      });

      pubsub.publish(EVENTS.MESSAGE.CREATED, {
        messageCreated: { message },
      });

      return message;
    }),

    deleteMessage: combineResolvers(isAuthenticated, isMessageOwner, async (parent, { _id }, context) => {
      const messageId = {
        _id: ObjectID(_id),
      };

      const { deletedCount } = await mongoDao.pool.db(database).collection('messages').deleteOne(messageId);

      if (deletedCount === 0) {
        console.error(`Delete failed with error: ${err}`);
        return false;
      } else {
        console.log(`Deleted ${deletedCount} document(s).`);
        return true;
      }
    }),
  },

  Message: {
    user: async (message, args, { loaders }) => {
      return await loaders.user.load(message.userId);
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
