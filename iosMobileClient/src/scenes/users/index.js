import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const styles = StyleSheet.create({
  alignContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    height: '100%',
  },
});

const Users = ({navigation}) => {
  return (
    <View style={styles.alignContent}>
      <Text>Users Page</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default Users;
