import { groupBy } from 'ramda';
import knex from '../knex';

export const groupByKeys = (column, keys) => (rows) => {
  const lookup = groupBy((row) => row[column], rows);

  return keys.map((key) => lookup[key] || [{}]);
};

export const genericSqlBatchFn = (keys, { connection, database, table, column }) => {
  const { sql, bindings } = knex.select().from(`${database}.${table}`).whereIn(column, keys).toSQL();

  return connection
    .query(sql, bindings)
    .then(([res]) => res)
    .then(groupByKeys(column, keys));
};
