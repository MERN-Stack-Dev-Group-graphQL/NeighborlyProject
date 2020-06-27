require('dotenv').config();
import { Logger, MongoClient } from 'mongodb';
import exitHook from 'exit-hook';
import createLoader from '../dataloader';
import { groupByKeys } from '../batchfns';
import { createWriteStream, mkdir } from 'fs';

const { ObjectID } = require('mongodb');

let pool;

const init = async (secret) => {
  console.log('ran init and return pool');
  if (pool) return pool;
  const uri = process.env.MONGODB_URI;

  pool = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    appname: 'mongodao',
  });

  let logCount = 0;
  Logger.setCurrentLogger((msg, state) => {
    console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
  });
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);

  exitHook(() => {
    pool && pool.close(true);
  });

  console.log('🚀 Connected to MongoDB Successfully');
  return pool;
};

const loader = createLoader(
  (keys, { database, collection, field }) =>
    pool
      .db(database)
      .collection(collection)
      .find({ [field]: { $in: keys } })
      .toArray()
      .then(groupByKeys(field, keys)),
  ({ database, collection, field }) => `${database}:${collection}:${field}`
);

const getAllDocs = (database, collection, cursorOptions, limit) => {
  return pool
    .db(database)
    .collection(collection)
    .find(cursorOptions, {
      sort: { createdAt: -1 },
      limit: limit + 1,
    })
    .toArray();
};

const getOneDoc = (database, collection, field, args) => {
  return pool
    .db(database)
    .collection(collection)
    .findOne({ [field]: args })
    .then((data) => {
      // console.log(data, 'test data return');
      return data;
    });
};

const updateOneDoc = (database, collection, field, args) => {
  return pool
    .db(database)
    .collection(collection)
    .updateOne({ [field]: ObjectID(args._id) }, { $set: args.input, $currentDate: { lastModified: true } });
};

const storeUpload = async ({ stream, filename, mimetype }) => {
  const _id = new ObjectID();
  const path = `assets/img/${_id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ _id, path, filename, mimetype }))
      .on('error', reject)
  );
};

const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};

const mongoDao = {
  init,
  loader,
  getAllDocs,
  getOneDoc,
  updateOneDoc,
  processUpload,
  get pool() {
    if (pool) return pool;
    throw Error('Pool is not yet initialized. Please await init fn before attempting to access this property.');
  },
};

export default mongoDao;
