import { SchemaDirectiveVisitor } from 'apollo-server'
import { defaultFieldResolver } from 'graphql'

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (object, args, context, info) => {
      if (context && context.auth)
        context.logger.warn(`${context.auth.client_id} is using deprecated field '${field.name}'`)

      return resolve.call(field, object, args, context, info)
    }

    field.isDeprecated = true
    field.deprecationReason = this.args.reason
  }

  visitEnumValue(value) {
    value.isDeprecated = true
    value.deprecationReason = this.args.reason
  }
}
