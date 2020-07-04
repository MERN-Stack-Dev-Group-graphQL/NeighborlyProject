import DataLoader from 'dataloader';
import mongoDao from '../@lib/mongodao';

const database = process.env.MONGODB_DB;
const collection = 'users';
const field = '_id';

// keys, { database, collection, field }
const batchUsers = async (keys) => {
  // console.log(database, collection, field);
  // console.log(keys);

  // Fetch all users in a single call
  const users = await mongoDao.pool
    .db(database)
    .collection(collection)
    .find({
      [field]: {
        $in: keys,
      },
    })
    .toArray();

  // console.log(users);
  return keys.map((key) => users.find((user) => user._id || user.id == key));
};

export const userLoader = () => new DataLoader(batchUsers);
