import gql from 'graphql-tag';

export const FETCH_TOOLS_QUERY = gql`
  {
    getTools {
      edges {
        _id
        title
        make
        model
        color
        dimensions
        weight
        description
        electricalRatings
        category
        url
        photo {
          _id
          path
          filename
          mimetype
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const FETCH_TOOLS_BY_ID_QUERY = gql`
  query getToolById($toolId: ID!) {
    getToolById(toolId: $toolId) {
      _id
      title
      make
      model
      color
      dimensions
      weight
      description
      electricalRatings
      category
      url
      photo {
        _id
        path
        filename
        mimetype
      }
      createdAt
    }
  }
`;

export const ADD_TOOL_MUTATION = gql`
  mutation addTool($input: ToolInput!, $file: Upload!) {
    addTool(input: $input, file: $file) {
      _id
      title
      make
      model
      color
      dimensions
      weight
      description
      electricalRatings
      category
      photo {
        path
        filename
        mimetype
      }
      createdAt
      userId
    }
  }
`;

export const SEARCH_TOOLS_QUERY = gql`
  query searchTools($search: String) {
    searchTools(search: $search) {
      _id
      title
      make
      model
      color
      dimensions
      weight
      description
      electricalRatings
      category
    }
  }
`;
