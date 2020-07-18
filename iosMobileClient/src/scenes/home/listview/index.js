import React from 'react';
import Loader from '_core/loader';
import CardList from '_core/card-list';
import {ScrollView, StyleSheet} from 'react-native';
// import styled from 'styled-components';

const styles = StyleSheet.create({
  homeScrollView: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 120,
  },
});

const ListView = ({
  navigation,
  loading,
  data,
  handleAddedToCart,
  cartCount,
  refreshControl,
}) => {
  return (
    <ScrollView style={styles.homeScrollView} refreshControl={refreshControl}>
      {loading ? (
        <Loader />
      ) : (
        data.getTools.edges &&
        data.getTools.edges.map(tool => (
          <CardList
            tool={tool}
            handleCart={handleAddedToCart}
            cartCount={cartCount}
            navigation={navigation}
            key={tool._id}
          />
        ))
      )}
    </ScrollView>
  );
};

export default ListView;
