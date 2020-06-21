export const getTypeRoot = type => ('name' in type ? type : getTypeRoot(type.ofType))

export const isListType = type => type && (type.kind === 'ListType' || isListType(type.type))

export const toCamelCase = (string, delim = '_') => {
  const arr = string.split(delim)
  return arr
    .map((subString, i) => (i === 0 ? subString : subString[0].toUpperCase() + subString.slice(1)))
    .join('')
}

export const toCamelCaseObject = obj => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    newObj[toCamelCase(key)] = obj[key]
  })
  return newObj
}

export default {
  getTypeRoot,
  isListType,
  toCamelCase,
  toCamelCaseObject,
}
