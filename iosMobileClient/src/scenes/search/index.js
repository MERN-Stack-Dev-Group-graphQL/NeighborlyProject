import React from 'react';
import {StatusBar, StyleSheet, Text, ScrollView, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '_components/header';

const Search = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003167" />

      <Header navigation={navigation} />
      <View style={{flex: 1}}>
        <View style={styles.alignContent}>
          <Text>Search Page</Text>
        </View>
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
