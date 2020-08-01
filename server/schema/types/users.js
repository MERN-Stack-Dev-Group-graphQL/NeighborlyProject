import { gql } from 'apollo-server';

const usersSchema = gql`
  type User {
    _id: ID!
    avatar: String
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    mobile: String
    locationId: Int
    locationDetails: String
    role: UserRole
    tools: [Tool]!
    # neighbors: [Neighborhood!]!
    # messages: [Message!]!
    # comments: [Comment!]
    token: String
    createdAt: Date
    updatedAt: Date
  }

  # type Neighborhood {
  #   neighbors: User!
  #   howLong: Int!
  # }

  enum UserRole {
    ADMIN
    MEMBER
    COLLABORATOR
  }

  input UserInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    role: UserRole = ADMIN
    password: String!
    confirmPassword: String!
    createdAt: Date
    updatedAt: Date
  }

  type Token {
    user: User!
    token: String!
    _id: String
  }

  extend type Query {
    allUsers(role: UserRole): [User!]!
    user(_id: ID!): User
    me: User
    neighbors: [User!]
  }

  extend type Mutation {
    register(input: UserInput!): User!
    login(login: String!, password: String!): Token!
    updateUser(login: String!): User!
    deleteUser(_id: ID!): Boolean!
    resetUserPassword(email: String!): Token!
  }
`;

export default usersSchema;
