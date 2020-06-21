export default `
  input DateTimeFilter {
    eq: DateTime
    ne: DateTime
    in: [DateTime]
    nin: [DateTime]
    gt: DateTime
    gte: DateTime
    lt: DateTime
    lte: DateTime
  }
`
