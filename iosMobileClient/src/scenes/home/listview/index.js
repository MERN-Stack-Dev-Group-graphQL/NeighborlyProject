import React from 'react';
import Loader from '_core/loader';
import CardList from '_core/card-list';
import {ScrollView} from 'react-native';
import styled from 'styled-components';

const ListView = ({
  navigation,
  loading,
  data,
  handleAddedToCart,
  cartCount,
}) => {
  return (
    <HomeScrollView>
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
    </HomeScrollView>
  );
};

const HomeScrollView = styled.ScrollView`
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
`;

export default ListView;