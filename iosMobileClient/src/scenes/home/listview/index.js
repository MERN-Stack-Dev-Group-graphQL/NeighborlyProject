import React, {useState, useCallback, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {useTheme} from '@react-navigation/native';
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
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const {data, loading, refetch} = useQuery(FETCH_TOOLS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <ScrollView
        style={styles.homeScrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
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
