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

const Chat = () => {
  return (
    <View style={styles.alignContent}>
      <Text>Chat Page</Text>
    </View>
  );
};

export default Chat;
