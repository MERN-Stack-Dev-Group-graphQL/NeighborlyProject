import { SchemaDirectiveVisitor } from 'apollo-server'

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { required } = this.args
    const { resolve } = field

    field.resolve = async function(...args) {
      if (resolve) await resolve.apply(this, args)

      const context = args[2]
      if (!context.auth.scope.includes(required)) throw `${required} scope is required`
    }
  }
}
