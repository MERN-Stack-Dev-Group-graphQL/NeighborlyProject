import { defaultFieldResolver } from 'graphql'
import { SchemaDirectiveVisitor } from 'apollo-server'

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { from } = this.args
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (object, args, context, info) => {
      object[field.name] = object[field.name] || object[from]

      return resolve.call(this, object, args, context, info)
    }
  }
}
