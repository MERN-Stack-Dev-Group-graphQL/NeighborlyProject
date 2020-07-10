import DataLoader from 'dataloader';
import mongoDao from '../@lib/mongodao';

const database = process.env.MONGODB_DB;
const collection = 'users';
const field = '_id';
const batchUsers = async (keys) => {
  const users = await mongoDao.pool
    .db(database)
    .collection(collection)
    .find({
      [field]: {
        $in: keys,
      },
    })
    .toArray();
  return keys.map((key) => users.find((user) => user._id || user.id == key));
};

export const userLoader = () => new DataLoader(batchUsers);
