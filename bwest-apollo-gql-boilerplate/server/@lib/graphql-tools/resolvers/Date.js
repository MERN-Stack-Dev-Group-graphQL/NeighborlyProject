import { GraphQLDate as Date } from 'graphql-iso-date'
import { GraphQLScalarType } from 'graphql'

export default (function() {
  const serialize = value => {
    let convertedValue = value
    if (typeof value === 'number') {
      let sValue = value + ''
      if (sValue.length === 8) {
        convertedValue = convertDateIntToString(sValue)
      } else {
        throw new TypeError(`Date cannot represent an invalid date ${value}.`)
      }
    }
    return Date.serialize(convertedValue)
  }

  const parseValue = value => {
    let convertedValue = value
    if (typeof value === 'number') {
      let sValue = value + ''
      if (sValue.length === 8) {
        convertedValue = convertDateIntToString(sValue)
      } else {
        throw new TypeError(`Date cannot represent an invalid date ${value}.`)
      }
    }
    return Date._scalarConfig.parseValue(convertedValue)
  }

  const parseLiteral = ast => Date._scalarConfig.parseLiteral(ast)

  const config = {
    name: 'Date',
    description: `
      Extends graphql-iso-date GraphQLDate scalar, Int support added
      lib description:
        A date string, such as 2007-12-03, compliant with the 'full-date'
        format outlined in section 5.6 of the RFC 3339 profile of the
        ISO 8601 standard for representation of dates and times using
        the Gregorian calendar.
    `,
    serialize,
    parseValue,
    parseLiteral,
  }
  return new GraphQLScalarType(config)
})()

function convertDateIntToString(sValue) {
  const year = sValue.substring(0, 4)
  const month = sValue.substring(4, 6)
  const date = sValue.substring(6, 8)
  return year + '-' + month + '-' + date
}
