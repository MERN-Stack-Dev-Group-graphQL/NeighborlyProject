const filterKeyMap = {
  eq: '$eq',
  ne: '$ne',
  in: '$in',
  nin: '$nin',
  gt: '$gt',
  gte: '$gte',
  lt: '$lt',
  lte: '$lte',
}

export const parseStandardFilters = (standardFilters, keyMap = {}) => {
  if (!standardFilters) return {}
  return Object.entries(standardFilters).reduce(
    (aggWhere, [filter, value]) => ({
      ...aggWhere,
      [keyMap[filter] || filter]: Object.entries(value).reduce(
        (aggFilter, [key, value]) => ({ ...aggFilter, [filterKeyMap[key]]: value }),
        {}
      ),
    }),
    {}
  )
}
