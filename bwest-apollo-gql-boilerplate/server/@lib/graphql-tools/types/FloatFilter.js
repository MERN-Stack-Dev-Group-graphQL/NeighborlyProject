export default `
  input FloatFilter {
    eq: Float
    ne: Float
    in: [Float]
    nin: [Float]
    gt: Float
    gte: Float
    lt: Float
    lte: Float
  }
`
