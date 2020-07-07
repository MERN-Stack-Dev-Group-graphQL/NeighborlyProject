import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_TOOLS_QUERY} from '../../utils/graphql';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import Header from '_components/header';
import Loader from '_core/loader';
import Card from '_core/card';
import styled from 'styled-components';

import SafeAreaView from 'react-native-safe-area-view';

const Home = ({navigation}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const {loading, data} = useQuery(FETCH_TOOLS_QUERY);

  if (!data) {
    return null;
  }

  const handleAddedToCart = () => {
    if (addedToCart) {
      // setAddedToCart(false);
      setCartCount(cartCount - 1);
      // Alert.alert(`${title} added to cart.`);
    } else {
      // setAddedToCart(true);
      setCartCount(cartCount + 1);
      // Alert.alert(`${title} removed to cart.`);
    }
  };

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
              <Card
                tool={tool}
                handleCart={handleAddedToCart}
                cartCount={cartCount}
                navigation={navigation}
                key={tool._id}
              />
            ))
          )}
        </HomeScrollView>
        {cartCount > 0 && (
          <CartBubbleWrapper>
            <CartBubble>
              <Text style={{color: '#ffffff'}}>{cartCount}</Text>
            </CartBubble>
            <Text>Item(s) added to cart.</Text>
          </CartBubbleWrapper>
        )}
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
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
`;

const CartBubbleWrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 60px;
  padding-left: 30px;
`;

const CartBubble = styled.View`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: rgba(16, 43, 70, 1);
  z-index: 9999;
`;

export default Home;
