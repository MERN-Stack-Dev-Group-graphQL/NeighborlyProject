import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    height: '100%',
  },
});

const Search = () => {
  return (
    <View style={styles.alignContent}>
      <Text>Search Page</Text>
    </View>
  );
};

export default Search;
