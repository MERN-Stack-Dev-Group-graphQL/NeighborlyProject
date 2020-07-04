import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_TOOLS_QUERY} from '../../utils/graphql';
import {Text, View, ScrollView} from 'react-native';
import Header from '_components/header';
import Loader from '_core/loader';
import Card from '_core/card';
import styled from 'styled-components';

const Home = () => {
  const {loading, data} = useQuery(FETCH_TOOLS_QUERY);

  if (!data) {
    return null;
  }

  return (
    <HomeContainer>
      <Header />
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          data.getTools.edges &&
          data.getTools.edges.map(tool => <Card tool={tool} key={tool._id} />)
        )}
      </ScrollView>
    </HomeContainer>
  );
};

const HomeContainer = styled.View`
  flex: 1;
  color: red;
  padding-top: 60px;
  background: #f8f8f8;
`;

export default Home;
