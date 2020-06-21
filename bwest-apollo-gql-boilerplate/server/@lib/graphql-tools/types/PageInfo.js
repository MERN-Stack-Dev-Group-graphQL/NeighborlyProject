export default `
  type PageInfo {
    # ending cursor of this list
    endCursor: String

    # whether the result is from cache or not
    cached: Boolean

    # whether there are more results
    hasNextPage: Boolean
  }
`
