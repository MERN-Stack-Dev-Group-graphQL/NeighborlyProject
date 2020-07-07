import React from 'react';
import {StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(16, 43, 70, 1)"
      />

      <View style={styles.alignContent}>
        <Text>Search Page</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default Search;
