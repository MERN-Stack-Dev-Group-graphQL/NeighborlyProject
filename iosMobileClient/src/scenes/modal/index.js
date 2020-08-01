import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Modal = ({navigation, children}) => {
  return (
    <View style={styles.container}>
      {children}
      <TouchableOpacity
        style={{backgroundColor: 'white', padding: 20}}
        onPress={() => navigation.pop()}>
        <Text>Dismiss Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Modal;
