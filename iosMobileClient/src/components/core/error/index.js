import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Error = ({error}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

export default Error;
