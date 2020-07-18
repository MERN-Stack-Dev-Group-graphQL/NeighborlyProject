import gql from 'graphql-tag';

export const FETCH_TOOLS_QUERY = gql`
  query getTools {
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
        price
        unitOfMeasure
        quantity
        location {
          address1
          address2
          city
          country
          countryCode
          latitude
          longitude
          provinceCode
          zip
        }
        category
        userId
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
      price
      unitOfMeasure
      quantity
      category
      location {
        address1
        address2
        city
        country
        countryCode
        latitude
        longitude
        provinceCode
        zip
      }
      url
      userId
      user {
        _id
        username
        firstName
        lastName
      }
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
      price
      unitOfMeasure
      quantity
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

export const GET_USER = gql`
  query me {
    me {
      _id
      username
      firstName
      lastName
      email
      role
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
      price
      unitOfMeasure
      quantity
      userId
      url
    }
  }
`;

const TOOL_FRAGMENT = gql`
  fragment toolFields on Tool {
    _id
    title
    make
    model
    color
    dimensions
    weight
    description
    electricalRatings
    price
    unitOfMeasure
    quantity
    category
    userId
    url
  }
`;
