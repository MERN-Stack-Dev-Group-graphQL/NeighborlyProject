import gql from 'graphql-tag'

import copy from './copy'
import dataloader from './dataloader'
import db, { primary, index, unique } from './db'
import deprecatedField from './deprecatedField'
import resolve from './resolve'
import scope from './scope'
import local from './local'
import dev from './dev'
import staging from './staging'

const types = gql`
  directive @copy(from: String!) on FIELD_DEFINITION
  directive @dataloader(name: String!) on FIELD_DEFINITION
  directive @deprecated(reason: String!) on FIELD_DEFINITION
  directive @resolve on FIELD_DEFINITION

  directive @scope(required: String!) on FIELD_DEFINITION

  directive @db(field: String!, objectId: Boolean = false) on FIELD_DEFINITION
  directive @primary on FIELD_DEFINITION
  directive @index on FIELD_DEFINITION
  directive @unique on FIELD_DEFINITION

  directive @local on FIELD_DEFINITION
  directive @dev on FIELD_DEFINITION
  directive @staging on FIELD_DEFINITION
`

const visitors = {
  copy,
  dataloader,
  db,
  deprecated: deprecatedField,
  index,
  primary,
  resolve,
  scope,
  unique,
  local,
  dev,
  staging,
}

export default { types, visitors }
