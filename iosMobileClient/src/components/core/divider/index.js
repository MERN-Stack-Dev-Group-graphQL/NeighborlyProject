import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '100%',
    marginVertical: 10,
  },
});

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;
