import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '100%',
    marginVertical: 10,
  },
});

export default Divider;
