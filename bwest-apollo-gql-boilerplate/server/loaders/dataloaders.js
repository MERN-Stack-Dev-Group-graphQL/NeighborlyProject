import mongoDao from '../@lib/mongodao';

const DataLoader = require('dataloader');
const database = process.env.MONGODB_DB;

async function batchTools(Tools, keys) {
  const Tools = mongoDao.pool.db(database).collection('tools');
  return await Tools.find({ _id: { $in: keys } }).toArray();
}

module.exports = ({ Tools }) => ({
  toolLoader: new DataLoader((keys) => batchTools(Tools, keys), { cacheKeyFn: (key) => key.toString() }),
});
