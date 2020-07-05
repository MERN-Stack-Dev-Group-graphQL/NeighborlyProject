import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_TOOLS_QUERY} from '../../utils/graphql';
import {StatusBar, StyleSheet, Text, View, ScrollView} from 'react-native';
import Header from '_components/header';
import Loader from '_core/loader';
import Card from '_core/card';
import styled from 'styled-components';

import SafeAreaView from 'react-native-safe-area-view';

const Home = ({navigation}) => {
  const {loading, data} = useQuery(FETCH_TOOLS_QUERY);

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(16, 43, 70, 1)"
      />
      <HomeContainer>
        <Header navigation={navigation} />
        <HomeScrollView>
          {loading ? (
            <Loader />
          ) : (
            data.getTools.edges &&
            data.getTools.edges.map(tool => (
              <Card tool={tool} navigation={navigation} key={tool._id} />
            ))
          )}
        </HomeScrollView>
      </HomeContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 43, 70, 1)',
  },
});

const HomeContainer = styled.View`
  flex: 1;
  color: red;
  background: #f8f8f8;
`;

const HomeScrollView = styled.ScrollView`
  padding-left: 16px;
  padding-right: 16px;
`;

export default Home;
