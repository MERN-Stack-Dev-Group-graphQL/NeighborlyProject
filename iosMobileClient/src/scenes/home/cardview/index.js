import React, {useState, useCallback, useRef, useContext} from 'react';
import {useQuery, NetworkStatus} from '@apollo/client';
import Card from '_core/card';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Loader from '_core/loader';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import {DYI} from '_utils/graphql/mock';
import {useTheme} from '@react-navigation/native';
import CategoryTabs from '_components/category-tabs';
import FeaturedTools from '_scenes/tools/featured';
import {AppButton} from '_components/core/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');

const CardView = ({navigation}) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {data, loading, error, fetchMore, refetch} = useQuery(
    FETCH_TOOLS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
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

  loading && <Loader loading={loading} />;

  error && <Error error={error.message} />;

  if (!data) {
    return null;
  }

  return (
    <View style={{paddingTop: 50}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
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
            {data.getTools.pageInfo.hasNextPage && (
              <AppButton
                title="More"
                size="sm"
                onPress={() => {}}
                style={{alignSelf: 'center'}}
              />
            )}
            <Text
              style={{
                paddingBottom: 8,
                marginTop: 20,
                textTransform: 'uppercase',
                color: colors.blackOpaqueHigh,
              }}>
              How is it done?
            </Text>
            <Text
              style={{
                color: colors.black,
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
                            borderColor: colors.whiteOpaqueHigh,
                            borderWidth: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <MaterialCommunityIcons
                            name="play"
                            color={colors.white}
                            size={36}
                          />
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 16,
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
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
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
              color={colors.white}
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
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
