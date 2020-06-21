import { getTypeRoot } from '../utils'
import { SchemaDirectiveVisitor } from 'apollo-server'

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { name: dataloaderName } = this.args
    const { resolve } = field
    field.resolve = async function(...all) {
      if (resolve) await resolve.apply(this, all)

      const [parent, args, context, ast] = all
      const typeName = getTypeRoot(field.type).name
      const dbMetaData = getTypeRoot(ast.schema.getType(typeName)).dbMetaData || {}

      let lookupValue = null
      Object.keys(dbMetaData.fields).find(key => {
        if (args && args[key]) lookupValue = args[key]
        else if (parent && parent[key]) lookupValue = parent[key]
        else return false
        return true
      })
      return lookupValue !== null ? context.dataloader[dataloaderName].load(lookupValue) : null
    }
  }
}
