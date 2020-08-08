import React, {useState, useCallback, useRef, useContext} from 'react';
import {useQuery} from '@apollo/client';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Loader from '_core/loader';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import {UserContext} from '_utils/context/';
import {useTheme} from '@react-navigation/native';
import CardFeature from '_core/card-feature';

const {height, width} = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const FeaturedTools = ({navigation}) => {
  const {colors} = useTheme();
  const {token} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {data, loading, error, refetch} = useQuery(FETCH_TOOLS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const handleAddedToCart = () => {
    if (!isCartVisible) {
      setIsCartVisible(true);
    }

    if (addedToCart) {
      setCartCount(cartCount - 1);
    } else {
      setCartCount(cartCount + 1);
    }
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (!data) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        styles.featuredScroll,
        {alignSelf: 'center', width: width - 20, paddingTop: 10},
      ]}>
      <View
        style={{
          alignSelf: 'center',
          width: width - 20,
          padding: 10,
        }}>
        <Text
          style={{
            paddingTop: 10,
            paddingBottom: 8,
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.75)',
          }}>
          Featured Tools
        </Text>
        <View
          style={{
            width: '100%',
            height: height / 2,
          }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 30,
              fontWeight: 'bold',
              lineHeight: 36,
              paddingBottom: 20,
            }}>
            Check out some of our most popular tools
          </Text>
          <FlatList
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            data={data.getTools.edges}
            renderItem={({index, item}) => {
              return (
                <CardFeature
                  tool={item}
                  handleCart={handleAddedToCart}
                  cartCount={cartCount}
                  navigation={navigation}
                  key={item._id}
                  index={index}
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
            }
            keyExtractor={item => item._id.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  featuredScroll: {},
});

export default FeaturedTools;
