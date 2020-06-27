import mongoDao from '../@lib/mongodao';

export const batchUsers = async (keys, { database, collection, field }) => {
  console.log(database, collection, field);
  console.log(keys);
  const users = await mongoDao
    .db(database)
    .collection(collection)
    .find({
      field: {
        $in: keys,
      },
    });

  return keys.map((key) => users.find((user) => user.id == key));
};
