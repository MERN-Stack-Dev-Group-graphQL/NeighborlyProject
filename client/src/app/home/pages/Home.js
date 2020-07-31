import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Test from '../Test'

const QueryTest = gql`
  query SearchFunction($search: String!){
      searchTools(search: $search){
        title
        make
        model
        dimensions
        description
      }
    }
`


function Home() {


  const searchTerm = "Super";
  
  const { loading, error, data } = useQuery(QueryTest, {
    variables: {
      search: searchTerm
    },
  });


  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1>Home Page</h1>
            <Test data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
