import { SchemaDirectiveVisitor } from 'apollo-server'
import { getResolver } from '../registerResolver'

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve } = field

    const resolver = getResolver(`${details.objectType.name}.${field.name}`)
    if (resolver === null) throw `registerResover: "${name}" is already defined`

    field.resolve = async function(...args) {
      if (resolve) await resolve.apply(this, args)
      return resolver.apply(this, args)
    }
  }
}
