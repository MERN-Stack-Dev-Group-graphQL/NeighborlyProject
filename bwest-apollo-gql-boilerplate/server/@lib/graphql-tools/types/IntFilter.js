export default `
  input IntFilter {
    eq: Int
    ne: Int
    in: [Int]
    nin: [Int]
    gt: Int
    gte: Int
    lt: Int
    lte: Int
  }
`
