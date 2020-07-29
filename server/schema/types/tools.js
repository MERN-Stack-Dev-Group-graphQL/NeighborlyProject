import { gql } from 'apollo-server';

const toolsSchema = gql`
  # # scalar Coordinates
  # scalar Float

  type File {
    _id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type ToolConnection {
    edges: [Tool!]!
    pageInfo: PageInfo!
  }

  enum ToolCategory {
    GENERAL
    POWER
    CONSTRUCTION
    CORDED
    CORDLESS
    APPLIANCE
    SAFETY
  }

  input ToolInput {
    title: String
    make: String
    model: String
    color: String
    dimensions: String
    weight: String
    description: String
    electricalRatings: String
    category: ToolCategory = GENERAL
  }

  input ToolLocation {
    address1: String
    address2: String
    city: String
    country: String
    countryCode: String
    latitude: Float
    longitude: Float
    provinceCode: String
    zip: String
  }

  type Location {
    address1: String
    address2: String
    city: String
    country: String
    countryCode: String
    latitude: Float
    longitude: Float
    provinceCode: String
    zip: String
  }

  type Tool {
    _id: ID!
    title: String!
    make: String!
    model: String!
    color: String
    dimensions: String
    weight: String
    description: String!
    electricalRatings: String
    price: Float
    unitOfMeasure: String
    quantity: Int
    category: ToolCategory
    location: Location
    url: String
    photo: File
    userId: ID
    user: User
    # reviews: [Review!]
    createdAt: Date!
    updatedAt: Date!
  }

  type Review {
    _id: ID!
    toolId: String
    content: String
    tool: Tool
    createdAt: Date
    updatedAt: Date
  }

  type Comment {
    _id: ID!
    targetId: String
    author: [User]
    content: String
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getTools(cursor: String, limit: Int): ToolConnection!
    getToolById(toolId: ID!): Tool
    searchTools(search: String): [Tool!]!
    comment(_id: String): Comment
  }

  extend type Mutation {
    addTool(input: ToolInput!, location: ToolLocation!, file: Upload!): Tool!
    updateTool(_id: ID!, input: ToolInput!): Boolean!
    deleteTool(_id: ID!): Boolean!
    createComment(toolId: String, content: String): Comment
  }

  extend type Subscription {
    toolAdded: ToolAdded!
  }

  type ToolAdded {
    tool: Tool!
  }
`;

export default toolsSchema;
