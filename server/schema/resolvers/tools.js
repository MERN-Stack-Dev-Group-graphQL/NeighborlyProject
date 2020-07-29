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
    getTools: async (parent, { cursor, limit = 9 }, context, info) => {
      const cursorOptions = cursor ? { createdAt: { $lt: fromCursorHash(cursor) } } : {};
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
    getToolById: async (_, { toolId }) => {
      const tool = await mongoDao.getOneDoc(database, 'tools', '_id', ObjectID(toolId));

      return tool;
    },
    searchTools: async (_, { search }) => {
      const where = {};

      if (search) {
        where.search = search;
      }

      var pipeline = [
        {
          $searchBeta: {
            compound: {
              should: [
                {
                  text: {
                    query: where.search,
                    path: 'title',
                    fuzzy: {
                      maxEdits: 2,
                      prefixLength: 1,
                    },
                    score: {
                      boost: {
                        value: 5,
                      },
                    },
                  },
                },
                {
                  text: {
                    query: where.search,
                    path: ['title', 'make', 'model', 'description', 'color', 'dimensions'],
                  },
                },
              ],
            },
            highlight: {
              path: ['title', 'make', 'model', 'description', 'color', 'dimensions'],
            },
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            make: 1,
            model: 1,
            color: 1,
            dimensions: 1,
            weight: 1,
            description: 1,
            location: 1,
            category: 1,
            price: 1,
            unitOfMeasure: 1,
            quantity: 1,
            userId: 1,
            url: 1,
            photo: 1,
            createdAt: 1,
            score: {
              $meta: 'searchScore',
            },
            highlight: {
              $meta: 'searchHighlights',
            },
          },
        },
        {
          $limit: 10,
        },
      ];

      const tools = await mongoDao.pool.db(database).collection('tools').aggregate(pipeline).toArray();
      return tools;
    },
  },
  Mutation: {
    addTool: async (_, { input, location, file }, { me }, info) => {
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
          location: {
            ...location,
          },
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
    user: async (parent, _, { userLoader }) => {
      // console.log('Tool Owner ID', parent.userId);
      // const user = await mongoDao.pool
      //   .db(database)
      //   .collection('users')
      //   .find({ _id: parent.userId })
      //   .toArray()
      //   .then((data) => {
      //     return data;
      //   });
      const user = await userLoader.load(parent.userId);
      // console.log('Tool Owner', user);
      return user;
    },
  },
};

export default toolsResolver;
