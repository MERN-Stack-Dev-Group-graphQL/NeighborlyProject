import React, {useState, useCallback, useRef, useContext} from 'react';
import {useQuery} from '@apollo/client';
import Card from '_core/card';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Loader from '_core/loader';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import {CATEGORIES} from '_utils/graphql/mock';
import {UserContext} from '_utils/context/';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height / 2;

const styles = StyleSheet.create({
  homeScrollView: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 120,
  },
  categoryScrollView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  categoryScroll: {
    paddingVertical: 10,
  },
  toolsMakeIcon: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    height: 35,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10,
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
  name: {
    fontSize: 32,
  },
});

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const CardView = ({navigation}) => {
  const {token} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {loading, data, error, refetch} = useQuery(FETCH_TOOLS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    wait(1000).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, [refreshing]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

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

  return (
    <View style={{paddingTop: 50}}>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />

      <View style={styles.categoryScrollView}>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}>
          <TouchableOpacity
            style={styles.toolsMakeIcon}
            onPress={() => navigation.navigate('Alert')}>
            <Text>Category</Text>
            <MaterialCommunityIcons
              name="arrow-down-drop-circle-outline"
              color={'#1B2023'}
              size={20}
              style={{marginLeft: 6}}
            />
          </TouchableOpacity>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity key={index} style={styles.toolsMakeIcon}>
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        scrollEventThrottle={16}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

export default CardView;
