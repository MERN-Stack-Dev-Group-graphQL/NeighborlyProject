import React from 'react';
import Loader from '_core/loader';
import Card from '_core/card';
import {ScrollView, StyleSheet} from 'react-native';
// import {styles} from '_components';
const styles = StyleSheet.create({
  homeScrollView: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 120,
  },
});

const CardView = ({
  navigation,
  loading,
  data,
  handleAddedToCart,
  cartCount,
  refreshControl,
}) => {
  return (
    <ScrollView style={styles.homeScrollView} refreshControl={refreshControl}>
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
    </ScrollView>
  );
};

export default CardView;
