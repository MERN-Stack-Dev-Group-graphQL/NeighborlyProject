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

const HelloWorld = ({name}) => (
  <View style={styles.alignContent}>
    <Text>Hello World {name}!</Text>
  </View>
);

export default HelloWorld;
