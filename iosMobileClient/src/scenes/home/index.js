import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_TOOLS_QUERY} from '../../utils/graphql';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import Header from '_components/header';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import TabViewMenuBar from '_components/tabviewmenubar';
import HomeScrollView from '_scenes/home/cardview';

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
        <TabViewMenuBar />
        <HomeScrollView
          navigation={navigation}
          loading={loading}
          data={data}
          handleAddedToCart={handleAddedToCart}
          cartCount={cartCount}
        />
        {cartCount > 0 && (
          <CartBubbleWrapper>
            <CartBubble>
              <Text style={styles.cartCount}>{cartCount}</Text>
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
  cartCount: {
    color: '#ffffff',
  },
});

const HomeContainer = styled.View`
  flex: 1;
  color: red;
  background: #f8f8f8;
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
