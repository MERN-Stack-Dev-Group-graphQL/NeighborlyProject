import React, {useState, useCallback, useRef, useContext} from 'react';
import {useQuery} from '@apollo/client';
import Card from '_core/card';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Loader from '_core/loader';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import {DYI} from '_utils/graphql/mock';
import {UserContext} from '_utils/context/';
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import CategoryTabs from '_components/category-tabs';
import FeaturedTools from '_scenes/tools/featured';

const {height, width} = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height / 2;

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const CardView = ({navigation}) => {
  const {token} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {colors} = useTheme();
  const {loading, data, error, fetchMore, refetch} = useQuery(
    FETCH_TOOLS_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

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

  const dismissCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    wait(1000).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, [refreshing]);

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
    <View style={{paddingTop: 50}}>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />
      <CategoryTabs />
      <FlatList
        ListHeaderComponent={() => <FeaturedTools navigation={navigation} />}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        data={data.getTools.edges}
        renderItem={({index, item}) => {
          return (
            <Card
              tool={item}
              handleCart={handleAddedToCart}
              cartCount={cartCount}
              navigation={navigation}
              key={item._id}
              index={index}
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              alignSelf: 'center',
              width: width - 40,
              marginVertical: 40,
            }}>
            <Text
              style={{
                paddingBottom: 8,
                marginTop: 20,
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.75)',
              }}>
              How is it done?
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 32,
                fontWeight: 'bold',
                lineHeight: 34,
                paddingBottom: 12,
                marginBottom: 20,
              }}>
              Check out some of our most watch DYI content at neighborly
            </Text>
            <FlatList
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              data={DYI}
              renderItem={({index, item}) => {
                const handleDIYVideo = () => {
                  navigation.push('DIY Detail', {
                    itemId: item._id,
                    video: item,
                  });
                };

                console.log(item.videoThumbnail);

                return (
                  <View style={{width: (width - 40) / 2}}>
                    <View style={{width: '100%', paddingRight: 10}}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.primary,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                          borderRadius: 5,
                          width: '100%',
                          height: 120,
                          overflow: 'hidden',
                        }}
                        onPress={handleDIYVideo}>
                        <Image
                          style={{
                            ...StyleSheet.absoluteFillObject,
                            width: '100%',
                            height: '100%',
                          }}
                          source={item.videoThumbnail}
                        />

                        <View
                          style={{
                            backgroundColor: colors.accent,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            borderColor: 'rgba(255,255,255, 0.75)',
                            borderWidth: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <MaterialCommunityIcons
                            name="play"
                            color={'#ffffff'}
                            size={36}
                          />
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          paddingLeft: 4,
                          paddingVertical: 8,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item._id.toString()}
            />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item._id.toString()}
      />

      {cartCount > 0 && isCartVisible && (
        <Animatable.View
          animation="slideInUp"
          easing="ease-out"
          iterationCount={1}
          style={[styles.cartBubbleWrapper, {backgroundColor: colors.primary}]}>
          <View
            style={[
              styles.cartBubble,
              {backgroundColor: 'rgba(255, 255, 255, 0.95)'},
            ]}>
            <Text style={styles.cartCount}>{cartCount}</Text>
          </View>
          <Text style={[styles.text, {color: 'rgba(255, 255, 255, 0.95)'}]}>
            Item(s) added to cart.
          </Text>
          <TouchableOpacity onPress={dismissCart} style={{marginLeft: 'auto'}}>
            <MaterialCommunityIcons
              name="close"
              color={'#ffffff'}
              size={24}
              style={{marginLeft: 6}}
            />
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeScrollView: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 120,
  },
  bottomSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
    width,
    zIndex: 2,
    display: 'none',
  },
  bottomSheetMenu: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    width: width - 32,
    height: BOTTOM_SHEET_HEIGHT,
    borderRadius: 15,
    bottom: 16,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  featuredItem: {
    color: '#ffffff',
  },
  name: {
    fontSize: 32,
  },
  cartBubbleWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 20,
    width,
    height: 60,
    bottom: 0,
    zIndex: 2,
  },
  cartBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default CardView;
