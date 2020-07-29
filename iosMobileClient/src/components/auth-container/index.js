import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const AuthContainer = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default AuthContainer;
