import { gql } from 'apollo-server';

const toolsSchema = gql`
  scalar Coordinates

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

  type PointGeometry {
    type: String!
    coordinates: Coordinates!
  }

  type PointProps {
    _id: Int!
    lat: Float
    lon: Float
  }

  type PointObject {
    type: String!
    geometry: PointGeometry
    properties: PointProps
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
    category: ToolCategory
    location: PointObject
    url: String
    photo: File
    userId: ID
    createdAt: Date!
    updatedAt: Date!
    # comments: [Comment!]
  }

  type Comment {
    _id: ID!
    toolId: String
    content: String
    tool: Tool
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
    addTool(input: ToolInput!, file: Upload!): Tool!
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
