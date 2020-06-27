import { UserInputError } from 'apollo-server';
import pubsub, { EVENTS } from '../../subscription';
import mongoDao from '../../@lib/mongodao';
import { mkdir } from 'fs';

const { ObjectID } = require('mongodb');
const { validateToolInput } = require('../../util/validators');
const database = process.env.MONGODB_DB;

const toCursorHash = (string) => Buffer.from(string).toString('base64');

const fromCursorHash = (string) => {
  console.log(string, 'test string');
  return Buffer.from(string, 'base64').toString('ascii');
};

const toolsResolver = {
  Query: {
    getTools: async (_, { cursor, limit = 9 }, context, info) => {
      // console.log('ran tools');
      // console.log(cursor, 'test cursor');
      const cursorOptions = cursor ? { createdAt: { $lt: fromCursorHash(cursor) } } : {};
      // console.log(cursorOptions, 'test option');

      const allTools = await mongoDao.getAllDocs(database, 'tools', cursorOptions, limit);

      const hasNextPage = allTools.length > limit;
      const edges = hasNextPage ? allTools.slice(0, -1) : allTools;
      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString()),
        },
      };
    },
    tool: async (_, args, { toolLoader }, info) => {
      console.log('ran tool');
      const tool = await mongoDao.getOneDoc(database, 'tools', '_id', ObjectID(args._id));

      return tool;
    },
    searchTools: async (_, { search }) => {
      var pipeline = [
        {
          $search: {
            search: {
              query: search,
              path: ['title', 'make', 'model', 'description', 'color', 'dimensions'],
            },
            highlight: {
              path: ['title', 'make', 'model', 'description', 'color', 'dimensions'],
            },
          },
        },
        {
          $project: {
            title: 1,
            make: 1,
            model: 1,
            color: 1,
            dimensions: 1,
            description: 1,
            _id: 0,
            score: {
              $meta: 'searchScore',
            },
            highlight: {
              $meta: 'searchHighlights',
            },
          },
        },
        {
          $limit: 5,
        },
      ];

      const tools = await mongoDao.pool.db(database).collection('tools').aggregate(pipeline).toArray();
      return tools;
    },
  },
  Mutation: {
    addTool: async (_, { input, file }, { me }, info) => {
      const dbTools = await mongoDao.pool.db(database).collection('tools');
      // If there is not a user in the context, throw an error
      console.log(me);
      if (!me) {
        throw new Error('only an authorized user can post a tool');
      }

      try {
        const { errors, valid } = validateToolInput(input.title, input.make, input.model, input.description);

        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }

        mkdir('assets/img', { recursive: true }, (err) => {
          if (err) throw err;
        });

        // Process upload
        const upload = await mongoDao.processUpload(file);

        const newTool = {
          ...input,
          photo: upload,
          userId: ObjectID(me._id),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const { insertedId } = await dbTools.insertOne(newTool);
        newTool._id = insertedId;

        console.log(newTool);
        console.info(newTool);

        pubsub.publish(EVENTS.TOOL.ADDED, {
          toolAdded: { newTool },
        });

        return newTool;
      } catch (error) {
        throw error;
      }
    },
    updateTool: async (parent, args, context, info) => {
      const result = await mongoDao.updateOneDoc(database, 'tools', '_id', args);

      if (result.matchedCount === 0) {
        console.error(`Delete failed! ${result.matchedCount} document(s) matched the query criteria`);
        console.log(`${result.modifiedCount} document(s) was/were updated`);
        return false;
      } else {
        console.log(`${result.matchedCount} document(s) matched the query criteria`);
        console.log(`${result.modifiedCount} document(s) was/were updated`);
        return true;
      }
    },
    deleteTool: async (parent, args, context, info) => {
      const { deletedCount } = await mongoDao.pool
        .db(database)
        .collection('tools')
        .deleteOne({ _id: ObjectID(args._id) });

      if (deletedCount === 0) {
        console.error(`Delete failed with error: ${err}`);
        return false;
      } else {
        console.log(`Deleted ${deletedCount} document(s).`);
        return true;
      }
    },
  },
  Subscription: {
    toolAdded: {
      subscribe: () => pubsub.asyncIterator(EVENTS.TOOL.ADDED),
    },
  },
  Tool: {
    url: (parent) => `/${parent.photo.path || parent.photo.path.toString()}`,
  },
};

export default toolsResolver;
