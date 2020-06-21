import * as prettier from 'prettier/standalone'
import * as graphql from 'prettier/parser-graphql'

export default query =>
  prettier.format(String.raw(query), {
    parser: 'graphql',
    plugins: [graphql],
  })
