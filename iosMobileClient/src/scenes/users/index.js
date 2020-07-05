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

const Users = () => {
  return (
    <View style={styles.alignContent}>
      <Text>Users Page</Text>
    </View>
  );
};

export default Users;
