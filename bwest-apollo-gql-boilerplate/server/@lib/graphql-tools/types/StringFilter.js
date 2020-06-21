export default `
  input StringFilter {
    eq: String
    ne: String
    in: [String]
    nin: [String]
    gt: String
    gte: String
    lt: String
    lte: String
  }

  input StringFilterEq {
    eq: String
  }

  input StringFilterEqIn {
    eq: String
    in: [String]
  }
`
