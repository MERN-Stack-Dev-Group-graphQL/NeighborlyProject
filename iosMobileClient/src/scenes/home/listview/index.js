import React, {useState, useCallback, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {FETCH_TOOLS_QUERY} from '_utils/graphql';
import Loader from '_core/loader';
import CardList from '_core/card-list';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';

const ListView = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {loading, data, refetch} = useQuery(FETCH_TOOLS_QUERY);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {});

  const handleAddedToCart = () => {
    if (addedToCart) {
      setCartCount(cartCount - 1);
    } else {
      setCartCount(cartCount + 1);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />

      <ScrollView
        style={styles.homeScrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <Loader loading={loading} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  homeScrollView: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default ListView;
