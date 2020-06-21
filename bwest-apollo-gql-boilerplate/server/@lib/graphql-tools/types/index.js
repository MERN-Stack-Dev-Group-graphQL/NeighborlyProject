import DateTimeFilter from './DateTimeFilter'
import Direction from './Direction'
import FloatFilter from './FloatFilter'
import IntFilter from './IntFilter'
import BooleanFilter from './BooleanFilter'
import Mutation from './Mutation'
import Operator from './Operator'
import PageInfo from './PageInfo'
import Query from './Query'
import Scalar from './Scalar'
import StringFilter from './StringFilter'

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

export default [
  DateTimeFilter,
  Direction,
  FloatFilter,
  IntFilter,
  BooleanFilter,
  Mutation,
  Operator,
  PageInfo,
  Query,
  Scalar,
  SchemaDefinition,
  StringFilter,
]
