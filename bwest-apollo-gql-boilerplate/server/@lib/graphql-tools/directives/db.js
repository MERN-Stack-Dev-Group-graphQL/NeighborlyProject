import { SchemaDirectiveVisitor } from 'apollo-server'

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { field: fieldName, objectId = false } = this.args
    if (!details.objectType.dbMetaData) details.objectType.dbMetaData = { fields: {} }
    if (!details.objectType.dbMetaData.fields[field.name])
      details.objectType.dbMetaData.fields[field.name] = {}
    details.objectType.dbMetaData.fields[field.name].fieldName = fieldName
    details.objectType.dbMetaData.fields[field.name].objectId = objectId

    const { resolve } = field
    if (fieldName) {
      field.resolve = async function(...all) {
        if (resolve) await resolve.apply(this, all)
        return all[0][fieldName]
      }
    }
  }
}

export const index = class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    if (!details.objectType.dbMetaData) details.objectType.dbMetaData = { fields: {} }
    if (!details.objectType.dbMetaData[field.name])
      details.objectType.dbMetaData.fields[field.name] = {}
    details.objectType.dbMetaData.fields[field.name].key = 'index'
  }
}

export const primary = class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    if (!details.objectType.dbMetaData) details.objectType.dbMetaData = { fields: {} }
    if (!details.objectType.dbMetaData[field.name])
      details.objectType.dbMetaData.fields[field.name] = {}
    details.objectType.dbMetaData.fields[field.name].key = 'primary'
    details.objectType.dbMetaData._primary = field.name
  }
}

export const unique = class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    if (!details.objectType.dbMetaData) details.objectType.dbMetaData = { fields: {} }
    if (!details.objectType.dbMetaData[field.name])
      details.objectType.dbMetaData.fields[field.name] = {}
    details.objectType.dbMetaData.fields[field.name].key = 'unique'
  }
}
