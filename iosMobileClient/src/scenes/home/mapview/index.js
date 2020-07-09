import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components';

const MapView = () => {
  return (
    <View style={styles.alignContent}>
      <Text>Map View</Text>
    </View>
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

export default MapView;
