import React, {useState, useCallback} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '_components/header';
import SafeAreaView from 'react-native-safe-area-view';
import HomeScrollView from '_scenes/home/cardview';
import ListView from '_scenes/home/listview';
import HomeMapView from '_scenes/home/mapview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003167',
  },
  tabContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#e6e6e6',
  },
  tabViewMenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeContainer: {
    flex: 1,
    color: 'red',
    backgroundColor: '#f8f8f8',
  },
  cartBubbleContainer: {
    position: 'absolute',
    backgroundColor: '#003167',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%',
    bottom: 0,
    paddingLeft: 30,
    zIndex: 999,
  },
  cartBubble: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  cartCount: {
    color: '#003167',
  },
});

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const [key, setKey] = useState('cardview');
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const {loading, data} = useQuery(FETCH_TOOLS_QUERY);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Do something then
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  if (!data) {
    return null;
  }

  const handleAddedToCart = () => {
    if (addedToCart) {
      setCartCount(cartCount - 1);
    } else {
      setCartCount(cartCount + 1);
    }
  };

  console.log('Cart count', cartCount);

  const handleCardView = () => {
    setKey('cardview');
  };

  const handleListView = () => {
    setKey('listview');
  };

  const handleMapView = () => {
    setKey('mapview');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />
      <View style={styles.homeContainer}>
        <Header navigation={navigation} />
        <View style={styles.tabContainer}>
          <TouchableOpacity activeKey={key} onPress={handleCardView}>
            <View style={styles.tabViewMenu}>
              {key === 'cardview' ? (
                <MaterialCommunityIcons
                  name="cards-variant"
                  color={'#003167'}
                  size={24}
                />
              ) : (
                <MaterialCommunityIcons
                  name="cards-variant"
                  color={'rgba(0,0,0,0.25)'}
                  size={24}
                />
              )}
              <Text>Card View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeKey={key} onPress={handleListView}>
            <View style={styles.tabViewMenu}>
              {key === 'listview' ? (
                <MaterialCommunityIcons
                  name="format-list-bulleted-square"
                  color={'#003167'}
                  size={24}
                />
              ) : (
                <MaterialCommunityIcons
                  name="format-list-bulleted-square"
                  color={'rgba(0,0,0,0.25)'}
                  size={24}
                />
              )}
              <Text>List View</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeKey={key} onPress={handleMapView}>
            <View style={styles.tabViewMenu}>
              {key === 'mapview' ? (
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  color={'#003167'}
                  size={24}
                />
              ) : (
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  color={'rgba(0,0,0,0.25)'}
                  size={24}
                />
              )}

              <Text>Map View</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{display: key === 'cardview' ? 'flex' : 'none'}}>
          <HomeScrollView
            navigation={navigation}
            loading={loading}
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            handleAddedToCart={handleAddedToCart}
            cartCount={cartCount}
          />
        </View>

        <View style={{display: key === 'listview' ? 'flex' : 'none'}}>
          <ListView
            navigation={navigation}
            loading={loading}
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            handleAddedToCart={handleAddedToCart}
            cartCount={cartCount}
          />
        </View>

        <View style={{display: key === 'mapview' ? 'flex' : 'none'}}>
          <HomeMapView
            navigation={navigation}
            loading={loading}
            data={data}
            handleAddedToCart={handleAddedToCart}
            cartCount={cartCount}
          />
        </View>

        {cartCount > 0 && (
          <View style={styles.cartBubbleContainer}>
            <View style={styles.cartBubble}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
            <Text style={{color: '#ffffff'}}>Item(s) added to cart.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
