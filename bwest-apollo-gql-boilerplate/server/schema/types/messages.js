import { gql } from 'apollo-server';

const messagesSchema = gql`
  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  input MessageInput {
    text: String!
  }

  type Message {
    _id: ID!
    text: String!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(_id: ID!): Message!
  }

  extend type Mutation {
    createMessage(input: MessageInput!): Message
    deleteMessage(_id: ID!): Boolean!
  }

  extend type Subscription {
    messageCreated: MessageCreated!
  }

  type MessageCreated {
    message: Message!
  }
`;

export default messagesSchema;
