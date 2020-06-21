import { GraphQLTime as Time, GraphQLDateTime as DateTime } from 'graphql-iso-date'
import Date from './Date'
import JSON from 'graphql-type-json'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export const IP_REGEXP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/

const IPValue = value => {
  if (IP_REGEXP.test(value)) {
    return value
  }
  throw new Error(`The value ${value} is not a valid IP Address`)
}

const IP = new GraphQLScalarType({
  name: 'IP',
  description: 'IP Address scalar type',
  parseValue: IPValue,
  serialize: IPValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return IPValue(ast.value)
    }
    throw new Error(`The value ${ast.value} is not a valid IP Address`)
  },
})

const BoolStringValue = value => {
  let validBoolStrings = ['true', 'false']
  if (validBoolStrings.includes(value)) {
    return value
  }
  throw new Error(
    `The value ${value} is not a valid BooleanString please use string value 'true' or 'false'`
  )
}

const BooleanString = new GraphQLScalarType({
  name: 'BooleanString',
  description: 'Boolean value represented as a string',
  parseValue: BoolStringValue,
  serialize: BoolStringValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return BoolStringValue(ast.value)
    }
    throw new Error(
      `The value ${ast.value} is not a valid BooleanString please use string value 'true' or 'false'`
    )
  },
})

export default {
  Date,
  Time,
  DateTime,
  JSON,
  BooleanString,
  IP,
}
