import directives from './directives'
import coreTypes from './types'
import coreResolvers from './resolvers'

export const enhanceSchema = ({ types, resolvers, schemaDirectives }) => ({
  schemaDirectives: { ...directives.visitors, ...schemaDirectives },
  typeDefs: [directives.types, ...coreTypes, ...types],
  resolvers: { ...coreResolvers, ...resolvers },
})
