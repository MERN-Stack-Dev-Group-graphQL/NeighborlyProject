import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { combineResolvers } from 'graphql-resolvers';
import { UserInputError } from 'apollo-server';
import { isAdmin, isAuthenticated } from './auth';
import mongoDao from '../../@lib/mongodao';

const { ObjectID } = require('mongodb');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const SECRET_KEY = process.env.JWT_SECRET;
const SECRET_EXP = process.env.JWT_LIFE_TIME;

const createToken = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    SECRET_KEY,
    { expiresIn: SECRET_EXP }
  );
};

const database = process.env.MONGODB_DB;

const usersResolver = {
  Query: {
    allUsers: async (_, args, { loaders }, info) => {
      console.log('ran users');
      const users = await mongoDao.pool
        .db(database)
        .collection('users')
        .find()
        .toArray()
        .then((data) => {
          // console.log(data, 'users test data returned');
          return data;
        });

      return users;
    },
    user: async (_, args, { loaders }, info) => {
      console.log('ran user');
      const user = await mongoDao.pool
        .db(database)
        .collection('users')
        .findOne({ _id: ObjectID(args._id) })
        .then((data) => {
          // console.log(data, 'user test data returned');
          return data;
        });
      return user;
    },
    me: async (parent, args, { me }) => {
      console.log('ran me');
      if (!me) {
        return null;
      }
      return await mongoDao.pool
        .db(database)
        .collection('users')
        .findOne({ _id: ObjectID(me._id) });
    },
  },
  Mutation: {
    register: async (_, { input: { username, firstName, lastName, email, role, password, confirmPassword } }, context, info) => {
      const dbCollection = await mongoDao.pool.db(database).collection('users');

      try {
        const { errors, valid } = validateRegisterInput(username, firstName, lastName, email, password, confirmPassword);
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }

        const existingUser = await dbCollection.findOne({ email: email });
        if (existingUser) {
          throw new UserInputError('Email is already taken', {
            errors: {
              email: 'This email is already taken',
            },
          });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userData = {
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const user = await dbCollection
          .insertOne(userData, { writeConcern: { w: 'majority' } })
          .then((result) => {
            console.log(`Successfully inserted new user with _id: ${result.insertedId}`);
            return result.ops[0];
          })
          .catch((err) => {
            console.error(`Failed to insert new user: ${err}`);
            return { error: e };
          });
        console.log(user);
        const token = createToken(user);
        return { ...user, _id: user._id, token };
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { login, password }, context, info) => {
      const { errors, valid } = validateLoginInput(login, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      let user = await mongoDao.pool.db(database).collection('users').findOne({ username: login });

      if (!user) {
        user = await mongoDao.pool.db(database).collection('users').findOne({ email: login });
      }

      if (!user) {
        throw new UserInputError('No user found with this login credentials.');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = 'Invalid password.';
        throw new UserInputError('Invalid password.', { errors });
      }

      const token = createToken(user);
      return {
        token,
      };
    },
    updateUser: combineResolvers(isAuthenticated, async (parent, { email }, { me }) => {
      return await mongoDao.pool.db(database).collection('users').findByIdAndUpdate(me._id, { email }, { new: true });
    }),
    deleteUser: combineResolvers(isAdmin, async (parent, { _id }, context) => {
      const user = await mongoDao.pool
        .db(database)
        .collection('users')
        .find({ _id: ObjectID(_id) });
      if (user) {
        await user.remove();
        return true;
      } else {
        return false;
      }
    }),
  },
  User: {
    messages: async (user, args, context) => {
      return await mongoDao.pool.db(database).collection('messsges').find({
        userId: user._id,
      });
    },
    neighbors: async (user, args, { userLoader }) => {
      return userLoader.loadMany(user.neighbors);
    },
  },
};

export default usersResolver;
